import actionTypes from "../../_constants/actionTypes";

const defaultState = {
    statusList: [],
    pageLoading: true,
    isCreatedSucceed: false,
    reload: false,
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.EXPORT_RECEIPT_GET_STATUS_LIST:
        case actionTypes.EXPORT_RECEIPT_CREATE_STATUS:
        case actionTypes.EXPORT_RECEIPT_UPDATE_STATUS:
        case actionTypes.EXPORT_RECEIPT_DELETE_STATUS:
            return {
                ...state,
                pageLoading: true,
            };
        case actionTypes.EXPORT_RECEIPT_GET_STATUS_LIST_SUCCEED:
            return {
                ...state,
                statusList: action.data,
                pageLoading: false,
                reload: false,
                isCreatedSucceed: false,
            };
        case actionTypes.EXPORT_RECEIPT_GET_STATUS_LIST_FAILED:
            return {
                ...state,
                pageLoading: false,
                reload: false,
                isCreatedSucceed: false,
            };
        case actionTypes.EXPORT_RECEIPT_CREATE_STATUS_FAILED:
        case actionTypes.EXPORT_RECEIPT_UPDATE_STATUS_FAILED:
        case actionTypes.EXPORT_RECEIPT_DELETE_STATUS_FAILED:
            return {
                ...state,
                pageLoading: false,
            };
        case actionTypes.EXPORT_RECEIPT_CREATE_STATUS_SUCCEED:
            return {
                ...state,
                pageLoading: false,
                reload: true,
                isCreatedSucceed: true,
            };
        case actionTypes.EXPORT_RECEIPT_UPDATE_STATUS_SUCCEED:
        case actionTypes.EXPORT_RECEIPT_DELETE_STATUS_SUCCEED:
            return {
                ...state,
                pageLoading: false,
                reload: true,
            };
        default:
            return state;
    }
};
