import React from "react";
import { connect } from "react-redux";
import _var from "../../utils/_var";

class Auth extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { user, permission } = this.props;
        return (
            <>
                {user &&
                    (user.permissionName == permission || permission == _var.permission.none) &&
                    this.props.children}
            </>
        );
    }
}

const mapStateToProps = ({ UserReducer }) => UserReducer;

export default connect(mapStateToProps, null)(Auth);
