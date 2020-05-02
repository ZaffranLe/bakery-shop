import actionTypes from "../../_constants/actionTypes";

const defaultState = {
    pageLoading: false,
    products: [],
    types: [],
    units: [],
    ingredients: [],
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.PRODUCT_GET_TYPE:
        case actionTypes.UNIT_GET_UNITS:
        case actionTypes.INGREDIENT_GET_INGREDIENTS:
            return {
                ...state,
                pageLoading: true,
            };
        case actionTypes.PRODUCT_GET_TYPES_SUCCEED:
            return {
                ...state,
                types: action.data,
                pageLoading: false,
            };
        case actionTypes.PRODUCT_GET_TYPES_FAILED:
        case actionTypes.UNIT_GET_UNITS_FAILED:
        case actionTypes.INGREDIENT_GET_INGREDIENTS_FAILED:
            return {
                ...state,
                pageLoading: false,
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
        default:
            return state;
    }
};
