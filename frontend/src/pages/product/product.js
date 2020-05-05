import React from "react";
import { ProductActions } from "../../redux/_actions/product/productA";
import { IngredientActions } from "../../redux/_actions/ingredient/ingredientA";
import { UnitActions } from "../../redux/_actions/unit/unitA";
import { ProductTypeActions } from "../../redux/_actions/product/typeA";
import { connect, useSelector } from "react-redux";
import { Segment, Header, Dimmer, Loader, Button, Grid, Modal, Input, Form, Dropdown, Image } from "semantic-ui-react";
import { toast } from "react-toastify";
import ProductCard from "./product-card";
import Carousel from "../../components/carousel/carousel";
import _var from "../../utils/_var";
import { v4 } from "uuid";

class UpdateModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            description: "",
            idUnit: "",
            unitOptions: [],
            unitPrice: "",
            types: [],
            typeObjArr: [],
            typeOptions: [],
            imageObjArr: [],
            filesPreview: [],
            fileBase64ObjArr: [],
            ingredientOptions: [],
            ingredientObjArr: [],
            currentIngredient: 1,
            currentQuantity: "",
            selectedIngredients: [],
        };
    }

    componentWillReceiveProps(nextProps) {
        const { open, product, types, units, ingredients } = nextProps;
        const { id } = this.state;

        if (this.state.typeOptions.length != types.length) {
            this.setState({
                typeOptions: this.setOptions(types),
            });
        }

        if (this.state.unitOptions.length != units.length) {
            this.setState({
                unitOptions: this.setOptions(units),
            });
        }

        if (this.state.ingredientOptions.length != ingredients.length) {
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

        const selectedIngredients = [];
        if (product && !id) {
            const ingredientOptions = [...this.state.ingredientOptions];
            const ingredients = product["ingredients"].split(";");
            const ingredientObjArr = [];
            for (let ingredient of ingredients) {
                const ingredientInfo = ingredient.split("-");
                const existIngredientOption = ingredientOptions.find((i) => i.value == ingredientInfo[0]);
                ingredientObjArr.push({
                    isCreated: false,
                    isModified: false,
                    isDeleted: false,
                    idIngredient: ingredientInfo[0],
                    amount: ingredientInfo[1],
                    name: existIngredientOption["text"],
                });
                selectedIngredients.push(ingredientOptions.splice(ingredientOptions.indexOf(existIngredientOption), 1));
            }
            const imageObjArr = [];
            for (let image of product.images.split(";")) {
                imageObjArr.push({
                    isCreated: false,
                    isDeleted: false,
                    name: image,
                });
            }
            this.setState({
                ...product,
                types: product.idTypes.split(";").map((type) => parseInt(type)),
                ingredientObjArr,
                ingredientOptions,
                selectedIngredients,
                imageObjArr,
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
                fileBase64ObjArr: [],
                filesPreview: [],
                selectedIngredients: [],
                typeObjArr: [],
                imageObjArr: [],
                ingredientObjArr: [],
                currentQuantity: 1,
                currentIngredient: "",
                selectedIngredients: [],
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
            ingredientObjArr,
            fileBase64ObjArr,
            imageObjArr,
        } = this.state;
        const info = {
            name,
            description,
            idUnit,
            unitPrice,
            types,
            ingredientObjArr,
            fileBase64ObjArr,
            imageObjArr,
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
        const fileBase64ObjArr = [];
        for (let file of e.target.files) {
            const name = v4();
            filesPreview.push({
                url: URL.createObjectURL(file),
                name,
            });
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                fileBase64ObjArr.push({
                    base64: reader.result,
                    name,
                });
            };
            reader.onerror = function (error) {
                toast.error("Upload ảnh lỗi!");
            };
        }
        this.setState({
            filesPreview,
            fileBase64ObjArr,
        });
    };

    handleAddIngredient = () => {
        const { currentIngredient, currentQuantity } = this.state;
        const ingredientOptions = [...this.state.ingredientOptions];
        const selectedIngredients = [...this.state.selectedIngredients];
        const ingredientObjArr = [...this.state.ingredientObjArr];
        const selectedIngredient = ingredientOptions.find((e) => e.value === currentIngredient);
        if (selectedIngredient) {
            if (window.confirm("Bạn đồng ý thêm nguyên liệu này vào sản phẩm?")) {
                const info = {
                    idIngredient: currentIngredient,
                    amount: currentQuantity,
                    name: selectedIngredient["text"],
                    isCreated: true,
                    isDeleted: false,
                    isModified: false,
                };
                if (selectedIngredient) {
                    selectedIngredients.push(
                        ingredientOptions.splice(ingredientOptions.indexOf(selectedIngredient), 1)[0]
                    );
                    ingredientObjArr.push(info);
                }
                this.setState({
                    selectedIngredients,
                    ingredientOptions,
                    currentQuantity: 1,
                    ingredientObjArr,
                });
            }
        } else {
            toast.error("Bạn cần chọn nguyên liệu trước.");
        }
    };

    handleDeleteIngredient = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xoá nguyên liệu này?")) {
            const selectedIngredients = [...this.state.selectedIngredients];
            const ingredientObjArr = [...this.state.ingredientObjArr];
            const ingredientOptions = [...this.state.ingredientOptions];
            const deletedIngredient = ingredientObjArr.find((ingredient) => ingredient.idIngredient == id);
            if (deletedIngredient["isCreated"]) {
                ingredientObjArr.splice(ingredientObjArr.indexOf(deletedIngredient), 1);
                const deletedOption = selectedIngredients.find((ingredient) => ingredient.value == id);
                ingredientOptions.push(selectedIngredients.splice(selectedIngredients.indexOf(deletedOption), 1)[0]);
            } else {
                deletedIngredient["isDeleted"] = true;
            }
            this.setState({
                selectedIngredients,
                ingredientObjArr,
                ingredientOptions,
            });
        }
    };

    handleDeleteImage = (type, name) => {
        if (type == "old") {
            const imageObjArr = [...this.state.imageObjArr];
            const deletedImage = imageObjArr.find((img) => img.name == name);
            deletedImage.isDeleted = true;
            this.setState({
                imageObjArr,
            });
        } else {
            const fileBase64ObjArr = [...this.state.fileBase64ObjArr];
            const filesPreview = [...this.state.filesPreview];
            const deletedFileBase64 = fileBase64ObjArr.find((file) => file.name == name);
            fileBase64ObjArr.splice(fileBase64ObjArr.indexOf(deletedFileBase64), 1);
            const deletedFilePreview = filesPreview.find((file) => file.name == name);
            filesPreview.splice(filesPreview.indexOf(deletedFilePreview), 1);
            this.setState({
                fileBase64ObjArr,
                filesPreview,
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
            imageObjArr,
            filesPreview,
            currentIngredient,
            currentQuantity,
            ingredientOptions,
            ingredientObjArr,
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
                            <Input type="file" fluid multiple onChange={this.handleUploadFiles} accept="image/*" />
                        </Form.Field>
                        <Grid divided>
                            {imageObjArr.map((img, idx) => {
                                if (!img["isDeleted"])
                                    return (
                                        <Grid.Column width={4} key={idx}>
                                            <Button
                                                color="red"
                                                inverted
                                                icon="x"
                                                floated="right"
                                                onClick={() => this.handleDeleteImage("old", img["name"])}
                                            />
                                            <Image src={`${_var.domain_server}/public/img/${img["name"]}`} />
                                        </Grid.Column>
                                    );
                            })}
                            {filesPreview.map((file, idx) => (
                                <Grid.Column width={4} key={idx}>
                                    <Button
                                        color="red"
                                        inverted
                                        icon="x"
                                        floated="right"
                                        onClick={() => this.handleDeleteImage("new", file["name"])}
                                    />
                                    <Image src={file["url"]} />
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
                        {ingredientObjArr.map((ingredient, index) => {
                            if (!ingredient["isDeleted"])
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
                                                onClick={() => this.handleDeleteIngredient(ingredient["idIngredient"])}
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
        const { reload, isCreatedSucceed, products, types } = nextProps;
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
        const { pageLoading, types, ingredients, units, user } = this.props;
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
                                            return (
                                                <ProductCard
                                                    product={product}
                                                    key={idx}
                                                    user={user}
                                                    onClickEdit={this.handleClickEdit}
                                                />
                                            );
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
                                                <Input icon="angle right" />
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

const mapStateToProps = ({ ProductReducer }) => ProductReducer;
export default connect(mapStateToProps, null)(Product);
