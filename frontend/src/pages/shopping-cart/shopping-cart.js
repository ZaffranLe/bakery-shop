import React from "react";
import { ExportReceiptActions } from "../../redux/_actions/export-receipt/exportReceiptA";
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
    Image,
    Message,
    Icon,
    Divider,
    Comment,
    TextArea,
    Table,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import _var from "../../utils/_var";
import Layout from "../../components/layout/layout";
import Auth from "../../components/auth/auth";
import moment from "moment";
import $ from "jquery";
import jwt from "jsonwebtoken";
import { CartActions } from "../../redux/_actions/shopping-cart/cartA";
import { utils } from "../../utils/_common-functions";
import ProductThumbnails from "../product/product-thumbnails";

class ShoppingCart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idUser: "",
            fullName: "",
            address: "",
            phone: "",
            note: "",
        };
    }

    componentDidMount() {
        const token = window.localStorage.getItem("token");
        if (token) {
            const userInfo = jwt.decode(token);
            this.setState({
                idUser: userInfo["userId"],
                fullName: userInfo["fullName"],
                address: userInfo["address"],
                phone: userInfo["phone"],
            });
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { isCreatedSucceed } = nextProps;
        if (isCreatedSucceed) {
            this.props.dispatch(CartActions.refreshCart());
        }
    }

    handleRefreshCart = () => {
        if (window.confirm("Bạn có muốn làm mới giỏ hàng?")) {
            this.props.dispatch(CartActions.refreshCart());
        }
    };

    handleRemoveProductFromCart = (id) => {
        if (window.confirm("Bạn có muốn xoá sản phẩm này khỏi giỏ hàng?")) {
            this.props.dispatch(CartActions.removeProduct(id));
        }
    };

    handleChangeAmount = (id) => (e) => {
        this.props.dispatch(CartActions.changeAmount(id, parseInt(e.target.value)));
    };

    handleChangeInfo = (name) => (e, data) => {
        this.setState({
            [name]: data.value,
        });
    };

    handleConfirmCart = () => {
        if (window.confirm("Bạn có muốn xác nhận mua hàng?")) {
            const { fullName, idUser, phone, address, note } = this.state;
            const { products } = this.props;
            const info = {
                fullName,
                idUser,
                phone,
                address,
                note,
                products,
            };
            this.props.dispatch(ExportReceiptActions.createExportReceipt(info));
        }
    };

    render() {
        const { products, pageLoading } = this.props;
        const { fullName, address, phone, note } = this.state;
        const verifyInput = fullName && address && phone ? false : true;
        return (
            <Layout permission={_var.permission.none}>
                <Dimmer inverted active={pageLoading}>
                    <Loader>Loading...</Loader>
                </Dimmer>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <Segment>
                            <Header>Giỏ hàng</Header>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column width={13}>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={12}>
                                    {products.length > 0 ? (
                                        <Segment>
                                            <Button
                                                icon="refresh"
                                                color="blue"
                                                content="Làm mới giỏ hàng"
                                                labelPosition="left"
                                                onClick={this.handleRefreshCart}
                                            />
                                            <Table celled structured textAlign="center">
                                                <Table.Header>
                                                    <Table.Row>
                                                        <Table.HeaderCell>#</Table.HeaderCell>
                                                        <Table.HeaderCell>Sản phẩm</Table.HeaderCell>
                                                        <Table.HeaderCell>Chi phí</Table.HeaderCell>
                                                        <Table.HeaderCell></Table.HeaderCell>
                                                    </Table.Row>
                                                </Table.Header>
                                                <Table.Body>
                                                    {products.map((product, idx) => {
                                                        const totalPrice = product["unitPrice"] * product["amount"];
                                                        return (
                                                            <Table.Row key={idx}>
                                                                <Table.Cell>{idx + 1}</Table.Cell>
                                                                <Table.Cell>
                                                                    <Grid>
                                                                        <Grid.Column width={8} textAlign="right">
                                                                            <Image
                                                                                size="small"
                                                                                src={`${_var.domain_server}/public/img/${product["image"]}`}
                                                                            />
                                                                        </Grid.Column>
                                                                        <Grid.Column width={8} textAlign="left">
                                                                            <Header>{product["name"]}</Header>
                                                                            <span
                                                                                style={{
                                                                                    color: "red",
                                                                                    fontWeight: "bold",
                                                                                }}
                                                                            >
                                                                                {product["unitPrice"].toLocaleString(
                                                                                    "vi-VN",
                                                                                    {
                                                                                        style: "currency",
                                                                                        currency: "VND",
                                                                                    }
                                                                                )}
                                                                            </span>{" "}
                                                                            / {product["unit"]}
                                                                        </Grid.Column>
                                                                    </Grid>
                                                                </Table.Cell>
                                                                <Table.Cell>
                                                                    {product["unitPrice"].toLocaleString("vi-VN", {
                                                                        style: "currency",
                                                                        currency: "VND",
                                                                    })}{" "}
                                                                    x{" "}
                                                                    <Input
                                                                        type="number"
                                                                        defaultValue={product["amount"]}
                                                                        onKeyPress={utils.handleInputNumber}
                                                                        min={1}
                                                                        label={product["unit"]}
                                                                        labelPosition="right"
                                                                        onBlur={this.handleChangeAmount(product["id"])}
                                                                    />{" "}
                                                                    ={" "}
                                                                    <span style={{ color: "red", fontWeight: "bold" }}>
                                                                        {totalPrice.toLocaleString("vi-VN", {
                                                                            style: "currency",
                                                                            currency: "VND",
                                                                        })}
                                                                    </span>
                                                                </Table.Cell>
                                                                <Table.Cell
                                                                    style={{ textAlign: "center", width: "10%" }}
                                                                >
                                                                    <Button
                                                                        color="red"
                                                                        icon="trash"
                                                                        size="small"
                                                                        onClick={() =>
                                                                            this.handleRemoveProductFromCart(
                                                                                product["id"]
                                                                            )
                                                                        }
                                                                    />
                                                                </Table.Cell>
                                                            </Table.Row>
                                                        );
                                                    })}
                                                </Table.Body>
                                                <Table.Footer>
                                                    <Table.Row>
                                                        <Table.HeaderCell colSpan={2} textAlign="right">
                                                            <b>Tổng tiền</b>
                                                        </Table.HeaderCell>
                                                        <Table.HeaderCell
                                                            colSpan={2}
                                                            style={{ color: "red", fontWeight: "bold" }}
                                                        >
                                                            {products
                                                                .map(
                                                                    (product) =>
                                                                        product["unitPrice"] * product["amount"]
                                                                )
                                                                .reduce((sum, value) => sum + value)
                                                                .toLocaleString("vi-VN", {
                                                                    style: "currency",
                                                                    currency: "VND",
                                                                })}
                                                        </Table.HeaderCell>
                                                    </Table.Row>
                                                </Table.Footer>
                                            </Table>
                                            <Form>
                                                <Form.Group widths="equal">
                                                    <Form.Field>
                                                        <label>Họ tên</label>
                                                        <Input
                                                            fluid
                                                            onChange={this.handleChangeInfo("fullName")}
                                                            value={fullName}
                                                        />
                                                    </Form.Field>
                                                    <Form.Field>
                                                        <label>Số điện thoại</label>
                                                        <Input
                                                            fluid
                                                            onChange={this.handleChangeInfo("phone")}
                                                            onKeyPress={utils.handleInputNumber}
                                                            value={phone}
                                                        />
                                                    </Form.Field>
                                                    <Form.Field>
                                                        <label>Địa chỉ</label>
                                                        <Input
                                                            fluid
                                                            onChange={this.handleChangeInfo("address")}
                                                            value={address}
                                                        />
                                                    </Form.Field>
                                                </Form.Group>
                                                <Form.Field>
                                                    <label>Chú thích</label>
                                                    <TextArea onChange={this.handleChangeInfo("note")} value={note} />
                                                </Form.Field>
                                                <Form.Field>
                                                    <Button
                                                        icon="cart"
                                                        disabled={verifyInput}
                                                        content="Mua hàng"
                                                        labelPosition="left"
                                                        color="green"
                                                        onClick={this.handleConfirmCart}
                                                    />
                                                </Form.Field>
                                            </Form>
                                        </Segment>
                                    ) : (
                                        <Message warning>
                                            <Message.Header>
                                                Không có sản phẩm nào trong giỏ hàng, bấm vào{" "}
                                                <Link to="/product">đây</Link> để mua sắm ngay.
                                            </Message.Header>
                                        </Message>
                                    )}
                                </Grid.Column>
                                <ProductThumbnails />
                            </Grid.Row>
                        </Grid>
                    </Grid.Column>
                </Grid.Row>
            </Layout>
        );
    }
}

const mapStateToProps = ({ CartReducer }) => CartReducer;

export default connect(mapStateToProps, null)(ShoppingCart);
