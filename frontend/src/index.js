import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import configureStore from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "./App.css";
import "semantic-ui-css/semantic.min.css";

ReactDOM.render(
    <CookiesProvider>
        <BrowserRouter>
            <Provider store={configureStore()}>
                <App />
            </Provider>
        </BrowserRouter>
        <ToastContainer />
    </CookiesProvider>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
