import actionTypes from "../../_constants/actionTypes";

const defaultState = {
    user: "",
    pageLoading: false,
    isCheckingUsername: false,
    isUsernameValid: true,
    isUpdatedSucceed: false,
    isCreatedSucceed: false,
    users: [],
    reload: false,
    permissions: [],
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN:
        case actionTypes.USER_LOGOUT:
        case actionTypes.USER_UPDATE_USER:
        case actionTypes.USER_SIGNUP:
        case actionTypes.USER_GET_USERS:
        case actionTypes.USER_UPDATE_USER:
        case actionTypes.USER_DELETE_USER:
            return {
                ...state,
                pageLoading: true,
            };
        case actionTypes.PERMISSION_GET_PERMISSIONS_FAILED:
            return {
                ...state,
                pageLoading: false,
            };
        case actionTypes.USER_LOGIN_SUCCEED:
            return {
                ...state,
                pageLoading: false,
                user: action.data,
                isUpdatedSucceed: false,
                isCreatedSucceed: false,
            };
        case actionTypes.USER_LOGIN_FAILED:
        case actionTypes.USER_LOGOUT_FAILED:
        case actionTypes.USER_UPDATE_USER_FAILED:
        case actionTypes.USER_SIGNUP_FAILED:
            return {
                ...state,
                pageLoading: false,
                isCreatedSucceed: false,
            };
        case actionTypes.USER_SIGNUP_SUCCEED:
            return {
                ...state,
                pageLoading: false,
                isCreatedSucceed: true,
                reload: true,
            };
        case actionTypes.USER_UPDATE_USER_SUCCEED:
            return {
                ...state,
                pageLoading: false,
                isUpdatedSucceed: true,
            };
        case actionTypes.USER_LOGOUT_SUCCEED:
            return {
                ...state,
                pageLoading: false,
                user: "",
            };
        case actionTypes.USER_CHECK_USERNAME:
            return {
                ...state,
                isCheckingUsername: true,
                isUsernameValid: false,
            };
        case actionTypes.USER_CHECK_USERNAME_SUCCEED:
            return {
                ...state,
                isCheckingUsername: false,
                isUsernameValid: true,
            };
        case actionTypes.USER_CHECK_USERNAME_FAILED:
            return {
                ...state,
                isCheckingUsername: false,
                isUsernameValid: false,
            };
        case actionTypes.USER_GET_USERS_SUCCEED:
            return {
                ...state,
                users: action.data,
                pageLoading: false,
                reload: false,
                isCreatedSucceed: false,
            };
        case actionTypes.USER_GET_USERS_FAILED:
            return {
                ...state,
                pageLoading: false,
                reload: false,
                isCreatedSucceed: false,
            };
        case actionTypes.PERMISSION_GET_PERMISSIONS_SUCCEED:
            return {
                ...state,
                permissions: action.data,
                pageLoading: false,
            };
        case actionTypes.USER_UPDATE_USER_FAILED:
        case actionTypes.USER_DELETE_USER_FAILED:
            return {
                ...state,
                pageLoading: false,
            };
        case actionTypes.USER_UPDATE_USER_SUCCEED:
        case actionTypes.USER_DELETE_USER_SUCCEED:
            return {
                ...state,
                pageLoading: false,
                reload: true,
            };
        default:
            return state;
    }
};
