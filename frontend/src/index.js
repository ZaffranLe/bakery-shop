import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/_reducers/store";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { PersistGate } from "redux-persist/lib/integration/react";
import { Loader, Dimmer } from "semantic-ui-react";

function LoadingView() {
    return (
        <Dimmer active inverted>
            <Loader>Loading...</Loader>
        </Dimmer>
    );
}

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <PersistGate loading={<LoadingView />} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
        <ToastContainer />
    </BrowserRouter>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
