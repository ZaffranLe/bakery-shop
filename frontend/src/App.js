import React from "react";
import { Grid, Segment } from "semantic-ui-react";
import SideMenu from "./components/layout/SideMenu";
import Routes from "./routes/routes";
import { connect } from "react-redux";

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // const token = window.localStorage.getItem("token");
        // if (token && !this.props.user) {

        // }
    }

    render() {
        return (
            <div className="App">
                <Routes />
            </div>
        );
    }
}

const mapStateToProps = ({ UserReducer }) => UserReducer;

export default connect(mapStateToProps, null)(App);
