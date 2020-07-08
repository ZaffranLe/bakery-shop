import actionTypes from "../../_constants/actionTypes";
import _var from "../../../utils/_var";
import { history } from "../../../routes/history";
import { toast } from "react-toastify";
import axios from "axios";

export const ExportReceiptActions = {
    createExportReceipt,
    updateExportReceipt,
    getUserExportReceipts,
    getAllExportReceipt,
    getDetailExportReceipt,
};

function createExportReceipt(info) {
    function _callApi(info) {
        return axios({
            url: `${_var.domain_server}/api/export-receipt`,
            method: "post",
            data: info,
        });
    }

    return async (dispatch) => {
        try {
            dispatch(_beginAction());
            await _callApi(info);
            toast.success("Cảm ơn bạn đã mua hàng. Vui lòng đợi cửa hàng chúng tôi xác nhận đơn hàng.");
            dispatch(_succeed());
            history.push(`/user-export-receipt/${info["idUser"]}`);
        } catch (e) {
            console.error(e);
            toast.error("Mua hàng thất bại, vui lòng thử lại sau.");
            dispatch(_failed());
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.EXPORT_RECEIPT_CREATE_RECEIPT,
        };
    }

    function _succeed() {
        return {
            type: actionTypes.EXPORT_RECEIPT_CREATE_RECEIPT_SUCCEED,
        };
    }

    function _failed() {
        return {
            type: actionTypes.EXPORT_RECEIPT_CREATE_RECEIPT_FAILED,
        };
    }
}

function updateExportReceipt(id, status) {
    function _callApi(id, status) {
        return axios({
            url: `${_var.domain_server}/api/export-receipt/${id}`,
            method: "patch",
            data: {
                status,
            },
            headers: {
                token: window.localStorage.getItem("token"),
            },
        });
    }

    return async (dispatch) => {
        try {
            dispatch(_beginAction());
            await _callApi(id, status);
            toast.success("Cập nhật đơn hàng thành công.");
            dispatch(_succeed());
        } catch (e) {
            console.error(e);
            toast.error("Cập nhật đơn hàng thất bại.");
            dispatch(_failed());
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.EXPORT_RECEIPT_UPDATE_RECEIPT,
        };
    }

    function _succeed() {
        return {
            type: actionTypes.EXPORT_RECEIPT_UPDATE_RECEIPT_SUCCEED,
        };
    }

    function _failed() {
        return {
            type: actionTypes.EXPORT_RECEIPT_UPDATE_RECEIPT_FAILED,
        };
    }
}

function getUserExportReceipts() {
    function _callApi() {
        return axios({
            url: `${_var.domain_server}/api/user-export-receipt`,
            method: "get",
            headers: {
                token: window.localStorage.getItem("token"),
            },
        });
    }

    return async (dispatch) => {
        try {
            dispatch(_beginAction());
            const resp = await _callApi();
            dispatch(_succeed(resp.data));
        } catch (e) {
            console.error(e);
            toast.error("Lấy danh sách đơn hàng thất bại.");
            dispatch(_failed());
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.EXPORT_RECEIPT_GET_RECEIPTS,
        };
    }

    function _succeed(data) {
        return {
            type: actionTypes.EXPORT_RECEIPT_GET_RECEIPTS_SUCCEED,
            data,
        };
    }

    function _failed() {
        return {
            type: actionTypes.EXPORT_RECEIPT_GET_RECEIPTS_FAILED,
        };
    }
}

function getAllExportReceipt() {
    function _callApi() {
        return axios({
            url: `${_var.domain_server}/api/export-receipt`,
            method: "get",
            headers: {
                token: window.localStorage.getItem("token"),
            },
        });
    }

    return async (dispatch) => {
        try {
            dispatch(_beginAction());
            const resp = await _callApi();
            dispatch(_succeed(resp.data));
        } catch (e) {
            console.error(e);
            toast.error("Lấy danh sách đơn hàng thất bại.");
            dispatch(_failed());
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.EXPORT_RECEIPT_GET_RECEIPTS,
        };
    }

    function _succeed(data) {
        return {
            type: actionTypes.EXPORT_RECEIPT_GET_RECEIPTS_SUCCEED,
            data,
        };
    }

    function _failed() {
        return {
            type: actionTypes.EXPORT_RECEIPT_GET_RECEIPTS_FAILED,
        };
    }
}

function getDetailExportReceipt(id) {
    function _callApi(id) {
        return axios({
            url: `${_var.domain_server}/api/export-receipt/detail/${id}`,
            method: "get",
            headers: {
                token: window.localStorage.getItem("token"),
            },
        });
    }

    return async (dispatch) => {
        try {
            dispatch(_beginAction());
            const resp = await _callApi(id);
            dispatch(_succeed(resp.data));
        } catch (e) {
            console.error(e);
            toast.error("Lấy chi tiết đơn hàng thất bại.");
            dispatch(_failed());
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.EXPORT_RECEIPT_GET_DETAIL_RECEIPT,
        };
    }

    function _succeed(data) {
        return {
            type: actionTypes.EXPORT_RECEIPT_GET_DETAIL_RECEIPT_SUCCEED,
            data,
        };
    }

    function _failed() {
        return {
            type: actionTypes.EXPORT_RECEIPT_GET_DETAIL_RECEIPT_FAILED,
        };
    }
}
