import actionTypes from "../../_constants/actionTypes";

const defaultState = {
    permissions: [],
    pageLoading: true,
    isCreatedSucceed: false,
    reload: false,
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.PERMISSION_GET_PERMISSIONS:
        case actionTypes.PERMISSION_CREATE_PERMISSION:
        case actionTypes.PERMISSION_UPDATE_PERMISSION:
        case actionTypes.PERMISSION_DELETE_PERMISSION:
            return {
                ...state,
                pageLoading: true,
            };
        case actionTypes.PERMISSION_GET_PERMISSIONS_SUCCEED:
            return {
                ...state,
                permissions: action.data,
                pageLoading: false,
                reload: false,
                isCreatedSucceed: false,
            };
        case actionTypes.PERMISSION_GET_PERMISSIONS_FAILED:
            return {
                ...state,
                pageLoading: false,
                reload: false,
                isCreatedSucceed: false,
            };
        case actionTypes.PERMISSION_CREATE_PERMISSION_FAILED:
        case actionTypes.PERMISSION_UPDATE_PERMISSION_FAILED:
        case actionTypes.PERMISSION_DELETE_PERMISSION_FAILED:
            return {
                ...state,
                pageLoading: false,
            };
        case actionTypes.PERMISSION_CREATE_PERMISSION_SUCCEED:
            return {
                ...state,
                pageLoading: false,
                reload: true,
                isCreatedSucceed: true,
            };
        case actionTypes.PERMISSION_UPDATE_PERMISSION_SUCCEED:
        case actionTypes.PERMISSION_DELETE_PERMISSION_SUCCEED:
            return {
                ...state,
                pageLoading: false,
                reload: true,
            };
        default:
            return state;
    }
};
