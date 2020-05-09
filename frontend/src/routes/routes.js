import React from "react";
import { Router } from "react-router-dom";
import { Route, Switch } from "react-router";
import { history } from "./history";
import HomePage from "../pages/home-page/index";
import AdminPanel from "../pages/admin-panel/admin-panel";
import Permission from "../pages/permission/permission";
import ExportReceiptStatus from "../pages/export-receipt/status-management";
import ExportReceipt from "../pages/export-receipt/export-receipt";
import ProductType from "../pages/product/type-management";
import Product from "../pages/product/product";
import ProductInfo from "../pages/product/product-info";
import Unit from "../pages/unit/unit";
import Provider from "../pages/provider/provider";
import User from "../pages/user/user";
import Ingredient from "../pages/ingredient/ingredient";
import ShoppingCart from "../pages/shopping-cart/shopping-cart";
import _var from "../utils/_var";
import FailAccess from "../components/fail-access/fail-access";

class Routes extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { user } = this.props;
        return (
            <Router history={history}>
                <Switch>
                    <Route exact path="/admin-panel/permission" render={() => <Permission />} />
                    <Route exact path="/admin-panel/export-receipt/status" render={() => <ExportReceiptStatus />} />
                    <Route exact path="/admin-panel/export-receipt" render={() => <ExportReceipt />} />
                    <Route exact path="/admin-panel/product/type" render={() => <ProductType />} />
                    <Route exact path="/admin-panel/unit" render={() => <Unit />} />
                    <Route exact path="/admin-panel/user" render={() => <User />} />
                    <Route exact path="/admin-panel/provider" render={() => <Provider />} />
                    <Route exact path="/admin-panel/ingredient" render={() => <Ingredient />} />
                    <Route exact path="/product/:id" render={(props) => <ProductInfo id={props.match.params.id} />} />
                    <Route exact path="/product" render={() => <Product user={user} />} />
                    <Route exact path="/admin-panel" render={() => <AdminPanel />} />
                    <Route exact path="/shopping-cart" render={() => <ShoppingCart />} />
                    <Route exact path="/" render={() => <HomePage />} />
                    <Route path="*" render={() => <FailAccess />} />
                </Switch>
            </Router>
        );
    }
}

export default Routes;
