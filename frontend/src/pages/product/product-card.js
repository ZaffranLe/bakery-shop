import React from "react";
import { Card, Grid, Image, Button, Icon } from "semantic-ui-react";
import _var from "../../utils/_var";
import { Link } from "react-router-dom";
import Auth from "../../components/auth/auth";

class ProductCard extends React.Component {
    constructor(props) {
        super(props);
    }

    addProductToCart = () => {
        const { product, onAddItemToCart } = this.props;
        if (window.confirm("Thêm sản phẩm này vào giỏ hàng?")) {
            onAddItemToCart(product);
        }
    };

    render() {
        const { product, onClickEdit, onClickDelete } = this.props;
        const images = product["images"].split(";");
        return (
            <Grid.Column width={4}>
                <Card centered as={Link} to="#">
                    <Image
                        as={Link}
                        to={`/product/${product["id"]}`}
                        src={`${_var.domain_server}/public/img/${images[0]}`}
                        wrapped
                        ui={false}
                    />
                    <Card.Content as={Link} to={`/product/${product["id"]}`}>
                        <Card.Header>{product["name"]}</Card.Header>
                        <Card.Meta>{product["description"]}</Card.Meta>
                        <Card.Description>
                            <big>
                                <b>
                                    <span style={{ color: "red" }}>
                                        {product["unitPrice"].toLocaleString("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        })}
                                    </span>{" "}
                                    /{product["unit"]}
                                </b>
                            </big>
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <Card.Description>
                            <Button
                                size="small"
                                icon="cart"
                                color="orange"
                                inverted
                                content="Thêm vào giỏ"
                                labelPosition="left"
                                onClick={this.addProductToCart}
                            />
                            <Auth permission={_var.permission.admin}>
                                <Button size="small" icon="edit" color="yellow" onClick={() => onClickEdit(product)} />
                                <Button
                                    size="small"
                                    icon="trash"
                                    color="red"
                                    onClick={() => onClickDelete(product["id"])}
                                />
                            </Auth>
                        </Card.Description>
                    </Card.Content>
                </Card>
            </Grid.Column>
        );
    }
}

export default ProductCard;
