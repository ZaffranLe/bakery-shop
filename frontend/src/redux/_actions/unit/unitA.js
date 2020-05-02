import actionTypes from "../../_constants/actionTypes";
import axios from "axios";
import _var from "../../../utils/_var";
import { toast } from "react-toastify";

export const UnitActions = {
    getUnits,
    createUnit,
    updateUnit,
    deleteUnit,
};

function getUnits() {
    function _callApi() {
        return axios({
            url: `${_var.domain_server}/api/unit`,
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
            toast.error("Có lỗi xảy ra khi lấy danh sách đơn vị tính!");
            dispatch(_failed());
            console.error(e);
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.UNIT_GET_UNITS,
        };
    }

    function _succeed(data) {
        return {
            type: actionTypes.UNIT_GET_UNITS_SUCCEED,
            data,
        };
    }

    function _failed() {
        return {
            type: actionTypes.UNIT_GET_UNITS_FAILED,
        };
    }
}

function updateUnit(id, info) {
    function _callApi(id, info) {
        return axios({
            url: `${_var.domain_server}/api/unit/${id}`,
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
            toast.success("Sửa đơn vị tính thành công!");
        } catch (e) {
            toast.error("Sửa đơn vị tính thất bại!");
            dispatch(_failed());
            console.error(e);
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.UNIT_UPDATE_UNIT,
        };
    }

    function _succeed() {
        return {
            type: actionTypes.UNIT_UPDATE_UNIT_SUCCEED,
        };
    }

    function _failed() {
        return {
            type: actionTypes.UNIT_UPDATE_UNIT_FAILED,
        };
    }
}

function deleteUnit(id) {
    function _callApi(id) {
        return axios({
            url: `${_var.domain_server}/api/unit/${id}`,
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
            toast.success("Xoá đơn vị tính thành công!");
        } catch (e) {
            toast.error("Xoá đơn vị tính thất bại!");
            dispatch(_failed());
            console.error(e);
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.UNIT_DELETE_UNIT,
        };
    }

    function _succeed() {
        return {
            type: actionTypes.UNIT_DELETE_UNIT_SUCCEED,
        };
    }

    function _failed() {
        return {
            type: actionTypes.UNIT_DELETE_UNIT_FAILED,
        };
    }
}

function createUnit(info) {
    function _callApi(info) {
        return axios({
            url: `${_var.domain_server}/api/unit`,
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
            toast.success("Thêm đơn vị tính thành công!");
        } catch (e) {
            toast.error("Thêm đơn vị tính thất bại!");
            dispatch(_failed());
            console.error(e);
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.UNIT_CREATE_UNIT,
        };
    }

    function _succeed() {
        return {
            type: actionTypes.UNIT_CREATE_UNIT_SUCCEED,
        };
    }

    function _failed() {
        return {
            type: actionTypes.UNIT_CREATE_UNIT_FAILED,
        };
    }
}
