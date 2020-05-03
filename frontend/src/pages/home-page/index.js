import React from "react";
import { Grid, Icon, Segment, Header, Menu, Button, Dropdown } from "semantic-ui-react";
import _var from "../../utils/_var";
import Carousel from "../../components/carousel/carousel";

class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Carousel />
                <Grid.Row centered divided>
                    <Grid.Column width={3}>
                        <Icon color="orange" size="huge" name="gem" />
                        <big>Chất lượng cao</big>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <Icon color="orange" size="huge" name="box" />
                        <big>Miễn phí vận chuyển</big>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <Icon color="orange" size="huge" name="clock outline" />
                        <big>Dễ dàng & Nhanh chóng</big>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column width={4} style={{ textAlign: "center" }}>
                        <Header as="h1">
                            Sản phẩm nổi bật <Icon name="star" color="brown" />
                        </Header>
                    </Grid.Column>
                </Grid.Row>
            </>
        );
    }
}

export default HomePage;
