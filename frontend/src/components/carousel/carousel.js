import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import banner1 from "../../images/banner1.jpg";
import banner2 from "../../images/banner2.jpg";
import banner3 from "../../images/banner3.jpg";
import { Grid } from "semantic-ui-react";
import React from "react";

function FixedCarousel() {
    return (
        <Grid.Row>
            <Grid.Column width={16}>
                <Carousel>
                    <div>
                        <img src={banner1} />
                    </div>
                    <div>
                        <img src={banner2} />
                    </div>
                    <div>
                        <img src={banner3} />
                    </div>
                </Carousel>
            </Grid.Column>
        </Grid.Row>
    );
}

export default FixedCarousel;
