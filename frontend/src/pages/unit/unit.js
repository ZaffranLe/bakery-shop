import React from "react";
import DataTable from "../../components/table/DataTable";
import { UnitActions } from "../../redux/_actions/unit/unitA";
import { connect } from "react-redux";
import { Segment, Header, Dimmer, Loader, Button, Grid, Modal, Input, Form } from "semantic-ui-react";
import Layout from "../../components/layout/layout";
import _var from "../../utils/_var";

class UpdateModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            description: "",
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { open, unit } = nextProps;
        if (unit && !this.state.id) {
            this.setState({
                ...unit,
            });
        }

        if (!open) {
            this.setState({
                id: "",
                name: "",
                description: "",
            });
        }
    }

    handleSaveUnit = () => {
        const { name, description } = this.state;
        const info = {
            name,
            description,
        };
        this.props.onSave(info);
    };

    handleChange = (name) => (e, data) => {
        this.setState({
            [name]: data.value,
        });
    };

    render() {
        const { open, onClose } = this.props;
        const { name, description } = this.state;
        return (
            <Modal open={open} size="small">
                <Modal.Header>Đơn vị tính</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Field>
                            <Input onChange={this.handleChange("name")} value={name} fluid label="Tên" />
                        </Form.Field>
                        <Form.Field>
                            <Input
                                onChange={this.handleChange("description")}
                                value={description}
                                fluid
                                label="Mô tả"
                            />
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button content="Lưu" icon="checkmark" color="green" onClick={this.handleSaveUnit} />
                    <Button content="Đóng" onClick={() => onClose("updateModal")} />
                </Modal.Actions>
            </Modal>
        );
    }
}

class Unit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            unit: "",
            updateModal: false,
        };
    }

    componentDidMount() {
        this.props.dispatch(UnitActions.getUnits());
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { reload, isCreatedSucceed } = nextProps;
        if (isCreatedSucceed) {
            this.handleCloseModal("updateModal");
        }
        if (reload) {
            this.props.dispatch(UnitActions.getUnits());
        }
    }

    columns = [
        {
            name: "name",
            title: "Tên",
            searchable: true,
        },
        {
            name: "description",
            title: "Mô tả",
            searchable: true,
        },
        {
            title: "Hành động",
            style: { textAlign: "center", width: "10%" },
            render: (unit) => {
                return (
                    <>
                        <Button size="tiny" color="yellow" icon="edit" onClick={() => this.handleClickEdit(unit)} />
                        <Button
                            size="tiny"
                            color="red"
                            icon="delete"
                            onClick={() => this.handleClickDelete(unit["id"])}
                        />
                    </>
                );
            },
        },
    ];

    handleClickEdit = (unit) => {
        this.setState({
            unit,
        });
        this.handleOpenModal("updateModal");
    };

    handleOpenModal = (name) => {
        this.setState({
            [name]: true,
        });
    };

    handleCloseModal = (name) => {
        this.setState({
            [name]: false,
            unit: "",
        });
    };

    handleClickDelete = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xoá?")) {
            this.props.dispatch(UnitActions.deleteUnit(id));
        }
    };

    handleSaveUnit = (info) => {
        const { unit } = this.state;
        if (unit) {
            this.props.dispatch(UnitActions.updateUnit(unit["id"], info));
        } else {
            this.props.dispatch(UnitActions.createUnit(info));
        }
    };

    render() {
        const { pageLoading, units } = this.props;
        const { unit, updateModal } = this.state;
        return (
            <Layout permission={_var.permission.admin}>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <Dimmer inverted active={pageLoading}>
                            <Loader>Loading...</Loader>
                        </Dimmer>
                        <Segment>
                            <Header>
                                Danh sách đơn vị tính
                                <Button
                                    floated="right"
                                    icon="plus"
                                    content="Tạo mới"
                                    color="green"
                                    onClick={() => this.handleOpenModal("updateModal")}
                                />
                            </Header>
                        </Segment>
                        <Segment>
                            <DataTable data={units} indexColumn={true} columns={this.columns} key="id" />
                        </Segment>
                    </Grid.Column>
                    <UpdateModal
                        unit={unit}
                        open={updateModal}
                        onClose={this.handleCloseModal}
                        onSave={this.handleSaveUnit}
                    />
                </Grid.Row>
            </Layout>
        );
    }
}

const mapStateToProps = ({ UnitReducer }) => UnitReducer;

export default connect(mapStateToProps, null)(Unit);
