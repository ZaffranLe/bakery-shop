import React from "react";
import DataTable from "../../components/table/DataTable";
import { IngredientActions } from "../../redux/_actions/ingredient/ingredientA";
import { UnitActions } from "../../redux/_actions/unit/unitA";
import { connect } from "react-redux";
import {
    Segment,
    Header,
    Dimmer,
    Loader,
    Button,
    Grid,
    Modal,
    Input,
    Form,
    TextArea,
    Dropdown,
} from "semantic-ui-react";
import Layout from "../../components/layout/layout";
import _var from "../../utils/_var";

class UpdateModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            idUnit: "",
            name: "",
            description: "",
            quantity: "",
            unitOptions: [],
            warningThreshold: "",
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { open, ingredient, units } = nextProps;
        const { id, unitOptions } = this.state;
        if (ingredient && !id) {
            this.setState({
                ...ingredient,
            });
        }

        if (!open) {
            this.setState({
                id: "",
                idUnit: "",
                name: "",
                description: "",
                quantity: "",
                warningThreshold: "",
            });
        }

        if (units.length !== unitOptions.length) {
            const options = [];
            for (let unit of units) {
                options.push({
                    key: unit["id"],
                    value: unit["id"],
                    text: unit["name"],
                });
            }
            this.setState({
                unitOptions: options,
            });
        }
    }

    handleSaveIngredient = () => {
        const { name, idUnit, quantity, description, warningThreshold } = this.state;
        const info = {
            name,
            idUnit,
            description,
            quantity,
            warningThreshold,
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
        const { name, idUnit, description, unitOptions, warningThreshold } = this.state;
        return (
            <Modal open={open} size="small">
                <Modal.Header>Nguyên liệu</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Field>
                            <label>Tên</label>
                            <Input onChange={this.handleChange("name")} value={name} fluid />
                        </Form.Field>
                        <Form.Field>
                            <label>Mô tả</label>
                            <Input onChange={this.handleChange("description")} value={description} fluid />
                        </Form.Field>
                        <Form.Field>
                            <label>Đơn vị tính</label>
                            <Dropdown
                                value={idUnit}
                                options={unitOptions}
                                onChange={this.handleChange("idUnit")}
                                selection
                                fluid
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Số lượng tồn kho cảnh báo</label>
                            <Input onChange={this.handleChange("warningThreshold")} value={warningThreshold} fluid />
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button content="Lưu" icon="checkmark" color="green" onClick={this.handleSaveIngredient} />
                    <Button content="Đóng" onClick={() => onClose("updateModal")} />
                </Modal.Actions>
            </Modal>
        );
    }
}

class Ingredient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredient: "",
            updateModal: false,
        };
    }

    componentDidMount() {
        this.props.dispatch(IngredientActions.getIngredients());
        this.props.dispatch(UnitActions.getUnits());
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { reload, isCreatedSucceed } = nextProps;
        if (isCreatedSucceed) {
            this.handleCloseModal("updateModal");
        }
        if (reload) {
            this.props.dispatch(IngredientActions.getIngredients());
        }
    }

    columns = [
        {
            name: "name",
            title: "Tên",
            searchable: true,
        },
        {
            name: "unit",
            title: "Đơn vị",
        },
        {
            name: "description",
            title: "Mô tả",
            searchable: true,
        },
        {
            name: "quantity",
            title: "Số lượng tồn kho",
        },
        {
            name: "warningThreshold",
            title: "Ngưỡng cảnh báo",
        },
        {
            title: "Hành động",
            style: { textAlign: "center", width: "10%" },
            render: (ingredient) => {
                return (
                    <>
                        <Button
                            size="tiny"
                            color="yellow"
                            icon="edit"
                            onClick={() => this.handleClickEdit(ingredient)}
                        />
                        <Button
                            size="tiny"
                            color="red"
                            icon="delete"
                            onClick={() => this.handleClickDelete(ingredient["id"])}
                        />
                    </>
                );
            },
        },
    ];

    handleClickEdit = (ingredient) => {
        this.setState({
            ingredient,
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
            ingredient: "",
        });
    };

    handleClickDelete = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xoá?")) {
            this.props.dispatch(IngredientActions.deleteIngredient(id));
        }
    };

    handleSaveIngredient = (info) => {
        const { ingredient } = this.state;
        if (ingredient) {
            this.props.dispatch(IngredientActions.updateIngredient(ingredient["id"], info));
        } else {
            this.props.dispatch(IngredientActions.createIngredient(info));
        }
    };

    render() {
        const { pageLoading, ingredients, units } = this.props;
        const { ingredient, updateModal } = this.state;
        return (
            <Layout permission={_var.permission.admin}>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <Dimmer inverted active={pageLoading}>
                            <Loader>Loading...</Loader>
                        </Dimmer>
                        <Segment>
                            <Header>
                                Danh sách nguyên liệu
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
                            <DataTable data={ingredients} indexColumn={true} columns={this.columns} key="id" />
                        </Segment>
                    </Grid.Column>
                    <UpdateModal
                        ingredient={ingredient}
                        open={updateModal}
                        onClose={this.handleCloseModal}
                        onSave={this.handleSaveIngredient}
                        units={units}
                    />
                </Grid.Row>
            </Layout>
        );
    }
}

const mapStateToProps = ({ IngredientReducer }) => IngredientReducer;

export default connect(mapStateToProps, null)(Ingredient);
