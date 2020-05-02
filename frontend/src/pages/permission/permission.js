import React from "react";
import DataTable from "../../components/table/DataTable";
import { PermissionActions } from "../../redux/_actions/user/permissionA";
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
        const { open, permission } = nextProps;
        if (permission && !this.state.id) {
            this.setState({
                ...permission,
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

    handleSavePermission = () => {
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
                <Modal.Header>Quyền hạn hệ thống</Modal.Header>
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
                    <Button content="Lưu" icon="checkmark" color="green" onClick={this.handleSavePermission} />
                    <Button content="Đóng" onClick={() => onClose("updateModal")} />
                </Modal.Actions>
            </Modal>
        );
    }
}

class Permission extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            permission: "",
            updateModal: false,
        };
    }

    componentDidMount() {
        this.props.dispatch(PermissionActions.getPermissions());
    }

    componentWillReceiveProps(nextProps) {
        const { reload, isCreatedSucceed } = nextProps;
        if (isCreatedSucceed) {
            this.handleCloseModal("updateModal");
        }
        if (reload) {
            this.props.dispatch(PermissionActions.getPermissions());
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
            render: (permission) => {
                return (
                    <>
                        <Button
                            size="tiny"
                            color="yellow"
                            icon="edit"
                            onClick={() => this.handleClickEdit(permission)}
                        />
                        <Button
                            size="tiny"
                            color="red"
                            icon="delete"
                            onClick={() => this.handleClickDelete(permission["id"])}
                        />
                    </>
                );
            },
        },
    ];

    handleClickEdit = (permission) => {
        this.setState({
            permission,
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
            permission: ""
        });
    };

    handleClickDelete = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xoá?")) {
            this.props.dispatch(PermissionActions.deletePermission(id));
        }
    };

    handleSavePermission = (info) => {
        const { permission } = this.state;
        if (permission) {
            this.props.dispatch(PermissionActions.updatePermission(permission["id"], info));
        } else {
            this.props.dispatch(PermissionActions.createPermission(info));
        }
    };

    render() {
        const { pageLoading, permissions } = this.props;
        const { permission, updateModal } = this.state;
        return (
            <Grid.Row>
                <Grid.Column width={16}>
                    <Dimmer inverted active={pageLoading}>
                        <Loader>Loading...</Loader>
                    </Dimmer>
                    <Segment>
                        <Header>
                            Danh sách quyền hệ thống
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
                        <DataTable data={permissions} indexColumn={true} columns={this.columns} key="id" />
                    </Segment>
                </Grid.Column>
                <UpdateModal
                    permission={permission}
                    open={updateModal}
                    onClose={this.handleCloseModal}
                    onSave={this.handleSavePermission}
                />
            </Grid.Row>
        );
    }
}

const mapStateToProps = ({ PermissionReducer }) => PermissionReducer;

export default connect(mapStateToProps, null)(Permission);
