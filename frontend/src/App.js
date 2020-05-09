import React from "react";
import { Grid, Segment, Menu, Button, Dropdown, Icon } from "semantic-ui-react";
import Routes from "./routes/routes";
import { connect } from "react-redux";
import { UserActions } from "./redux/_actions/user/userA";
import LoginModal from "./pages/home-page/modal/login-modal";
import InfoModal from "./pages/home-page/modal/info-modal";
import _var from "./utils/_var";
import { Link, withRouter } from "react-router-dom";

function App() {
    return <Routes />;
}

export default App;
