import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from "redux-thunk";
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import appReducers from "./index";
import { composeWithDevTools } from "redux-devtools-extension";

const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2,
    whitelist: ['CartReducer']
}

const pReducer = persistReducer(persistConfig, appReducers);

export const store = createStore(pReducer, composeWithDevTools(applyMiddleware(thunk)));
export const persistor = persistStore(store);
