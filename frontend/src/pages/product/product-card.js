import React from "react";
import { Card, Grid, Image, Button, Icon } from "semantic-ui-react";
import _var from "../../utils/_var";

class ProductCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { product, user, onClickEdit, onClickDelete } = this.props;
        const images = product["images"].split(";");
        return (
            <Grid.Column width={4}>
                <Card centered href="#">
                    <Image src={`${_var.domain_server}/public/img/${images[0]}`} wrapped ui={false} />
                    <Card.Content>
                        <Card.Header>{product["name"]}</Card.Header>
                        <Card.Meta>{product["description"]}</Card.Meta>
                        <Card.Description>
                            <big>
                                <b>{`${product["unitPrice"]}đ / ${product["unit"]}`}</b>
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
                            />
                            {user && user.permissionName == "ADMIN" && (
                                <>
                                    <Button
                                        size="small"
                                        icon="edit"
                                        color="yellow"
                                        onClick={() => onClickEdit(product)}
                                    />
                                    <Button
                                        size="small"
                                        icon="trash"
                                        color="red"
                                        onClick={() => onClickDelete(product["id"])}
                                    />
                                </>
                            )}
                        </Card.Description>
                    </Card.Content>
                </Card>
            </Grid.Column>
        );
    }
}

export default ProductCard;
