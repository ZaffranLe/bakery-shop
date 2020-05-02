import actionTypes from "../../_constants/actionTypes";

const defaultState = {
    providers: [],
    pageLoading: true,
    isCreatedSucceed: false,
    reload: false,
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.PROVIDER_GET_PROVIDERS:
        case actionTypes.PROVIDER_CREATE_PROVIDER:
        case actionTypes.PROVIDER_UPDATE_PROVIDER:
        case actionTypes.PROVIDER_DELETE_PROVIDER:
            return {
                ...state,
                pageLoading: true,
            };
        case actionTypes.PROVIDER_GET_PROVIDERS_SUCCEED:
            return {
                ...state,
                providers: action.data,
                pageLoading: false,
                reload: false,
                isCreatedSucceed: false,
            };
        case actionTypes.PROVIDER_GET_PROVIDERS_FAILED:
            return {
                ...state,
                pageLoading: false,
                reload: false,
                isCreatedSucceed: false,
            };
        case actionTypes.PROVIDER_CREATE_PROVIDER_FAILED:
        case actionTypes.PROVIDER_UPDATE_PROVIDER_FAILED:
        case actionTypes.PROVIDER_DELETE_PROVIDER_FAILED:
            return {
                ...state,
                pageLoading: false,
            };
        case actionTypes.PROVIDER_CREATE_PROVIDER_SUCCEED:
            return {
                ...state,
                pageLoading: false,
                reload: true,
                isCreatedSucceed: true,
            };
        case actionTypes.PROVIDER_UPDATE_PROVIDER_SUCCEED:
        case actionTypes.PROVIDER_DELETE_PROVIDER_SUCCEED:
            return {
                ...state,
                pageLoading: false,
                reload: true,
            };
        default:
            return state;
    }
};
