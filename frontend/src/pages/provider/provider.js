import React from "react";
import DataTable from "../../components/table/DataTable";
import { ProviderActions } from "../../redux/_actions/provider/providerA";
import { connect } from "react-redux";
import { Segment, Header, Dimmer, Loader, Button, Grid, Modal, Input, Form, TextArea } from "semantic-ui-react";
import { utils } from "../../utils/_common-functions";
import Layout from "../../components/layout/layout";
import _var from "../../utils/_var";

class UpdateModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            phone: "",
            email: "",
            address: "",
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { open, provider } = nextProps;
        if (provider && !this.state.id) {
            this.setState({
                ...provider,
            });
        }

        if (!open) {
            this.setState({
                id: "",
                name: "",
                phone: "",
                email: "",
                address: "",
            });
        }
    }

    handleSaveProvider = () => {
        const { name, phone, email, address } = this.state;
        const info = {
            name,
            phone,
            email,
            address,
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
        const { name, phone, email, address } = this.state;
        return (
            <Modal open={open} size="small">
                <Modal.Header>Nhà cung cấp</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Field>
                            <Input onChange={this.handleChange("name")} value={name} fluid label="Tên" />
                        </Form.Field>
                        <Form.Field>
                            <Input
                                onKeyPress={utils.handleInputNumber}
                                onChange={this.handleChange("phone")}
                                value={phone}
                                fluid
                                label="SĐT"
                            />
                        </Form.Field>
                        <Form.Field>
                            <Input onChange={this.handleChange("email")} value={email} fluid label="Email" />
                        </Form.Field>
                        <Form.Field>
                            <label>Địa chỉ</label>
                            <TextArea onChange={this.handleChange("address")} value={address} />
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button content="Lưu" icon="checkmark" color="green" onClick={this.handleSaveProvider} />
                    <Button content="Đóng" onClick={() => onClose("updateModal")} />
                </Modal.Actions>
            </Modal>
        );
    }
}

class Provider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            provider: "",
            updateModal: false,
        };
    }

    componentDidMount() {
        this.props.dispatch(ProviderActions.getProviders());
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { reload, isCreatedSucceed } = nextProps;
        if (isCreatedSucceed) {
            this.handleCloseModal("updateModal");
        }
        if (reload) {
            this.props.dispatch(ProviderActions.getProviders());
        }
    }

    columns = [
        {
            name: "name",
            title: "Tên",
            searchable: true,
        },
        {
            name: "phone",
            title: "SĐT",
            searchable: true,
        },
        {
            name: "email",
            title: "Email",
            searchable: true,
        },
        {
            name: "address",
            title: "Địa chỉ",
            searchable: true,
        },
        {
            title: "Hành động",
            style: { textAlign: "center", width: "10%" },
            render: (provider) => {
                return (
                    <>
                        <Button size="tiny" color="yellow" icon="edit" onClick={() => this.handleClickEdit(provider)} />
                        <Button
                            size="tiny"
                            color="red"
                            icon="delete"
                            onClick={() => this.handleClickDelete(provider["id"])}
                        />
                    </>
                );
            },
        },
    ];

    handleClickEdit = (provider) => {
        this.setState({
            provider,
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
            provider: "",
        });
    };

    handleClickDelete = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xoá?")) {
            this.props.dispatch(ProviderActions.deleteProvider(id));
        }
    };

    handleSaveProvider = (info) => {
        const { provider } = this.state;
        if (provider) {
            this.props.dispatch(ProviderActions.updateProvider(provider["id"], info));
        } else {
            this.props.dispatch(ProviderActions.createProvider(info));
        }
    };

    render() {
        const { pageLoading, providers } = this.props;
        const { provider, updateModal } = this.state;
        return (
            <Layout permission={_var.permission.admin}>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <Dimmer inverted active={pageLoading}>
                            <Loader>Loading...</Loader>
                        </Dimmer>
                        <Segment>
                            <Header>
                                Danh sách nhà cung cấp
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
                            <DataTable data={providers} indexColumn={true} columns={this.columns} key="id" />
                        </Segment>
                    </Grid.Column>
                    <UpdateModal
                        provider={provider}
                        open={updateModal}
                        onClose={this.handleCloseModal}
                        onSave={this.handleSaveProvider}
                    />
                </Grid.Row>
            </Layout>
        );
    }
}

const mapStateToProps = ({ ProviderReducer }) => ProviderReducer;

export default connect(mapStateToProps, null)(Provider);
