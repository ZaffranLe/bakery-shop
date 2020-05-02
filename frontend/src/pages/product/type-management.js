import React from "react";
import DataTable from "../../components/table/DataTable";
import { ProductTypeActions } from "../../redux/_actions/product/typeA";
import { connect } from "react-redux";
import { Segment, Header, Dimmer, Loader, Button, Grid, Modal, Input, Form } from "semantic-ui-react";

class UpdateModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            description: "",
        };
    }

    componentWillReceiveProps(nextProps) {
        const { open, type } = nextProps;
        if (type && !this.state.id) {
            this.setState({
                ...type,
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

    handleSaveType = () => {
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
                <Modal.Header>Thể loại sản phẩm</Modal.Header>
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
                    <Button content="Lưu" icon="checkmark" color="green" onClick={this.handleSaveType} />
                    <Button content="Đóng" onClick={() => onClose("updateModal")} />
                </Modal.Actions>
            </Modal>
        );
    }
}

class ProductType extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "",
            updateModal: false,
        };
    }

    componentDidMount() {
        this.props.dispatch(ProductTypeActions.getTypes());
    }

    componentWillReceiveProps(nextProps) {
        const { reload, isCreatedSucceed } = nextProps;
        if (isCreatedSucceed) {
            this.handleCloseModal("updateModal");
        }
        if (reload) {
            this.props.dispatch(ProductTypeActions.getTypes());
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
            render: (type) => {
                return (
                    <>
                        <Button size="tiny" color="yellow" icon="edit" onClick={() => this.handleClickEdit(type)} />
                        <Button
                            size="tiny"
                            color="red"
                            icon="delete"
                            onClick={() => this.handleClickDelete(type["id"])}
                        />
                    </>
                );
            },
        },
    ];

    handleClickEdit = (type) => {
        this.setState({
            type,
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
            type: "",
        });
    };

    handleClickDelete = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xoá?")) {
            this.props.dispatch(ProductTypeActions.deleteType(id));
        }
    };

    handleSaveType = (info) => {
        const { type } = this.state;
        if (type) {
            this.props.dispatch(ProductTypeActions.updateType(type["id"], info));
        } else {
            this.props.dispatch(ProductTypeActions.createType(info));
        }
    };

    render() {
        const { pageLoading, types } = this.props;
        const { type, updateModal } = this.state;
        return (
            <Grid.Row>
                <Grid.Column width={16}>
                    <Dimmer inverted active={pageLoading}>
                        <Loader>Loading...</Loader>
                    </Dimmer>
                    <Segment>
                        <Header>
                            Danh sách thể loại sản phẩm
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
                        <DataTable data={types} indexColumn={true} columns={this.columns} key="id" />
                    </Segment>
                </Grid.Column>
                <UpdateModal
                    type={type}
                    open={updateModal}
                    onClose={this.handleCloseModal}
                    onSave={this.handleSaveType}
                />
            </Grid.Row>
        );
    }
}

const mapStateToProps = ({ ProductTypeReducer }) => ProductTypeReducer;

export default connect(mapStateToProps, null)(ProductType);
