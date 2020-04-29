import React from "react";
import { Grid, Icon, Segment, Header } from "semantic-ui-react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <Segment>
                            <Carousel>
                                <div>
                                    <img src="http://127.0.0.1:3001/public/img/banner1.jpg" />
                                </div>
                                <div>
                                    <img src="http://127.0.0.1:3001/public/img/banner2.jpg" />
                                </div>
                                <div>
                                    <img src="http://127.0.0.1:3001/public/img/banner3.jpg" />
                                </div>
                            </Carousel>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered divided>
                    <Grid.Column width={3}>
                        <Icon color="orange" size="huge" name="gem" />
                        <big>High quality</big>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <Icon color="orange" size="huge" name="box" />
                        <big>Free delivery</big>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <Icon color="orange" size="huge" name="clock outline" />
                        <big>Fast & Easy</big>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column width={4} style={{textAlign: "center"}}>
                        <Header as="h1">
                            Featured Products <Icon name="star" color="brown" />
                        </Header>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

export default HomePage;
