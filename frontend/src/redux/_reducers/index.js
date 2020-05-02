import { combineReducers } from "redux";
import ProductReducer from "./product/productR";
import UserReducer from "./user/userR";
import PermissionReducer from "./user/permissionR";
import ExportReceiptStatusReducer from "./export-receipt/statusR";
import ProductTypeReducer from "./product/typeR";
import UnitReducer from "./unit/unitR";
import ProviderReducer from "./provider/providerR";
import IngredientReducer from "./ingredient/ingredientR";

const appReducers = combineReducers({
    ProductReducer,
    UserReducer,
    PermissionReducer,
    ExportReceiptStatusReducer,
    ProductTypeReducer,
    UnitReducer,
    ProviderReducer,
    IngredientReducer,
});

export default appReducers;
