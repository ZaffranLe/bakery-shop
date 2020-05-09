import React from "react";
import { ProductActions } from "../../redux/_actions/product/productA";
import { CartActions } from "../../redux/_actions/shopping-cart/cartA";
import { ProductCommentActions } from "../../redux/_actions/product/commentA";
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
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import _var from "../../utils/_var";
import Layout from "../../components/layout/layout";
import Auth from "../../components/auth/auth";
import moment from "moment";
import $ from "jquery";
import jwt from "jsonwebtoken";
import ProductThumbnails from "./product-thumbnails";

class ProductInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: "",
            rating: 5,
            user: "",
        };
    }

    componentDidMount() {
        const { id } = this.props;
        this.props.dispatch(ProductActions.getProduct(id));
        const token = window.localStorage.getItem("token");
        const userInfo = jwt.decode(token);
        this.setState({
            user: userInfo,
        });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { reload, id } = nextProps;
        if (id != this.props.id) {
            this.props.dispatch(ProductActions.getProduct(id));
        }

        if (reload) {
            this.props.dispatch(ProductActions.getProduct(this.props.id));
        }
    }

    handleChange = (name) => (e, data) => {
        this.setState({
            [name]: data.value,
        });
    };

    handleSubmitComment = () => {
        if (window.confirm("Bạn có chắc chắn muốn đăng đánh giá?")) {
            const { content, rating } = this.state;
            const { product } = this.props;
            const info = {
                content,
                rating,
                idProduct: product["product"]["id"],
            };
            this.props.dispatch(ProductCommentActions.createComment(info));
        }
    };

    handleHoverStar = (e) => {
        const stars = $("[data-name=rating-star]");
        stars.removeClass("outline");
        stars.addClass("outline");
        stars.filter((ele) => stars[ele].dataset.value <= e.target.dataset.value).removeClass("outline");
    };

    handleLeaveStar = () => {
        const { rating } = this.state;
        const stars = $("[data-name=rating-star]");
        stars.removeClass("outline");
        stars.filter((ele) => stars[ele].dataset.value > rating).addClass("outline");
    };

    handleClickStar = (e) => {
        const rating = e.target.dataset.value;
        if (window.confirm(`Đánh giá sản phẩm ${rating} sao?`)) {
            this.setState({
                rating,
            });
        }
    };

    addProductToCart = () => {
        const { product } = this.props.product;
        if (window.confirm("Thêm sản phẩm này vào giỏ hàng?")) {
            const info = {
                id: product["id"],
                name: product["name"],
                unitPrice: product["unitPrice"],
                unit: product["unit"],
                image: this.props.product["images"][0]["name"],
            };
            this.props.dispatch(CartActions.addProduct(info));
        }
    };

    render() {
        const { pageLoading, product } = this.props;
        const { content, user } = this.state;
        let commentExist = false;
        if (user && product) {
            const userComment = product["comments"].find((comment) => comment["idUser"] == user["userId"]);
            if (userComment) {
                commentExist = true;
            }
        }
        let averageRating = 0;
        if (product && product["comments"].length > 0) {
            averageRating =
                product["comments"].map((comment) => comment["rating"]).reduce((total, rating) => total + rating) /
                product["comments"].length;
        }
        return (
            <Layout permission={_var.permission.none}>
                <Dimmer inverted active={pageLoading}>
                    <Loader>Loading...</Loader>
                </Dimmer>
                {product && (
                    <>
                        <Grid.Row>
                            <Grid.Column width={16}>
                                <Segment>
                                    <Header>
                                        <Link to="/product">Danh sách sản phẩm</Link>
                                    </Header>
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row centered>
                            <Grid.Column width={13}>
                                <Grid>
                                    <Grid.Column width={12}>
                                        <Grid>
                                            <Grid.Row>
                                                <Grid.Column width={6}>
                                                    <Segment>
                                                        <Carousel>
                                                            {product &&
                                                                product["images"].map((img, idx) => {
                                                                    return (
                                                                        <div key={idx}>
                                                                            <img
                                                                                src={`${_var.domain_server}/public/img/${img["name"]}`}
                                                                            />
                                                                        </div>
                                                                    );
                                                                })}
                                                        </Carousel>
                                                    </Segment>
                                                </Grid.Column>
                                                <Grid.Column width={10}>
                                                    <Segment>
                                                        <Header>{product["product"]["name"]}</Header>
                                                        <Grid>
                                                            <Grid.Column width={3}>
                                                                <b>Mã sản phẩm:</b> {product["product"]["id"]}
                                                            </Grid.Column>
                                                            <Grid.Column width={3}>
                                                                <b>Lượt đánh giá:</b> {product["comments"].length}
                                                            </Grid.Column>
                                                            <Grid.Column width={6}>
                                                                <b>Đánh giá trung bình:</b>
                                                                {[...Array(5)].map((e, i) => {
                                                                    return i < Math.round(averageRating) ? (
                                                                        <Icon key={i} name="star" color="yellow" />
                                                                    ) : (
                                                                        <Icon
                                                                            key={i}
                                                                            name="star outline"
                                                                            color="yellow"
                                                                        />
                                                                    );
                                                                })}
                                                            </Grid.Column>
                                                            <Grid.Column width={4}>
                                                                <b>Lượt xem:</b> {product["product"]["viewNumber"]}{" "}
                                                                <Icon name="eye" color="teal" />
                                                            </Grid.Column>
                                                        </Grid>
                                                        <Divider />
                                                        <h4>Chi tiết sản phẩm</h4>
                                                        <Grid>
                                                            <Grid.Row centered>
                                                                <Grid.Column width={6}>
                                                                    <p>- Mô tả: {product["product"]["description"]}</p>
                                                                    <p>
                                                                        - Thể loại:
                                                                        <ul>
                                                                            {product["types"].map((type, idx) => {
                                                                                return (
                                                                                    <li key={idx}>{type["name"]}</li>
                                                                                );
                                                                            })}
                                                                        </ul>
                                                                    </p>
                                                                </Grid.Column>
                                                                <Grid.Column width={6}>
                                                                    <p>
                                                                        - Danh sách nguyên liệu:
                                                                        <ul>
                                                                            {product["ingredients"].map(
                                                                                (ingredient, idx) => {
                                                                                    return (
                                                                                        <li key={idx}>
                                                                                            {ingredient["name"]}:{" "}
                                                                                            {ingredient["amount"]}{" "}
                                                                                            {ingredient["unit"]}
                                                                                        </li>
                                                                                    );
                                                                                }
                                                                            )}
                                                                        </ul>
                                                                    </p>
                                                                </Grid.Column>
                                                            </Grid.Row>
                                                            <Divider />
                                                            <Grid.Row centered>
                                                                <Grid.Column width={16}>
                                                                    <b style={{ fontSize: 20 }}>
                                                                        <big>Giá:</big>{" "}
                                                                        <span style={{ color: "red" }}>
                                                                            {product["product"][
                                                                                "unitPrice"
                                                                            ].toLocaleString("vi-VN", {
                                                                                style: "currency",
                                                                                currency: "VND",
                                                                            })}{" "}
                                                                            / {product["product"]["unit"]}
                                                                        </span>
                                                                    </b>
                                                                    <Button
                                                                        icon="cart"
                                                                        labelPosition="left"
                                                                        floated="right"
                                                                        color="green"
                                                                        content="Cho vào giỏ hàng"
                                                                        onClick={this.addProductToCart}
                                                                    />
                                                                </Grid.Column>
                                                            </Grid.Row>
                                                        </Grid>
                                                    </Segment>
                                                </Grid.Column>
                                            </Grid.Row>
                                            <Grid.Row>
                                                <Grid.Column width={16}>
                                                    <Segment>
                                                        <Comment.Group style={{ maxWidth: "100%" }}>
                                                            <Header as="h3" dividing>
                                                                Đánh giá
                                                            </Header>
                                                            {product["comments"].map((comment, idx) => {
                                                                return (
                                                                    <Comment>
                                                                        <Comment.Content>
                                                                            <Comment.Author as="a">
                                                                                {comment["username"]}
                                                                            </Comment.Author>
                                                                            <Comment.Metadata>
                                                                                <div>
                                                                                    {moment(
                                                                                        comment["createdDate"]
                                                                                    ).format("YYYY-MM-DD HH:mm:ss")}
                                                                                </div>
                                                                            </Comment.Metadata>
                                                                            <Comment.Text>
                                                                                <p>{comment["content"]}</p>
                                                                                <span>
                                                                                    {[...Array(5)].map((e, i) => {
                                                                                        return i < comment["rating"] ? (
                                                                                            <Icon
                                                                                                key={i}
                                                                                                name="star"
                                                                                                color="yellow"
                                                                                            />
                                                                                        ) : (
                                                                                            <Icon
                                                                                                key={i}
                                                                                                name="star outline"
                                                                                                color="yellow"
                                                                                            />
                                                                                        );
                                                                                    })}
                                                                                </span>
                                                                            </Comment.Text>
                                                                        </Comment.Content>
                                                                    </Comment>
                                                                );
                                                            })}
                                                            <Divider />
                                                            {!commentExist && (
                                                                <Auth permission={_var.permission.none}>
                                                                    <Form reply>
                                                                        <Form.Field>
                                                                            <label>Rating:</label>
                                                                            <Icon
                                                                                name="star"
                                                                                color="yellow"
                                                                                data-name="rating-star"
                                                                                data-value={1}
                                                                                onMouseOver={this.handleHoverStar}
                                                                                onMouseLeave={this.handleLeaveStar}
                                                                                onClick={this.handleClickStar}
                                                                            />
                                                                            <Icon
                                                                                name="star"
                                                                                color="yellow"
                                                                                data-name="rating-star"
                                                                                data-value={2}
                                                                                onMouseOver={this.handleHoverStar}
                                                                                onMouseLeave={this.handleLeaveStar}
                                                                                onClick={this.handleClickStar}
                                                                            />
                                                                            <Icon
                                                                                name="star"
                                                                                color="yellow"
                                                                                data-name="rating-star"
                                                                                data-value={3}
                                                                                onMouseOver={this.handleHoverStar}
                                                                                onMouseLeave={this.handleLeaveStar}
                                                                                onClick={this.handleClickStar}
                                                                            />
                                                                            <Icon
                                                                                name="star"
                                                                                color="yellow"
                                                                                data-name="rating-star"
                                                                                data-value={4}
                                                                                onMouseOver={this.handleHoverStar}
                                                                                onMouseLeave={this.handleLeaveStar}
                                                                                onClick={this.handleClickStar}
                                                                            />
                                                                            <Icon
                                                                                name="star"
                                                                                color="yellow"
                                                                                data-name="rating-star"
                                                                                data-value={5}
                                                                                onMouseOver={this.handleHoverStar}
                                                                                onMouseLeave={this.handleLeaveStar}
                                                                                onClick={this.handleClickStar}
                                                                            />
                                                                        </Form.Field>
                                                                        <Form.Field>
                                                                            <TextArea
                                                                                value={content}
                                                                                onChange={this.handleChange("content")}
                                                                            />
                                                                        </Form.Field>
                                                                        <Form.Field>
                                                                            <Button
                                                                                content="Đăng"
                                                                                labelPosition="left"
                                                                                icon="edit"
                                                                                primary
                                                                                onClick={this.handleSubmitComment}
                                                                            />
                                                                        </Form.Field>
                                                                    </Form>
                                                                </Auth>
                                                            )}
                                                        </Comment.Group>
                                                    </Segment>
                                                </Grid.Column>
                                            </Grid.Row>
                                        </Grid>
                                    </Grid.Column>
                                    <ProductThumbnails />
                                </Grid>
                            </Grid.Column>
                        </Grid.Row>
                    </>
                )}
            </Layout>
        );
    }
}

const mapStateToProps = ({ ProductReducer }) => ProductReducer;

export default connect(mapStateToProps, null)(ProductInfo);
