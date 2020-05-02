import React from "react";
import DataTable from "../../components/table/DataTable";
import { ExportReceiptStatusActions } from "../../redux/_actions/export-receipt/statusA";
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
        const { open, status } = nextProps;
        if (status && !this.state.id) {
            this.setState({
                ...status,
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

    handleSaveStatus = () => {
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
                <Modal.Header>Trạng thái đơn hàng</Modal.Header>
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
                    <Button content="Lưu" icon="checkmark" color="green" onClick={this.handleSaveStatus} />
                    <Button content="Đóng" onClick={() => onClose("updateModal")} />
                </Modal.Actions>
            </Modal>
        );
    }
}

class ExportReceiptStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: "",
            updateModal: false,
        };
    }

    componentDidMount() {
        this.props.dispatch(ExportReceiptStatusActions.getStatusList());
    }

    componentWillReceiveProps(nextProps) {
        const { reload, isCreatedSucceed } = nextProps;
        if (isCreatedSucceed) {
            this.handleCloseModal("updateModal");
        }
        if (reload) {
            this.props.dispatch(ExportReceiptStatusActions.getStatusList());
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
            render: (status) => {
                return (
                    <>
                        <Button size="tiny" color="yellow" icon="edit" onClick={() => this.handleClickEdit(status)} />
                        <Button
                            size="tiny"
                            color="red"
                            icon="delete"
                            onClick={() => this.handleClickDelete(status["id"])}
                        />
                    </>
                );
            },
        },
    ];

    handleClickEdit = (status) => {
        this.setState({
            status,
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
            status: "",
        });
    };

    handleClickDelete = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xoá?")) {
            this.props.dispatch(ExportReceiptStatusActions.deleteStatus(id));
        }
    };

    handleSaveStatus = (info) => {
        const { status } = this.state;
        if (status) {
            this.props.dispatch(ExportReceiptStatusActions.updateStatus(status["id"], info));
        } else {
            this.props.dispatch(ExportReceiptStatusActions.createStatus(info));
        }
    };

    render() {
        const { pageLoading, statusList } = this.props;
        const { status, updateModal } = this.state;
        return (
            <Grid.Row>
                <Grid.Column width={16}>
                    <Dimmer inverted active={pageLoading}>
                        <Loader>Loading...</Loader>
                    </Dimmer>
                    <Segment>
                        <Header>
                            Danh sách trạng thái đơn hàng
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
                        <DataTable data={statusList} indexColumn={true} columns={this.columns} key="id" />
                    </Segment>
                </Grid.Column>
                <UpdateModal
                    status={status}
                    open={updateModal}
                    onClose={this.handleCloseModal}
                    onSave={this.handleSaveStatus}
                />
            </Grid.Row>
        );
    }
}

const mapStateToProps = ({ ExportReceiptStatusReducer }) => ExportReceiptStatusReducer;

export default connect(mapStateToProps, null)(ExportReceiptStatus);
