import React from "react";
import { ProductActions } from "../../redux/_actions/product/productA";
import { connect } from "react-redux";
import { Segment, Grid, Image, Message, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import _var from "../../utils/_var";

function ProductThumbnail(props) {
    const { product } = props;
    return (
        <Grid.Row style={{ marginTop: 5 }}>
            <Grid.Column width={16}>
                <Segment>
                    <Grid>
                        <Grid.Column width={6}>
                            <Link to={`/product/${product["id"]}`}>
                                <Image
                                    src={`${_var.domain_server}/public/img/${product["images"].split(";")[0]}`}
                                    size="small"
                                />
                            </Link>
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <p>
                                <Link to={`/product/${product["id"]}`}>
                                    {" "}
                                    <b>{product["name"]}</b>
                                </Link>
                            </p>
                            <span style={{ color: "red" }}>
                                {product["unitPrice"].toLocaleString("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                })}
                            </span>
                            / {product["unit"]}
                        </Grid.Column>
                    </Grid>
                </Segment>
            </Grid.Column>
        </Grid.Row>
    );
}

class ProductThumbnails extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(ProductActions.getProducts());
    }

    render() {
        const { products } = this.props;
        return (
            <Grid.Column width={4}>
                <Message>
                    <Message.Header>
                        Sản phẩm mới <Icon name="clock outline" color="blue" />
                    </Message.Header>
                </Message>
                {products
                    .sort((a, b) => {
                        if (a["createdDate"] > b["createdDate"]) return -1;
                        return 1;
                    })
                    .map((product, idx) => {
                        if (idx <= 3) {
                            return <ProductThumbnail key={idx} product={product} />;
                        }
                    })}
                <Message>
                    <Message.Header>
                        Xem nhiều nhất <Icon name="hotjar" color="orange" />
                    </Message.Header>
                </Message>
                {products
                    .sort((a, b) => {
                        return b["viewNumber"] - a["viewNumber"];
                    })
                    .map((product, idx) => {
                        if (idx <= 3) {
                            return <ProductThumbnail key={idx} product={product} />;
                        }
                    })}
            </Grid.Column>
        );
    }
}

const mapStateToProps = ({ ProductReducer }) => ProductReducer;

export default connect(mapStateToProps, null)(ProductThumbnails);
