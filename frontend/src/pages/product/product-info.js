import React from "react";
import { ProductActions } from "../../redux/_actions/product/productA";
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
    Dropdown,
    Message,
    Icon,
    Divider,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import _var from "../../utils/_var";

class ProductInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { id } = this.props;
        this.props.dispatch(ProductActions.getProduct(id));
    }

    render() {
        const { pageLoading, product } = this.props;
        return (
            <>
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
                            <Grid.Column width={12}>
                                <Grid>
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
                                                    <b>Lượt đánh giá:</b> 0
                                                </Grid.Column>
                                                <Grid.Column width={5}>
                                                    <b>Đánh giá trung bình:</b>
                                                    <Icon name="star outline" color="yellow" />
                                                    <Icon name="star outline" color="yellow" />
                                                    <Icon name="star outline" color="yellow" />
                                                    <Icon name="star outline" color="yellow" />
                                                    <Icon name="star outline" color="yellow" />
                                                </Grid.Column>
                                                <Grid.Column width={5}>
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
                                                                    return <li key={idx}>{type["name"]}</li>;
                                                                })}
                                                            </ul>
                                                        </p>
                                                    </Grid.Column>
                                                    <Grid.Column width={6}>
                                                        <p>
                                                            - Danh sách nguyên liệu:
                                                            <ul>
                                                                {product["ingredients"].map((ingredient, idx) => {
                                                                    return (
                                                                        <li key={idx}>
                                                                            {ingredient["name"]}: {ingredient["amount"]}{" "}
                                                                            {ingredient["unit"]}
                                                                        </li>
                                                                    );
                                                                })}
                                                            </ul>
                                                        </p>
                                                    </Grid.Column>
                                                </Grid.Row>
                                                <Divider />
                                                <Grid.Row centered>
                                                    <Grid.Column width={16}>
                                                            <b style={{fontSize: 20}}>
                                                                <big>Giá:</big>{" "}
                                                                <span style={{ color: "red" }}>
                                                                    {product["product"]["unitPrice"]}đ /{" "}
                                                                    {product["product"]["unit"]}
                                                                </span>
                                                            </b>
                                                            <Button icon="cart" labelPosition="left" floated="right" color="green" content="Cho vào giỏ hàng" />
                                                    </Grid.Column>
                                                </Grid.Row>
                                            </Grid>
                                        </Segment>
                                    </Grid.Column>
                                </Grid>
                            </Grid.Column>
                        </Grid.Row>
                    </>
                )}
            </>
        );
    }
}

const mapStateToProps = ({ ProductReducer }) => ProductReducer;

export default connect(mapStateToProps, null)(ProductInfo);
