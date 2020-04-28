import React from "react";
import { Grid } from "semantic-ui-react";
import SideMenu from "./components/layout/SideMenu";
import Routes from "./routes/routes";

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Grid padded>
                    <Grid.Column width={2}>
                        <SideMenu />
                    </Grid.Column>
                    <Grid.Column width={14} floated="right" id="content">
                        <Routes />
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default App;
