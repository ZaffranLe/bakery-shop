import actionTypes from "../../_constants/actionTypes";
import axios from "axios";
import _var from "../../../utils/_var";
import { toast } from "react-toastify";

export const PermissionActions = {
    getPermissions,
    createPermission,
    updatePermission,
    deletePermission
};

function getPermissions() {
    function _callApi() {
        return axios({
            url: `${_var.domain_server}/api/permission`,
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
            toast.error("Có lỗi xảy ra khi lấy danh sách quyền hệ thống!");
            dispatch(_failed());
            console.error(e);
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.PERMISSION_GET_PERMISSIONS,
        };
    }

    function _succeed(data) {
        return {
            type: actionTypes.PERMISSION_GET_PERMISSIONS_SUCCEED,
            data,
        };
    }

    function _failed() {
        return {
            type: actionTypes.PERMISSION_GET_PERMISSIONS_FAILED,
        };
    }
}

function updatePermission(id, info) {
    function _callApi(id, info) {
        return axios({
            url: `${_var.domain_server}/api/permission/${id}`,
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
            toast.success("Sửa quyền thành công!");
        } catch (e) {
            toast.error("Sửa quyền thất bại!");
            dispatch(_failed());
            console.error(e);
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.PERMISSION_UPDATE_PERMISSION,
        };
    }

    function _succeed() {
        return {
            type: actionTypes.PERMISSION_UPDATE_PERMISSION_SUCCEED,
        };
    }

    function _failed() {
        return {
            type: actionTypes.PERMISSION_UPDATE_PERMISSION_FAILED,
        };
    }
}


function deletePermission(id) {
    function _callApi(id) {
        return axios({
            url: `${_var.domain_server}/api/permission/${id}`,
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
            toast.success("Xoá quyền thành công!");
        } catch (e) {
            toast.error("Xoá quyền thất bại!");
            dispatch(_failed());
            console.error(e);
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.PERMISSION_DELETE_PERMISSION,
        };
    }

    function _succeed() {
        return {
            type: actionTypes.PERMISSION_DELETE_PERMISSION_SUCCEED,
        };
    }

    function _failed() {
        return {
            type: actionTypes.PERMISSION_DELETE_PERMISSION_FAILED,
        };
    }
}


function createPermission(info) {
    function _callApi(info) {
        return axios({
            url: `${_var.domain_server}/api/permission`,
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
            toast.success("Thêm quyền thành công!");
        } catch (e) {
            toast.error("Thêm quyền thất bại!");
            dispatch(_failed());
            console.error(e);
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.PERMISSION_CREATE_PERMISSION,
        };
    }

    function _succeed() {
        return {
            type: actionTypes.PERMISSION_CREATE_PERMISSION_SUCCEED,
        };
    }

    function _failed() {
        return {
            type: actionTypes.PERMISSION_CREATE_PERMISSION_FAILED,
        };
    }
}