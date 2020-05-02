import React from "react";
import { Router } from "react-router-dom";
import { Route } from "react-router";
import { history } from "./history";
import HomePage from "../pages/home-page/index";
import AdminPanel from "../pages/admin-panel/admin-panel";
import Permission from "../pages/permission/permission";
import ExportReceiptStatus from "../pages/export-receipt/status-management";
import ProductType from "../pages/product/type-management";
import Product from "../pages/product/product";
import Unit from "../pages/unit/unit";
import Provider from "../pages/provider/provider";
import User from "../pages/user/user";
import Ingredient from "../pages/ingredient/ingredient";
import _var from "../utils/_var";
import { Segment, Message, Grid } from "semantic-ui-react";

function FailAccess() {
    return (
        <Grid.Row>
            <Grid.Column width={16}>
                <Segment>
                    <Message negative>
                        <Message.Header>
                            Trang bạn truy cập không tồn tại hoặc bạn không có quyền hạn truy cập chúng.
                        </Message.Header>
                    </Message>
                </Segment>
            </Grid.Column>
        </Grid.Row>
    );
}

class Routes extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { user } = this.props;
        return (
            <Router history={history}>
                <Route exact path="/" render={() => <HomePage />} />
                <Route
                    exact
                    path="/admin-panel"
                    render={() =>
                        user && user.permissionName == _var.permission.admin ? <AdminPanel /> : <FailAccess />
                    }
                />
                <Route
                    exact
                    path="/admin-panel/permission"
                    render={() =>
                        user && user.permissionName == _var.permission.admin ? <Permission /> : <FailAccess />
                    }
                />
                <Route
                    exact
                    path="/admin-panel/export-receipt/status"
                    render={() =>
                        user && user.permissionName == _var.permission.admin ? <ExportReceiptStatus /> : <FailAccess />
                    }
                />
                <Route
                    exact
                    path="/admin-panel/product/type"
                    render={() =>
                        user && user.permissionName == _var.permission.admin ? <ProductType /> : <FailAccess />
                    }
                />
                <Route
                    exact
                    path="/admin-panel/unit"
                    render={() => (user && user.permissionName == _var.permission.admin ? <Unit /> : <FailAccess />)}
                />
                <Route
                    exact
                    path="/admin-panel/user"
                    render={() => (user && user.permissionName == _var.permission.admin ? <User /> : <FailAccess />)}
                />
                <Route
                    exact
                    path="/admin-panel/provider"
                    render={() =>
                        user && user.permissionName == _var.permission.admin ? <Provider /> : <FailAccess />
                    }
                />
                <Route
                    exact
                    path="/admin-panel/ingredient"
                    render={() =>
                        user && user.permissionName == _var.permission.admin ? <Ingredient /> : <FailAccess />
                    }
                />
                <Route exact path="/product" render={() => <Product />} />
            </Router>
        );
    }
}

export default Routes;
