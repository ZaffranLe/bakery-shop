import React from "react";
import { Router } from "react-router-dom";
import { Route } from "react-router";
import { history } from "./history";
import HomePage from "../components/layout/index";

class Routes extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Router history={history}>
                <Route exact path="/" render={() => <HomePage />} />
            </Router>
        );
    }
}

export default Routes;
