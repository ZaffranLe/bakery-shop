import { Modal, Form, Input, Button, Dimmer, Loader, Icon, Grid, TextArea } from "semantic-ui-react";
import React from "react";
import { connect } from "react-redux";
import { UserActions } from "../../../redux/_actions/user/userA";
import { utils } from "../../../utils/_common-functions";

class LoginModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            createUsername: "",
            createPassword: "",
            confirmCreatePassword: "",
            isPasswordMatch: false,
            isCreating: false,
            isPasswordStrong: false,
            createFullName: "",
            createEmail: "",
            createPhone: "",
            createAddress: "",
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { isCreatedSucceed, open } = nextProps;
        const { createUsername, createPassword } = this.state;
        if (isCreatedSucceed && open) {
            this.props.dispatch(UserActions.signIn(createUsername, createPassword));
        }
    }

    onChange = (name) => (e, data) => {
        this.setState({
            [name]: data.value,
        });
    };

    handleSignIn = () => {
        const { username, password } = this.state;
        this.props.dispatch(UserActions.signIn(username, password));
    };

    handleSignUp = () => {
        const { createUsername, createPassword, createAddress, createEmail, createPhone, createFullName } = this.state;
        const info = {
            createAddress,
            createEmail,
            createPassword,
            createPhone,
            createUsername,
            createFullName,
        };
        this.props.dispatch(UserActions.signUp(info));
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

    checkUsername = () => {
        const { createUsername } = this.state;
        this.props.dispatch(UserActions.checkUsername(createUsername));
    };

    handleStartRegistering = () => {
        this.setState({
            isCreating: true,
        });
    };

    onClose = (name) => {
        this.props.onClose(name);
        this.cancelSignUp();
    };

    cancelSignUp = () => {
        this.setState({
            isCreating: false,
            username: "",
            password: "",
            createPassword: "",
            createUsername: "",
            confirmCreatePassword: "",
            isPasswordMatch: false,
            isPasswordStrong: false,
        });
    };

    render() {
        const { open, onClose, pageLoading, isUsernameValid, isCheckingUsername } = this.props;
        const {
            username,
            password,
            createUsername,
            createPassword,
            confirmCreatePassword,
            isPasswordMatch,
            isCreating,
            isPasswordStrong,
            createFullName,
            createPhone,
            createEmail,
            createAddress,
        } = this.state;
        return (
            <Modal open={open} onClose={() => onClose("loginModal")} size={isCreating ? "small" : "mini"}>
                <Dimmer inverted active={pageLoading}>
                    <Loader>
                        <Icon loading name="redo" /> Loading...
                    </Loader>
                </Dimmer>
                <Modal.Header>
                    {isCreating ? "Đăng ký" : "Đăng nhập"}
                    <Button
                        color="red"
                        size="mini"
                        inverted
                        icon="x"
                        floated="right"
                        onClick={() => this.onClose("loginModal")}
                    />
                </Modal.Header>
                <Modal.Content>
                    {!isCreating ? (
                        <Form>
                            <Form.Field>
                                <Input
                                    fluid
                                    icon="user"
                                    iconPosition="left"
                                    value={username}
                                    onChange={this.onChange("username")}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Input
                                    fluid
                                    icon="lock"
                                    iconPosition="left"
                                    value={password}
                                    type="password"
                                    onChange={this.onChange("password")}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Button.Group fluid>
                                    <Button
                                        color="orange"
                                        content="Đăng nhập"
                                        icon="sign-in"
                                        disabled={!username || !password}
                                        onClick={this.handleSignIn}
                                    />
                                    <Button content="Đăng ký" icon="plus" onClick={this.handleStartRegistering} />
                                </Button.Group>
                            </Form.Field>
                        </Form>
                    ) : (
                        <Grid.Column>
                            <Form>
                                <Form.Field>
                                    <label>Tên đăng nhập</label>
                                    <Input
                                        fluid
                                        onChange={this.onChange("createUsername")}
                                        value={createUsername}
                                        onBlur={this.checkUsername}
                                        icon={
                                            isCreating &&
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
                                        onKeyPress={utils.handleInputNumber}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>Địa chỉ</label>
                                    <TextArea onChange={this.onChange("createAddress")} value={createAddress} />
                                </Form.Field>
                                <Form.Field>
                                    <Button.Group fluid>
                                        <Button
                                            color="brown"
                                            icon="sign-in"
                                            content="Đăng ký"
                                            onClick={this.handleSignUp}
                                            disabled={!isPasswordMatch || !isUsernameValid || !isPasswordStrong}
                                        />
                                        <Button content="Quay lại" onClick={this.cancelSignUp} />
                                    </Button.Group>
                                </Form.Field>
                            </Form>
                        </Grid.Column>
                    )}
                </Modal.Content>
            </Modal>
        );
    }
}

const mapStateToProps = ({ UserReducer }) => UserReducer;
export default connect(mapStateToProps, null)(LoginModal);
