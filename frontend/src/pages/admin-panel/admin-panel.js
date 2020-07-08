import React from "react";
import { Grid, Segment, Icon, Card, Image, Loader, Dimmer } from "semantic-ui-react";
import receipt1 from "../../images/receipt1.jpg";
import receipt2 from "../../images/receipt2.jpg";
import provider from "../../images/provider.png";
import product from "../../images/product.jpg";
import ingredient from "../../images/ingredient.png";
import unit from "../../images/unit.png";
import category from "../../images/category.png";
import status from "../../images/status.png";
import user from "../../images/user.png";
import permission from "../../images/permission.png";
import { Link } from "react-router-dom";
import Layout from "../../components/layout/layout";
import _var from "../../utils/_var";
import { connect } from "react-redux";
import { ExportReceiptActions } from "../../redux/_actions/export-receipt/exportReceiptA";
import { ProductActions } from "../../redux/_actions/product/productA";
import { IngredientActions } from "../../redux/_actions/ingredient/ingredientA";
import { UserActions } from "../../redux/_actions/user/userA";

class AdminPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(ExportReceiptActions.getAllExportReceipt());
        this.props.dispatch(ProductActions.getProducts());
        this.props.dispatch(IngredientActions.getIngredients());
        this.props.dispatch(UserActions.getUsers());
    }

    textStyle = {
        fontSize: 28,
    };

    cardStyle = {
        height: 200,
    };

    rowStyle = {
        marginTop: 15,
    };

    render() {
        const { products, ingredients, users, exportReceipts, pageLoading } = this.props;
        return (
            <Layout permission={_var.permission.admin}>
                <Dimmer inverted active={pageLoading}>
                    <Loader>Loading...</Loader>
                </Dimmer>
                <Grid.Row>
                    <Grid.Column width={11}>
                        <Segment color="orange" inverted tertiary>
                            <Grid>
                                <Grid.Row columns="equal">
                                    <Grid.Column>
                                        <Grid.Row style={this.rowStyle}>
                                            <Grid.Column width={16}>
                                                <Card as={Link} to="/admin-panel/export-receipt" fluid>
                                                    <Image src={receipt1} wrapped ui={false} />
                                                    <Card.Content>
                                                        <Card.Header textAlign="center">Hoá đơn bán hàng</Card.Header>
                                                    </Card.Content>
                                                </Card>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row style={this.rowStyle}>
                                            <Grid.Column width={16}>
                                                <Card as={Link} to="/product" fluid>
                                                    <Image src={product} wrapped ui={false} />
                                                    <Card.Content>
                                                        <Card.Header textAlign="center">Sản phẩm</Card.Header>
                                                    </Card.Content>
                                                </Card>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row style={this.rowStyle}>
                                            <Grid.Column width={16}>
                                                <Card as={Link} to="/admin-panel/unit" fluid>
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
                                                <Card as={Link} to="#" fluid>
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
                                                <Card as={Link} to="/admin-panel/ingredient" fluid>
                                                    <Image src={ingredient} wrapped ui={false} />
                                                    <Card.Content>
                                                        <Card.Header textAlign="center">
                                                            Danh sách nguyên liệu
                                                        </Card.Header>
                                                    </Card.Content>
                                                </Card>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row style={this.rowStyle}>
                                            <Grid.Column width={16}>
                                                <Card as={Link} to="/admin-panel/product/type" fluid>
                                                    <Image src={category} wrapped ui={false} />
                                                    <Card.Content>
                                                        <Card.Header textAlign="center">Thể loại sản phẩm</Card.Header>
                                                    </Card.Content>
                                                </Card>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row style={this.rowStyle}>
                                            <Grid.Column width={16}>
                                                <Card as={Link} to="/admin-panel/user" fluid>
                                                    <Image src={user} wrapped ui={false} />
                                                    <Card.Content>
                                                        <Card.Header textAlign="center">
                                                            Danh sách người dùng
                                                        </Card.Header>
                                                    </Card.Content>
                                                </Card>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Grid.Row style={this.rowStyle}>
                                            <Grid.Column width={16}>
                                                <Card as={Link} to="/admin-panel/provider" fluid>
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
                                                <Card as={Link} to="/admin-panel/export-receipt/status" fluid>
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
                                                <Card as={Link} to="/admin-panel/permission" fluid>
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
                                <Icon name="box" /> Tổng số sản phẩm hiện có: {products.length}
                            </p>
                            <p>
                                <Icon name="user" /> Số lượng người dùng đăng ký: {users.length}
                            </p>
                            <p>
                                <Icon name="file" /> Số đơn hàng chờ xác nhận:{" "}
                                {
                                    exportReceipts.filter(
                                        (receipt) => receipt["status"] == _var.export_receipt_status.pending
                                    ).length
                                }
                            </p>
                            <p>
                                <Icon name="file" /> Số đơn hàng chờ thực hiện:{" "}
                                {
                                    exportReceipts.filter(
                                        (receipt) => receipt["status"] == _var.export_receipt_status.confirmed
                                    ).length
                                }
                            </p>
                            <p>
                                <Icon name="spinner" loading /> Số đơn hàng đang thực hiện:{" "}
                                {
                                    exportReceipts.filter(
                                        (receipt) => receipt["status"] == _var.export_receipt_status.in_progress
                                    ).length
                                }
                            </p>
                            <p>
                                <Icon name="clock" /> Số đơn hàng chờ vận chuyển:{" "}
                                {
                                    exportReceipts.filter(
                                        (receipt) =>
                                            receipt["status"] == _var.export_receipt_status.waiting_for_delivery
                                    ).length
                                }
                            </p>
                            <p>
                                <Icon name="truck" /> Số đơn hàng đang vận chuyển:{" "}
                                {
                                    exportReceipts.filter(
                                        (receipt) => receipt["status"] == _var.export_receipt_status.delivering
                                    ).length
                                }
                            </p>
                            <p>
                                <Icon name="box" /> Số lượng nguyên liệu dưới ngưỡng cảnh báo:{" "}
                                {
                                    ingredients.filter(
                                        (ingredient) => ingredient["quantity"] < ingredient["warningThreshold"]
                                    ).length
                                }
                            </p>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Layout>
        );
    }
}

const mapStateToProps = ({ AdminStatisticReducer }) => AdminStatisticReducer;

export default connect(mapStateToProps, null)(AdminPanel);
