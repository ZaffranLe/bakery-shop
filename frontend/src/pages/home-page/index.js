import React from "react";
import { Grid, Icon, Segment, Header, Menu, Button, Dropdown } from "semantic-ui-react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import _var from "../../utils/_var";

class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <Carousel>
                            <div>
                                <img src={`${_var.domain_server}/public/img/banner1.jpg`} />
                            </div>
                            <div>
                                <img src={`${_var.domain_server}/public/img/banner2.jpg`} />
                            </div>
                            <div>
                                <img src={`${_var.domain_server}/public/img/banner3.jpg`} />
                            </div>
                        </Carousel>
                    </Grid.Column>
                </Grid.Row>
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
