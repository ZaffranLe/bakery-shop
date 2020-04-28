import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu, Accordion, Icon } from "semantic-ui-react";

class SideMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: "",
        };
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    render() {
        const { activeItem } = this.state;
        return (
            <Accordion as={Menu} inverted fixed="left" borderless vertical style={{ overflowY: "auto" }}>
                <Link to="/">
                    <Menu.Item active={activeItem === "/"}>
                        <Icon name="home" />
                        <big>Home</big>
                    </Menu.Item>
                </Link>
            </Accordion>
        );
    }
}

export default SideMenu;
