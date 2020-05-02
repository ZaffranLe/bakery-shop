import actionTypes from "../../_constants/actionTypes";

const defaultState = {
    types: [],
    pageLoading: true,
    isCreatedSucceed: false,
    reload: false,
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.PRODUCT_GET_TYPES:
        case actionTypes.PRODUCT_CREATE_TYPE:
        case actionTypes.PRODUCT_UPDATE_TYPE:
        case actionTypes.PRODUCT_DELETE_TYPE:
            return {
                ...state,
                pageLoading: true,
            };
        case actionTypes.PRODUCT_GET_TYPES_SUCCEED:
            return {
                ...state,
                types: action.data,
                pageLoading: false,
                reload: false,
                isCreatedSucceed: false,
            };
        case actionTypes.PRODUCT_GET_TYPES_FAILED:
            return {
                ...state,
                pageLoading: false,
                reload: false,
                isCreatedSucceed: false,
            };
        case actionTypes.PRODUCT_CREATE_TYPE_FAILED:
        case actionTypes.PRODUCT_UPDATE_TYPE_FAILED:
        case actionTypes.PRODUCT_DELETE_TYPE_FAILED:
            return {
                ...state,
                pageLoading: false,
            };
        case actionTypes.PRODUCT_CREATE_TYPE_SUCCEED:
            return {
                ...state,
                pageLoading: false,
                reload: true,
                isCreatedSucceed: true,
            };
        case actionTypes.PRODUCT_UPDATE_TYPE_SUCCEED:
        case actionTypes.PRODUCT_DELETE_TYPE_SUCCEED:
            return {
                ...state,
                pageLoading: false,
                reload: true,
            };
        default:
            return state;
    }
};
