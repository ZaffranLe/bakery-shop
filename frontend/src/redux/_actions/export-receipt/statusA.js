import actionTypes from "../../_constants/actionTypes";
import axios from "axios";
import _var from "../../../utils/_var";
import { toast } from "react-toastify";

export const ExportReceiptStatusActions = {
    getStatusList,
    createStatus,
    updateStatus,
    deleteStatus
};

function getStatusList() {
    function _callApi() {
        return axios({
            url: `${_var.domain_server}/api/export-receipt/status`,
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
            toast.error("Có lỗi xảy ra khi lấy danh sách trạng thái đơn hàng!");
            dispatch(_failed());
            console.error(e);
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.EXPORT_RECEIPT_GET_STATUS_LIST,
        };
    }

    function _succeed(data) {
        return {
            type: actionTypes.EXPORT_RECEIPT_GET_STATUS_LIST_SUCCEED,
            data,
        };
    }

    function _failed() {
        return {
            type: actionTypes.EXPORT_RECEIPT_GET_STATUS_LIST_FAILED,
        };
    }
}

function updateStatus(id, info) {
    function _callApi(id, info) {
        return axios({
            url: `${_var.domain_server}/api/export-receipt/status/${id}`,
            method: "patch",
            headers: {
                token: window.localStorage.getItem("token"),
            },
            data: info,
        });
    }

    return async (dispatch) => {
        try {
            dispatch(_beginAction());
            await _callApi(id, info);
            dispatch(_succeed());
            toast.success("Sửa trạng thái đơn hàng thành công!");
        } catch (e) {
            toast.error("Sửa trạng thái đơn hàng thất bại!");
            dispatch(_failed());
            console.error(e);
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.EXPORT_RECEIPT_UPDATE_STATUS,
        };
    }

    function _succeed() {
        return {
            type: actionTypes.EXPORT_RECEIPT_UPDATE_STATUS_SUCCEED,
        };
    }

    function _failed() {
        return {
            type: actionTypes.EXPORT_RECEIPT_UPDATE_STATUS_FAILED,
        };
    }
}


function deleteStatus(id) {
    function _callApi(id) {
        return axios({
            url: `${_var.domain_server}/api/export-receipt/status/${id}`,
            method: "delete",
            headers: {
                token: window.localStorage.getItem("token"),
            },
        });
    }

    return async (dispatch) => {
        try {
            dispatch(_beginAction());
            await _callApi(id);
            dispatch(_succeed());
            toast.success("Xoá trạng thái đơn hàng thành công!");
        } catch (e) {
            toast.error("Xoá trạng thái đơn hàng thất bại!");
            dispatch(_failed());
            console.error(e);
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.EXPORT_RECEIPT_DELETE_STATUS,
        };
    }

    function _succeed() {
        return {
            type: actionTypes.EXPORT_RECEIPT_DELETE_STATUS_SUCCEED,
        };
    }

    function _failed() {
        return {
            type: actionTypes.EXPORT_RECEIPT_DELETE_STATUS_FAILED,
        };
    }
}


function createStatus(info) {
    function _callApi(info) {
        return axios({
            url: `${_var.domain_server}/api/export-receipt/status`,
            method: "post",
            headers: {
                token: window.localStorage.getItem("token"),
            },
            data: info,
        });
    }

    return async (dispatch) => {
        try {
            dispatch(_beginAction());
            await _callApi(info);
            dispatch(_succeed());
            toast.success("Thêm trạng thái đơn hàng thành công!");
        } catch (e) {
            toast.error("Thêm trạng thái đơn hàng thất bại!");
            dispatch(_failed());
            console.error(e);
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.EXPORT_RECEIPT_CREATE_STATUS,
        };
    }

    function _succeed() {
        return {
            type: actionTypes.EXPORT_RECEIPT_CREATE_STATUS_SUCCEED,
        };
    }

    function _failed() {
        return {
            type: actionTypes.EXPORT_RECEIPT_CREATE_STATUS_FAILED,
        };
    }
}