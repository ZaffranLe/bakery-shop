import actionTypes from "../../_constants/actionTypes";

const defaultState = {
    products: [],
    users: [],
    exportReceipts: [],
    ingredients: [],
    pageLoading: false,
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.USER_GET_USERS:
        case actionTypes.PRODUCT_GET_PRODUCTS:
            return {
                ...state,
                pageLoading: true,
            };
        case actionTypes.USER_GET_USERS_SUCCEED:
            return {
                ...state,
                users: action.data,
                pageLoading: false,
            };
        case actionTypes.PRODUCT_GET_PRODUCTS_SUCCEED:
            return {
                ...state,
                pageLoading: false,
                products: action.data,
            };
        case actionTypes.EXPORT_RECEIPT_GET_RECEIPTS_SUCCEED:
            return {
                ...state,
                pageLoading: false,
                exportReceipts: action.data,
            };
        case actionTypes.INGREDIENT_GET_INGREDIENTS_SUCCEED:
            return {
                ...state,
                ingredients: action.data,
                pageLoading: false,
            };
        case actionTypes.USER_GET_USERS_FAILED:
        case actionTypes.PRODUCT_GET_PRODUCTS_FAILED:
        case actionTypes.EXPORT_RECEIPT_GET_RECEIPTS_FAILED:
        case actionTypes.INGREDIENT_GET_INGREDIENTS_FAILED:
            return {
                ...state,
                pageLoading: false,
            };
        default:
            return state;
    }
};
