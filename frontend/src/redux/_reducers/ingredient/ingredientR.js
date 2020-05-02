import actionTypes from "../../_constants/actionTypes";

const defaultState = {
    ingredients: [],
    pageLoading: true,
    isCreatedSucceed: false,
    reload: false,
    units: [],
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.INGREDIENT_GET_INGREDIENTS:
        case actionTypes.INGREDIENT_CREATE_INGREDIENT:
        case actionTypes.INGREDIENT_UPDATE_INGREDIENT:
        case actionTypes.INGREDIENT_DELETE_INGREDIENT:
        case actionTypes.UNIT_GET_UNITS:
            return {
                ...state,
                pageLoading: true,
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
                reload: false,
                isCreatedSucceed: false,
            };
        case actionTypes.INGREDIENT_GET_INGREDIENTS_FAILED:
            return {
                ...state,
                pageLoading: false,
                reload: false,
                isCreatedSucceed: false,
            };
        case actionTypes.INGREDIENT_CREATE_INGREDIENT_FAILED:
        case actionTypes.INGREDIENT_UPDATE_INGREDIENT_FAILED:
        case actionTypes.INGREDIENT_DELETE_INGREDIENT_FAILED:
        case actionTypes.UNIT_GET_UNITS_FAILED:
            return {
                ...state,
                pageLoading: false,
            };
        case actionTypes.INGREDIENT_CREATE_INGREDIENT_SUCCEED:
            return {
                ...state,
                pageLoading: false,
                reload: true,
                isCreatedSucceed: true,
            };
        case actionTypes.INGREDIENT_UPDATE_INGREDIENT_SUCCEED:
        case actionTypes.INGREDIENT_DELETE_INGREDIENT_SUCCEED:
            return {
                ...state,
                pageLoading: false,
                reload: true,
            };
        default:
            return state;
    }
};
