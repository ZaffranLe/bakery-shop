import React from "react";
import { Modal, Button, Form, Input, TextArea, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import _ from "lodash";
import { UserActions } from "../../../redux/_actions/user/userA";
import { utils } from "../../../utils/_common-functions";

class InfoModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            fullName: "",
            email: "",
            phone: "",
            address: "",
            isUpdating: false,
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
            isNewPasswordMatch: true,
            idPermission: "",
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { open, user, isUpdatedSucceed } = nextProps;
        const { isUpdating } = this.state;
        if (user && open && !isUpdating) {
            const fields = ["username", "fullName", "email", "phone", "address", "idPermission"];
            const userInfo = _.pick(user, fields);
            this.setState({
                ...userInfo,
            });
        }
        if (isUpdatedSucceed && open) {
            this.onClose("infoModal");
            this.props.dispatch(UserActions.signOut());
        }
    }

    handleChange = (name) => (e, data) => {
        this.setState({
            [name]: data.value,
        });
    };

    handleStartEditing = () => {
        this.setState({
            isUpdating: true,
        });
    };

    handleCancelEditing = () => {
        this.setState({
            isUpdating: false,
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
            isNewPasswordMatch: true,
        });
    };

    onClose = (name) => {
        this.handleCancelEditing();
        this.props.onClose(name);
    };

    checkMatchingPassword = () => {
        const { newPassword, confirmNewPassword } = this.state;
        let isNewPasswordMatch = true;
        if (newPassword != confirmNewPassword) {
            isNewPasswordMatch = false;
        }
        this.setState({
            isNewPasswordMatch,
        });
    };

    handleUpdateUserInfo = () => {
        const { fullName, email, phone, address, currentPassword, newPassword, idPermission } = this.state;
        const info = {
            fullName,
            email,
            phone,
            address,
            currentPassword,
            newPassword,
            idPermission,
        };
        this.props.dispatch(UserActions.updateUserInfo(this.props.user.userId, info));
    };

    render() {
        const { open } = this.props;
        const {
            username,
            fullName,
            email,
            phone,
            address,
            isUpdating,
            currentPassword,
            newPassword,
            confirmNewPassword,
            isNewPasswordMatch,
        } = this.state;
        return (
            <Modal open={open}>
                <Modal.Header>Thông tin cá nhân</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Group widths="equal">
                            <Form.Field>
                                <Input fluid label="Tên đăng nhập" value={username} readOnly />
                            </Form.Field>
                            <Form.Field>
                                <Input
                                    fluid
                                    label="Họ tên"
                                    onChange={this.handleChange("fullName")}
                                    value={fullName}
                                    readOnly={!isUpdating}
                                />
                            </Form.Field>
                        </Form.Group>
                        <Form.Group widths="equal">
                            <Form.Field>
                                <Input
                                    fluid
                                    label="Email"
                                    type="email"
                                    onChange={this.handleChange("email")}
                                    value={email}
                                    readOnly={!isUpdating}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Input
                                    fluid
                                    label="SĐT"
                                    onChange={this.handleChange("phone")}
                                    value={phone}
                                    readOnly={!isUpdating}
                                    onKeyPress={utils.handleInputNumber}
                                />
                            </Form.Field>
                        </Form.Group>
                        <Form.Field>
                            <label>Địa chỉ</label>
                            <TextArea
                                placeholder="Địa chỉ"
                                onChange={this.handleChange("address")}
                                readOnly={!isUpdating}
                                value={address}
                            />
                        </Form.Field>
                        {isUpdating && (
                            <>
                                <Form.Field>
                                    <Input
                                        label="Mật khẩu hiện tại"
                                        type="password"
                                        onChange={this.handleChange("currentPassword")}
                                        fluid
                                        value={currentPassword}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Input
                                        label="Mật khẩu mới"
                                        placeholder="Bỏ trống nếu không muốn đổi"
                                        type="password"
                                        onChange={this.handleChange("newPassword")}
                                        fluid
                                        icon={
                                            isNewPasswordMatch ? (
                                                <Icon name="checkmark" color="green" />
                                            ) : (
                                                <Icon name="x" color="red" />
                                            )
                                        }
                                        error={!isNewPasswordMatch}
                                        value={newPassword}
                                        onBlur={this.checkMatchingPassword}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Input
                                        label="Xác nhận mật khẩu mới"
                                        type="password"
                                        onChange={this.handleChange("confirmNewPassword")}
                                        fluid
                                        icon={
                                            isNewPasswordMatch ? (
                                                <Icon name="checkmark" color="green" />
                                            ) : (
                                                <Icon name="x" color="red" />
                                            )
                                        }
                                        error={!isNewPasswordMatch}
                                        value={confirmNewPassword}
                                        onBlur={this.checkMatchingPassword}
                                    />
                                </Form.Field>
                            </>
                        )}
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    {isUpdating ? (
                        <Button
                            color="green"
                            icon="checkmark"
                            content="Lưu"
                            labelPosition="left"
                            disabled={!isNewPasswordMatch}
                            onClick={this.handleUpdateUserInfo}
                        />
                    ) : (
                        <Button
                            color="yellow"
                            icon="edit"
                            content="Chỉnh sửa"
                            labelPosition="left"
                            onClick={this.handleStartEditing}
                        />
                    )}
                    <Button content="Close" onClick={() => this.onClose("infoModal")} />
                </Modal.Actions>
            </Modal>
        );
    }
}

const mapStateToProps = ({ UserReducer }) => UserReducer;

export default connect(mapStateToProps, null)(InfoModal);
