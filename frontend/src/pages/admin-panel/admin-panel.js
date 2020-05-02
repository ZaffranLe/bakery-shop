import React from "react";
import { Grid, Segment, Icon, Button, Card, Image } from "semantic-ui-react";
import receipt1 from "../../images/receipt1.jpg";
import receipt2 from "../../images/receipt2.jpg";
import provider from "../../images/provider.png"
import product from "../../images/product.jpg"
import ingredient from "../../images/ingredient.png"
import storage from "../../images/storage.png"
import unit from "../../images/unit.png"
import category from "../../images/category.png"
import status from "../../images/status.png"
import user from "../../images/user.png"
import permission from "../../images/permission.png"

class AdminPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    textStyle = {
        fontSize: 28,
    };

    cardStyle = {
        height: 200,
    };

    rowStyle = {
        marginTop: 15
    }

    render() {
        return (
            <Grid.Row>
                <Grid.Column width={11}>
                    <Segment color="orange" inverted tertiary>
                        <Grid>
                            <Grid.Row columns="equal">
                                <Grid.Column>
                                    <Grid.Row style={this.rowStyle}>
                                        <Grid.Column width={16}>
                                            <Card href="#" fluid>
                                                <Image src={receipt1} wrapped ui={false} />
                                                <Card.Content>
                                                    <Card.Header textAlign="center">Hoá đơn bán hàng</Card.Header>
                                                </Card.Content>
                                            </Card>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row style={this.rowStyle}>
                                        <Grid.Column width={16}>
                                            <Card href="/product" fluid>
                                                <Image src={product} wrapped ui={false} />
                                                <Card.Content>
                                                    <Card.Header textAlign="center">Sản phẩm</Card.Header>
                                                </Card.Content>
                                            </Card>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row style={this.rowStyle}>
                                        <Grid.Column width={16}>
                                            <Card href="/admin-panel/unit" fluid>
                                                <Image src={unit} wrapped ui={false} />
                                                <Card.Content>
                                                    <Card.Header textAlign="center">Đơn vị tính</Card.Header>
                                                </Card.Content>
                                            </Card>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid.Column>
                                <Grid.Column>
                                    <Grid.Row style={this.rowStyle}>
                                        <Grid.Column width={16}>
                                            <Card href="#" fluid>
                                                <Image src={receipt2} wrapped ui={false} />
                                                <Card.Content>
                                                    <Card.Header textAlign="center">
                                                        Hoá đơn nhập nguyên liệu
                                                    </Card.Header>
                                                </Card.Content>
                                            </Card>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row style={this.rowStyle}>
                                        <Grid.Column width={16}>
                                            <Card href="/admin-panel/ingredient" fluid>
                                                <Image src={ingredient} wrapped ui={false} />
                                                <Card.Content>
                                                    <Card.Header textAlign="center">Danh sách nguyên liệu</Card.Header>
                                                </Card.Content>
                                            </Card>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row style={this.rowStyle}>
                                        <Grid.Column width={16}>
                                            <Card href="/admin-panel/product/type" fluid>
                                                <Image src={category} wrapped ui={false} />
                                                <Card.Content>
                                                    <Card.Header textAlign="center">Thể loại sản phẩm</Card.Header>
                                                </Card.Content>
                                            </Card>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row style={this.rowStyle}>
                                        <Grid.Column width={16}>
                                            <Card href="/admin-panel/user" fluid>
                                                <Image src={user} wrapped ui={false} />
                                                <Card.Content>
                                                    <Card.Header textAlign="center">Danh sách người dùng</Card.Header>
                                                </Card.Content>
                                            </Card>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid.Column>
                                <Grid.Column>
                                    <Grid.Row style={this.rowStyle}>
                                        <Grid.Column width={16}>
                                            <Card href="/admin-panel/provider" fluid>
                                                <Image src={provider} wrapped ui={false} />
                                                <Card.Content>
                                                    <Card.Header textAlign="center">
                                                        Nhà cung cấp nguyên liệu
                                                    </Card.Header>
                                                </Card.Content>
                                            </Card>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row style={this.rowStyle}>
                                        <Grid.Column width={16}>
                                            <Card href="#" fluid>
                                                <Image src={storage} wrapped ui={false} />
                                                <Card.Content>
                                                    <Card.Header textAlign="center">Kho nguyên liệu</Card.Header>
                                                </Card.Content>
                                            </Card>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row style={this.rowStyle}>
                                        <Grid.Column width={16}>
                                            <Card href="/admin-panel/export-receipt/status" fluid>
                                                <Image src={status} wrapped ui={false} />
                                                <Card.Content>
                                                    <Card.Header textAlign="center">
                                                        Danh sách trạng thái đơn hàng
                                                    </Card.Header>
                                                </Card.Content>
                                            </Card>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row style={this.rowStyle}>
                                        <Grid.Column width={16}>
                                            <Card href="/admin-panel/permission" fluid>
                                                <Image src={permission} wrapped ui={false} />
                                                <Card.Content>
                                                    <Card.Header textAlign="center">
                                                        Danh sách quyền hệ thống
                                                    </Card.Header>
                                                </Card.Content>
                                            </Card>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Segment>
                </Grid.Column>
                <Grid.Column width={5}>
                    <Segment color="orange">
                        <p>
                            <Icon name="box" /> Tổng số sản phẩm hiện có: placeholder
                        </p>
                        <p>
                            <Icon name="user" /> Số lượng người dùng đăng ký: placeholder
                        </p>
                        <p>
                            <Icon name="file" /> Số đơn hàng chờ xác nhận: placeholder
                        </p>
                        <p>
                            <Icon name="spinner" loading /> Số đơn hàng đang thực hiện: placeholder
                        </p>
                        <p>
                            <Icon name="clock" /> Số đơn hàng chờ vận chuyển: placeholder
                        </p>
                        <p>
                            <Icon name="truck" /> Số đơn hàng đang vận chuyển: placeholder
                        </p>
                    </Segment>
                </Grid.Column>
            </Grid.Row>
        );
    }
}

export default AdminPanel;
