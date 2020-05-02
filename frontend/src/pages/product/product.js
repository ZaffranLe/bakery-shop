import React from "react";
import DataTable from "../../components/table/DataTable";
import { ProductActions } from "../../redux/_actions/product/productA";
import { IngredientActions } from "../../redux/_actions/ingredient/ingredientA";
import { UnitActions } from "../../redux/_actions/unit/unitA";
import { ProductTypeActions } from "../../redux/_actions/product/typeA";
import { connect } from "react-redux";
import { Segment, Header, Dimmer, Loader, Button, Grid, Modal, Input, Form, Dropdown } from "semantic-ui-react";

class UpdateModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            description: "",
            idUnit: "",
            unitPrice: "",
            types: [],
            ingredients: [],
            currentIngredient: "",
            currentQuantity: "",
            unitOptions: [],
            typeOptions: [],
            ingredientOptions: [],
        };
    }

    componentWillReceiveProps(nextProps) {
        const { open, product } = nextProps;
        if (product && !this.state.id) {
            this.setState({
                ...product,
            });
        }

        if (!open) {
            this.setState({
                id: "",
                name: "",
                description: "",
                idUnit: "",
                unitPrice: "",
                types: [],
                ingredients: [],
                currentQuantity: "",
                currentIngredient: "",
            });
        }
    }

    handleSaveProduct = () => {
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
        const {
            name,
            description,
            unitOptions,
            idUnit,
            unitPrice,
            typeOptions,
            types,
            ingredients,
            ingredientOptions,
            currentIngredient,
            currentQuantity,
        } = this.state;
        return (
            <Modal open={open} size="large">
                <Modal.Header>Sản phẩm</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Group widths="equal">
                            <Form.Field>
                                <label>Tên sản phẩm</label>
                                <Input onChange={this.handleChange("name")} value={name} fluid />
                            </Form.Field>
                            <Form.Field>
                                <label>Mô tả</label>
                                <Input onChange={this.handleChange("description")} value={description} fluid />
                            </Form.Field>
                        </Form.Group>
                        <Form.Group widths="equal">
                            <Form.Field>
                                <label>Đơn vị tính</label>
                                <Dropdown
                                    onChange={this.handleChange("idUnit")}
                                    value={idUnit}
                                    fluid
                                    selection
                                    options={unitOptions}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Đơn giá</label>
                                <Input onChange={this.handleChange("unitPrice")} value={unitPrice} fluid />
                            </Form.Field>
                        </Form.Group>
                        <Form.Field>
                            <label>Thể loại sản phẩm</label>
                            <Dropdown
                                fluid
                                multiple
                                selection
                                options={typeOptions}
                                value={types}
                                onChange={this.handleChange("types")}
                            />
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Header>Danh sách nguyên liệu</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Group widths="equal">
                            <Form.Field>
                                <label>Nguyên liệu</label>
                                <Dropdown
                                    fluid
                                    selection
                                    options={ingredientOptions}
                                    value={currentIngredient}
                                    onChange={this.handleChange("currentIngredient")}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Số lượng</label>
                                <Input onChange={this.handleChange("currentQuantity")} value={currentQuantity} />
                            </Form.Field>
                            <Form.Field>
                                <label>&nbsp;</label>
                                <Button content="Thêm mới" icon="plus" positive labelPosition="left" floated="left" />
                            </Form.Field>
                        </Form.Group>
                        {ingredients.map((ingredient, index) => {
                            return (
                                <Form.Group key={index}>
                                    <Form.Field>
                                        <Input fluid value={ingredient["name"]} label="Tên" readOnly />
                                    </Form.Field>
                                    <Form.Field>
                                        <Input fluid value={ingredient["quantity"]} label="Số lượng" readOnly />
                                    </Form.Field>
                                    <Form.Field>
                                        <Button color="yellow" icon="edit" />
                                        <Button color="red" icon="trash" />
                                    </Form.Field>
                                </Form.Group>
                            );
                        })}
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button content="Lưu" icon="checkmark" color="green" onClick={this.handleSaveProduct} />
                    <Button content="Đóng" onClick={() => onClose("updateModal")} />
                </Modal.Actions>
            </Modal>
        );
    }
}

class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: "",
            updateModal: true,
        };
    }

    componentDidMount() {
        // this.props.dispatch(ProductActions.getProducts());
        this.props.dispatch(IngredientActions.getIngredients());
        this.props.dispatch(UnitActions.getUnits());
        this.props.dispatch(ProductTypeActions.getTypes());
        
    }

    componentWillReceiveProps(nextProps) {
        const { reload, isCreatedSucceed } = nextProps;
        if (isCreatedSucceed) {
            this.handleCloseModal("updateModal");
        }
        if (reload) {
            this.props.dispatch(ProductActions.getProducts());
        }
    }

    handleClickEdit = (product) => {
        this.setState({
            product,
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
            product: "",
        });
    };

    handleClickDelete = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xoá?")) {
            this.props.dispatch(ProductActions.deleteProduct(id));
        }
    };

    handleSaveProduct = (info) => {
        const { product } = this.state;
        if (product) {
            this.props.dispatch(ProductActions.updateProduct(product["id"], info));
        } else {
            this.props.dispatch(ProductActions.createProduct(info));
        }
    };

    render() {
        const { pageLoading, products, types, ingredients, units } = this.props;
        const { product, updateModal } = this.state;
        return (
            <>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <Dimmer inverted active={pageLoading}>
                            <Loader>Loading...</Loader>
                        </Dimmer>
                        <Segment>
                            <Header>
                                Danh sách sản phẩm
                                <Button
                                    floated="right"
                                    icon="plus"
                                    content="Tạo mới"
                                    color="green"
                                    onClick={() => this.handleOpenModal("updateModal")}
                                />
                            </Header>
                        </Segment>
                        <Segment></Segment>
                    </Grid.Column>
                </Grid.Row>
                <UpdateModal
                    product={product}
                    open={updateModal}
                    onClose={this.handleCloseModal}
                    onSave={this.handleSaveProduct}
                    types={types}
                    ingredients={ingredients}
                    units={units}
                />
            </>
        );
    }
}

const mapStateToProps = ({ ProductReducer }) => ProductReducer;

export default connect(mapStateToProps, null)(Product);
