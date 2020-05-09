import { combineReducers } from "redux";
import ProductReducer from "./product/productR";
import UserReducer from "./user/userR";
import PermissionReducer from "./user/permissionR";
import ExportReceiptStatusReducer from "./export-receipt/statusR";
import ExportReceiptReducer from "./export-receipt/exportReceiptR";
import ProductTypeReducer from "./product/typeR";
import UnitReducer from "./unit/unitR";
import ProviderReducer from "./provider/providerR";
import IngredientReducer from "./ingredient/ingredientR";
import CartReducer from "./shopping-cart/cartR";
import AdminStatisticReducer from "./admin/statisticR";

const appReducers = combineReducers({
    ProductReducer,
    UserReducer,
    PermissionReducer,
    ExportReceiptStatusReducer,
    ExportReceiptReducer,
    ProductTypeReducer,
    UnitReducer,
    ProviderReducer,
    IngredientReducer,
    CartReducer,
    AdminStatisticReducer
});

export default appReducers;
