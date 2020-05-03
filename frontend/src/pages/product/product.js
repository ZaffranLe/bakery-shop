import React from "react";
import { ProductActions } from "../../redux/_actions/product/productA";
import { IngredientActions } from "../../redux/_actions/ingredient/ingredientA";
import { UnitActions } from "../../redux/_actions/unit/unitA";
import { ProductTypeActions } from "../../redux/_actions/product/typeA";
import { connect } from "react-redux";
import { Segment, Header, Dimmer, Loader, Button, Grid, Modal, Input, Form, Dropdown, Image } from "semantic-ui-react";
import { toast } from "react-toastify";
import ProductCard from "./product-card";
import Carousel from "../../components/carousel/carousel";

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
            currentIngredient: 1,
            currentQuantity: "",
            unitOptions: [],
            typeOptions: [],
            ingredientOptions: [],
            images: [],
            filesPreview: [],
            fileBase64Arr: [],
            selectedIngredients: [],
        };
    }

    componentWillReceiveProps(nextProps) {
        const { open, product, types, units, ingredients } = nextProps;
        const { id, typeOptions, unitOptions, ingredientOptions } = this.state;
        if (product && !id) {
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
                currentQuantity: 1,
                currentIngredient: "",
                images: [],
                fileBase64Arr: [],
                filesPreview: [],
                selectedIngredients: [],
            });
        }

        if (typeOptions.length != types.length) {
            this.setState({
                typeOptions: this.setOptions(types),
            });
        }

        if (unitOptions.length != units.length) {
            this.setState({
                unitOptions: this.setOptions(units),
            });
        }

        if (ingredientOptions.length != ingredients.length) {
            const options = [];
            for (let ingredient of ingredients) {
                options.push({
                    key: ingredient["id"],
                    value: ingredient["id"],
                    text: `${ingredient["name"]} - ${ingredient["unit"]}`,
                });
            }
            this.setState({
                ingredientOptions: options,
            });
        }
    }

    setOptions = (array) => {
        const options = [];
        for (let obj of array) {
            options.push({
                key: obj["id"],
                value: obj["id"],
                text: obj["name"],
            });
        }
        return options;
    };

    handleSaveProduct = () => {
        const {
            name,
            description,
            idUnit,
            unitPrice,
            types,
            ingredients,
            currentQuantity,
            currentIngredient,
            images,
            fileBase64Arr,
        } = this.state;
        const info = {
            name,
            description,
            idUnit,
            unitPrice,
            types,
            ingredients,
            currentQuantity,
            currentIngredient,
            images,
            fileBase64Arr,
        };
        this.props.onSave(info);
    };

    handleChange = (name) => (e, data) => {
        this.setState({
            [name]: data.value,
        });
    };

    handleUploadFiles = (e) => {
        const filesPreview = [];
        const fileBase64Arr = [];
        for (let file of e.target.files) {
            filesPreview.push(URL.createObjectURL(file));
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                fileBase64Arr.push(reader.result);
            };
            reader.onerror = function (error) {
                toast.error("Upload ảnh lỗi!");
            };
        }
        this.setState({
            filesPreview,
            fileBase64Arr,
        });
    };

    handleAddIngredient = () => {
        const { currentIngredient, currentQuantity } = this.state;
        const ingredientOptions = [...this.state.ingredientOptions];
        const selectedIngredient = ingredientOptions.find((e) => e.value === currentIngredient);
        if (selectedIngredient) {
            if (window.confirm("Bạn đồng ý thêm nguyên liệu này vào sản phẩm?")) {
                const info = {
                    id: currentIngredient,
                    amount: currentQuantity,
                    name: selectedIngredient["text"],
                };
                if (selectedIngredient) {
                    ingredientOptions.splice(ingredientOptions.indexOf(selectedIngredient), 1);
                }
                this.setState({
                    ingredients: [...this.state.ingredients, info],
                    selectedIngredients: [...this.state.selectedIngredients, selectedIngredient],
                    ingredientOptions: ingredientOptions,
                    currentQuantity: 1,
                });
            }
        } else {
            toast.error("Bạn cần chọn nguyên liệu trước.");
        }
    };

    handleDeleteIngredient = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xoá nguyên liệu này?")) {
            const selectedIngredients = [...this.state.selectedIngredients];
            const ingredients = [...this.state.ingredients];
            const deletedIngredient = selectedIngredients.findIndex((e) => e.value === id);
            ingredients.splice(
                ingredients.findIndex((e) => e.id == id),
                1
            );
            this.setState({
                ingredientOptions: this.state.ingredientOptions.concat(
                    selectedIngredients.splice(deletedIngredient, 1)
                ),
                selectedIngredients,
                ingredients,
            });
        }
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
            images,
            filesPreview,
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
                        <Form.Field>
                            <Input
                                type="file"
                                fluid
                                multiple
                                value={images}
                                onChange={this.handleUploadFiles}
                                accept="image/*"
                            />
                        </Form.Field>
                        <Grid divided>
                            {filesPreview.map((url, idx) => (
                                <Grid.Column width={4} key={idx}>
                                    <Image src={url} />
                                </Grid.Column>
                            ))}
                        </Grid>
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
                                <Input
                                    onChange={this.handleChange("currentQuantity")}
                                    type="number"
                                    min={1}
                                    value={currentQuantity}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>&nbsp;</label>
                                <Button
                                    content="Thêm mới"
                                    icon="plus"
                                    positive
                                    labelPosition="left"
                                    floated="left"
                                    onClick={this.handleAddIngredient}
                                />
                            </Form.Field>
                        </Form.Group>
                        {ingredients.map((ingredient, index) => {
                            return (
                                <Form.Group key={index} widths="equal">
                                    <Form.Field>
                                        <Input fluid value={ingredient["name"]} label="Tên" readOnly />
                                    </Form.Field>
                                    <Form.Field>
                                        <Input fluid value={ingredient["amount"]} label="Số lượng" readOnly />
                                    </Form.Field>
                                    <Form.Field>
                                        <Button
                                            color="red"
                                            icon="trash"
                                            onClick={() => this.handleDeleteIngredient(ingredient["id"])}
                                        />
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
            updateModal: false,
            products: [],
            productsFiltered: [],
            typeOptions: [],
            typesFiltered: [],
        };
    }

    componentDidMount() {
        this.props.dispatch(ProductActions.getProducts());
        this.props.dispatch(IngredientActions.getIngredients());
        this.props.dispatch(UnitActions.getUnits());
        this.props.dispatch(ProductTypeActions.getTypes());
    }

    componentWillReceiveProps(nextProps) {
        const { reload, isCreatedSucceed, products, types } = nextProps.ProductReducer;
        if (isCreatedSucceed) {
            this.handleCloseModal("updateModal");
        }
        if (reload) {
            this.props.dispatch(ProductActions.getProducts());
        }
        this.setState({
            products,
            productsFiltered: products,
        });
        if (types.length != this.state.typeOptions.length) {
            const options = [];
            for (let type of types) {
                options.push({
                    key: type["id"],
                    value: type["id"],
                    text: type["name"],
                });
            }
            this.setState({
                typeOptions: options,
            });
        }
    }

    handleChangeType = (e, data) => {
        this.onChange("typesFiltered")(e, data);
    };

    onChange = (name) => (e, data) => {
        this.setState({
            [name]: data.value,
        });
    };

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
        const { pageLoading, types, ingredients, units } = this.props.ProductReducer;
        const { user } = this.props.UserReducer;
        const { product, updateModal, productsFiltered, typesFiltered, typeOptions } = this.state;
        return (
            <div>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <Dimmer inverted active={pageLoading}>
                            <Loader>Loading...</Loader>
                        </Dimmer>
                        <Segment>
                            <Header>
                                Danh sách sản phẩm
                                {user && user["permissionName"] == "ADMIN" && (
                                    <Button
                                        floated="right"
                                        icon="plus"
                                        content="Tạo mới"
                                        color="green"
                                        onClick={() => this.handleOpenModal("updateModal")}
                                    />
                                )}
                            </Header>
                        </Segment>
                        <Grid>
                            <Grid.Column width={12}>
                                <Segment>
                                    <Carousel />
                                </Segment>
                                <Segment>
                                    <Grid>
                                        {productsFiltered.map((product, idx) => {
                                            return <ProductCard product={product} key={idx} user={user} />;
                                        })}
                                    </Grid>
                                </Segment>
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <Segment>
                                    <Header>Lọc sản phẩm</Header>
                                    <Form>
                                        <Form.Field>
                                            <label>Tên</label>
                                            <Input fluid />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Loại</label>
                                            <Dropdown
                                                fluid
                                                selection
                                                multiple
                                                value={typesFiltered}
                                                options={typeOptions}
                                                onChange={this.handleChangeType}
                                            />
                                        </Form.Field>
                                        <Form.Group widths="equal">
                                            <Form.Field>
                                                <label>Khoảng giá</label>
                                                <Input icon="angle right" iconPosition="right" />
                                            </Form.Field>
                                            <Form.Field>
                                                <label>&nbsp;</label>
                                                <Input icon="angle right" iconPosition="left" />
                                            </Form.Field>
                                        </Form.Group>
                                    </Form>
                                </Segment>
                            </Grid.Column>
                        </Grid>
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
            </div>
        );
    }
}

const mapStateToProps = ({ ProductReducer, UserReducer }) => ({
    ProductReducer,
    UserReducer,
});

export default connect(mapStateToProps, null)(Product);
