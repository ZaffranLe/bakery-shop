import actionTypes from "../../_constants/actionTypes";

const defaultState = {
    pageLoading: true,
    products: [],
    product: "",
    types: [],
    units: [],
    ingredients: [],
    isCreatedSucceed: false,
    reload: false,
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.PRODUCT_GET_TYPE:
        case actionTypes.INGREDIENT_GET_INGREDIENTS:
        case actionTypes.UNIT_GET_UNITS:
        case actionTypes.PRODUCT_GET_PRODUCTS:
        case actionTypes.PRODUCT_GET_PRODUCT:
        case actionTypes.PRODUCT_CREATE_PRODUCT:
        case actionTypes.PRODUCT_UPDATE_PRODUCT:
        case actionTypes.PRODUCT_DELETE_PRODUCT:
        case actionTypes.PRODUCT_CREATE_COMMENT:
            return {
                ...state,
                pageLoading: true,
            };
        case actionTypes.PRODUCT_CREATE_COMMENT_SUCCEED:
            return {
                ...state,
                pageLoading: false,
                reload: true,
            };
        case actionTypes.PRODUCT_GET_TYPES_SUCCEED:
            return {
                ...state,
                types: action.data,
                pageLoading: false,
            };
        case actionTypes.PRODUCT_CREATE_PRODUCT_SUCCEED:
            return {
                ...state,
                pageLoading: false,
                reload: true,
                isCreatedSucceed: true,
            };
        case actionTypes.PRODUCT_GET_TYPES_FAILED:
        case actionTypes.UNIT_GET_UNITS_FAILED:
        case actionTypes.INGREDIENT_GET_INGREDIENTS_FAILED:
        case actionTypes.PRODUCT_CREATE_PRODUCT_FAILED:
        case actionTypes.PRODUCT_UPDATE_PRODUCT_FAILED:
        case actionTypes.PRODUCT_DELETE_PRODUCT_FAILED:
        case actionTypes.PRODUCT_CREATE_COMMENT_FAILED:
            return {
                ...state,
                pageLoading: false,
            };
        case actionTypes.PRODUCT_GET_PRODUCT_FAILED:
            return {
                ...state,
                pageLoading: false,
                reload: false,
            };
        case actionTypes.PRODUCT_GET_PRODUCTS_FAILED:
            return {
                ...state,
                pageLoading: false,
                isCreatedSucceed: false,
                reload: false,
            };
        case actionTypes.PRODUCT_GET_PRODUCTS_SUCCEED:
            return {
                ...state,
                pageLoading: false,
                isCreatedSucceed: false,
                products: action.data,
                reload: false,
            };
        case actionTypes.UNIT_GET_UNITS_SUCCEED:
            return {
                ...state,
                units: action.data,
                pageLoading: false,
            };
        case actionTypes.INGREDIENT_GET_INGREDIENTS_SUCCEED:
            return {
                ...state,
                ingredients: action.data,
                pageLoading: false,
            };
        case actionTypes.PRODUCT_UPDATE_PRODUCT_SUCCEED:
        case actionTypes.PRODUCT_DELETE_PRODUCT_SUCCEED:
            return {
                ...state,
                pageLoading: false,
                reload: true,
            };
        case actionTypes.PRODUCT_GET_PRODUCT_SUCCEED:
            return {
                ...state,
                pageLoading: false,
                product: action.data,
                reload: false,
            };
        default:
            return state;
    }
};
