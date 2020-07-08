import actionTypes from "../../_constants/actionTypes";

const defaultState = {
    exportReceipts: [],
    statusList: [],
    exportReceipt: "",
    pageLoading: false,
    reload: false,
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.EXPORT_RECEIPT_GET_STATUS_LIST:
        case actionTypes.EXPORT_RECEIPT_GET_RECEIPTS:
        case actionTypes.EXPORT_RECEIPT_UPDATE_RECEIPT:
            return {
                ...state,
                pageLoading: true,
            };
        case actionTypes.EXPORT_RECEIPT_GET_DETAIL_RECEIPT:
            return {
                ...state,
                pageLoading: true,
                exportReceipt: "",
            };
        case actionTypes.EXPORT_RECEIPT_GET_STATUS_LIST_SUCCEED:
            return {
                ...state,
                statusList: action.data,
                pageLoading: false,
            };
        case actionTypes.EXPORT_RECEIPT_GET_STATUS_LIST_FAILED:
        case actionTypes.EXPORT_RECEIPT_GET_RECEIPTS_FAILED:
        case actionTypes.EXPORT_RECEIPT_GET_DETAIL_RECEIPT_FAILED:
        case actionTypes.EXPORT_RECEIPT_UPDATE_RECEIPT_FAILED:
            return {
                ...state,
                pageLoading: false,
            };
        case actionTypes.EXPORT_RECEIPT_GET_RECEIPTS_SUCCEED:
            return {
                ...state,
                pageLoading: false,
                exportReceipts: action.data,
                reload: false,
            };
        case actionTypes.EXPORT_RECEIPT_UPDATE_RECEIPT_SUCCEED:
            return {
                ...state,
                pageLoading: false,
                reload: true,
            };
        case actionTypes.EXPORT_RECEIPT_GET_DETAIL_RECEIPT_SUCCEED:
            return {
                ...state,
                pageLoading: false,
                exportReceipt: action.data,
            };
        default:
            return state;
    }
};
