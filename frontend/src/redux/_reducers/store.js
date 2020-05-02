import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import appReducers from "./index";
import { composeWithDevTools } from "redux-devtools-extension";

export const store = createStore(appReducers, composeWithDevTools(applyMiddleware(thunk)));
