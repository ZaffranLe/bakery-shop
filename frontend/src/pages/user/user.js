import React from "react";
import DataTable from "../../components/table/DataTable";
import {
    Grid,
    Dimmer,
    Loader,
    Segment,
    Header,
    Modal,
    Input,
    Form,
    Icon,
    TextArea,
    Button,
    Dropdown,
} from "semantic-ui-react";
import { UserActions } from "../../redux/_actions/user/userA";
import { PermissionActions } from "../../redux/_actions/user/permissionA";
import { connect } from "react-redux";
import { utils } from "../../utils/_common-functions";

class UpdateModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            createUsername: "",
            createPassword: "",
            confirmCreatePassword: "",
            isPasswordMatch: false,
            isPasswordStrong: false,
            createFullName: "",
            createEmail: "",
            createPhone: "",
            createAddress: "",
            permission: 1,
            permissionOptions: [],
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { open, permissions } = nextProps;
        const { permissionOptions } = this.state;
        if (!open) {
            this.setState({
                createUsername: "",
                createPassword: "",
                confirmCreatePassword: "",
                isPasswordMatch: false,
                isPasswordStrong: false,
                createFullName: "",
                createEmail: "",
                createPhone: "",
                createAddress: "",
                permission: 1,
            });
        }
        if (permissions.length > 0 && permissionOptions.length !== permissions.length) {
            const options = [];
            for (let permission of permissions) {
                options.push({
                    key: permission["id"],
                    value: permission["id"],
                    text: permission["name"],
                });
                this.setState({
                    permissionOptions: options,
                });
            }
        }
    }

    onChange = (name) => (e, data) => {
        this.setState({
            [name]: data.value,
        });
    };

    handleSignUp = () => {
        const {
            createUsername,
            createPassword,
            createAddress,
            createEmail,
            createPhone,
            createFullName,
            permission,
        } = this.state;
        const info = {
            createAddress,
            createEmail,
            createPassword,
            createPhone,
            createUsername,
            createFullName,
            permission,
        };
        this.props.onSave(info);
    };

    checkMatchingPassword = () => {
        const { createPassword, confirmCreatePassword } = this.state;
        const passwordRegex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);
        let isPasswordMatch = true;
        let isPasswordStrong = false;
        if (createPassword != confirmCreatePassword) {
            isPasswordMatch = false;
        }
        if (passwordRegex.test(createPassword)) {
            isPasswordStrong = true;
        }
        this.setState({
            isPasswordMatch,
            isPasswordStrong,
        });
    };

    onUsernameFocus = () => {
        this.setState({
            isCheckingUsername: true,
        });
    };

    checkUsername = () => {
        const { createUsername } = this.state;
        this.props.onCheckUsername(createUsername);
    };


    render() {
        const { open, onClose, pageLoading, isUsernameValid, isCheckingUsername } = this.props;
        const {
            createUsername,
            createPassword,
            confirmCreatePassword,
            isPasswordMatch,
            isPasswordStrong,
            createFullName,
            createPhone,
            createEmail,
            createAddress,
            permission,
            permissionOptions,
        } = this.state;
        return (
            <Modal open={open}>
                <Dimmer inverted active={pageLoading}>
                    <Loader>Loading...</Loader>
                </Dimmer>
                <Modal.Header>Tạo tài khoản mới</Modal.Header>
                <Modal.Content>
                    <Grid.Column>
                        <Form>
                            <Form.Field>
                                <label>Tên đăng nhập</label>
                                <Input
                                    fluid
                                    onChange={this.onChange("createUsername")}
                                    value={createUsername}
                                    onBlur={this.checkUsername}
                                    onFocus={this.onUsernameFocus}
                                    icon={
                                        open &&
                                        (isCheckingUsername ? (
                                            <Icon loading name="redo" />
                                        ) : isUsernameValid && createUsername ? (
                                            <Icon color="green" name="checkmark" />
                                        ) : (
                                            <Icon color="red" name="x" />
                                        ))
                                    }
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Mật khẩu</label>
                                <Input
                                    fluid
                                    type="password"
                                    onChange={this.onChange("createPassword")}
                                    value={createPassword}
                                    icon={
                                        isPasswordMatch && isPasswordStrong ? (
                                            <Icon name="checkmark" color="green" />
                                        ) : (
                                            <Icon name="x" color="red" />
                                        )
                                    }
                                    onBlur={this.checkMatchingPassword}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Xác nhận mật khẩu</label>
                                <Input
                                    fluid
                                    type="password"
                                    onChange={this.onChange("confirmCreatePassword")}
                                    value={confirmCreatePassword}
                                    icon={
                                        isPasswordMatch && isPasswordStrong ? (
                                            <Icon name="checkmark" color="green" />
                                        ) : (
                                            <Icon name="x" color="red" />
                                        )
                                    }
                                    onBlur={this.checkMatchingPassword}
                                />
                            </Form.Field>
                            <Form.Field>
                                <p>Mật khẩu cần có tối thiểu 8 ký tự, chứa ít nhất 1 chữ cái và 1 số</p>
                            </Form.Field>
                            <Form.Field>
                                <label>Họ tên</label>
                                <Input onChange={this.onChange("createFullName")} value={createFullName} fluid />
                            </Form.Field>
                            <Form.Field>
                                <label>Email</label>
                                <Input onChange={this.onChange("createEmail")} value={createEmail} fluid />
                            </Form.Field>
                            <Form.Field>
                                <label>Số điện thoại</label>
                                <Input
                                    onChange={this.onChange("createPhone")}
                                    value={createPhone}
                                    fluid
                                    onKeyPress={utils.handleInputPhone}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Địa chỉ</label>
                                <TextArea onChange={this.onChange("createAddress")} value={createAddress} />
                            </Form.Field>
                            <Form.Field>
                                <label>Quyền hạn</label>
                                <Dropdown
                                    selection
                                    fluid
                                    onChange={this.onChange("permission")}
                                    value={permission}
                                    options={permissionOptions}
                                />
                            </Form.Field>
                        </Form>
                    </Grid.Column>
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        color="green"
                        icon="sign-in"
                        content="Đăng ký"
                        onClick={this.handleSignUp}
                        disabled={!isPasswordMatch || !isUsernameValid || !isPasswordStrong}
                    />
                    <Button content="Quay lại" onClick={() => onClose("updateModal")} />
                </Modal.Actions>
            </Modal>
        );
    }
}

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            updateModal: false,
        };
    }

    componentDidMount() {
        this.props.dispatch(UserActions.getUsers());
        this.props.dispatch(PermissionActions.getPermissions());
    }

    componentWillReceiveProps(nextProps) {
        const { reload, isCreatedSucceed } = nextProps;
        if (isCreatedSucceed) {
            this.handleCloseModal("updateModal");
        }
        if (reload) {
            this.props.dispatch(UserActions.getUsers());
        }
    }

    columns = [
        {
            name: "username",
            title: "Tên đăng nhập",
            searchable: true,
        },
        {
            name: "fullName",
            title: "Họ tên",
            searchable: true,
        },
        {
            name: "email",
            title: "Email",
            searchable: true,
        },
        {
            name: "phone",
            title: "SĐT",
            searchable: true,
        },
        {
            name: "address",
            title: "Địa chỉ",
            searchable: true,
        },
        {
            name: "permissionName",
            title: "Quyền hạn",
            searchable: true,
        },
        {
            title: "Hành động",
            style: { textAlign: "center", width: "10%" },
            render: (user) => {
                return (
                    <>
                        <Button
                            size="tiny"
                            color="red"
                            icon="delete"
                            onClick={() => this.handleClickDelete(user["id"])}
                        />
                    </>
                );
            },
        },
    ];

    handleOpenModal = (name) => {
        this.setState({
            [name]: true,
        });
    };

    handleCloseModal = (name) => {
        this.setState({
            [name]: false,
        });
    };

    handleClickDelete = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xoá?")) {
            this.props.dispatch(UserActions.deleteUser(id));
        }
    };

    handleSaveUser = (info) => {
        this.props.dispatch(UserActions.signUp(info));
    };

    handleCheckUsername = (name) => {
        this.props.dispatch(UserActions.checkUsername(name));
    };

    render() {
        const { pageLoading, users, permissions, isCheckingUsername, isUsernameValid } = this.props;
        const { updateModal } = this.state;
        return (
            <Grid.Row>
                <Grid.Column width={16}>
                    <Dimmer inverted active={pageLoading}>
                        <Loader>Loading...</Loader>
                    </Dimmer>
                    <Segment>
                        <Header>
                            Danh sách người dùng
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
                        <DataTable data={users} indexColumn={true} columns={this.columns} key="id" />
                    </Segment>
                </Grid.Column>
                <UpdateModal
                    open={updateModal}
                    onClose={this.handleCloseModal}
                    onSave={this.handleSaveUser}
                    permissions={permissions}
                    users={users}
                    isCheckingUsername={isCheckingUsername}
                    isUsernameValid={isUsernameValid}
                    onCheckUsername={this.handleCheckUsername}
                />
            </Grid.Row>
        );
    }
}

const mapStateToProps = ({ UserReducer }) => UserReducer;

export default connect(mapStateToProps, null)(User);
