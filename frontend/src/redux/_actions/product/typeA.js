import actionTypes from "../../_constants/actionTypes";
import axios from "axios";
import _var from "../../../utils/_var";
import { toast } from "react-toastify";

export const ProductTypeActions = {
    getTypes,
    createType,
    updateType,
    deleteType,
};

function getTypes() {
    function _callApi() {
        return axios({
            url: `${_var.domain_server}/api/product/type`,
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
            dispatch(_failed());
            console.error(e);
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.PRODUCT_GET_TYPES,
        };
    }

    function _succeed(data) {
        return {
            type: actionTypes.PRODUCT_GET_TYPES_SUCCEED,
            data,
        };
    }

    function _failed() {
        return {
            type: actionTypes.PRODUCT_GET_TYPES_FAILED,
        };
    }
}

function updateType(id, info) {
    function _callApi(id, info) {
        return axios({
            url: `${_var.domain_server}/api/product/type/${id}`,
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
            toast.success("Sửa thể loại sản phẩm thành công!");
        } catch (e) {
            toast.error("Sửa thể loại sản phẩm thất bại!");
            dispatch(_failed());
            console.error(e);
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.PRODUCT_UPDATE_TYPE,
        };
    }

    function _succeed() {
        return {
            type: actionTypes.PRODUCT_UPDATE_TYPE_SUCCEED,
        };
    }

    function _failed() {
        return {
            type: actionTypes.PRODUCT_UPDATE_TYPE_FAILED,
        };
    }
}

function deleteType(id) {
    function _callApi(id) {
        return axios({
            url: `${_var.domain_server}/api/product/type/${id}`,
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
            toast.success("Xoá thể loại sản phẩm thành công!");
        } catch (e) {
            toast.error("Xoá thể loại sản phẩm thất bại!");
            dispatch(_failed());
            console.error(e);
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.PRODUCT_DELETE_TYPE,
        };
    }

    function _succeed() {
        return {
            type: actionTypes.PRODUCT_DELETE_TYPE_SUCCEED,
        };
    }

    function _failed() {
        return {
            type: actionTypes.PRODUCT_DELETE_TYPE_FAILED,
        };
    }
}

function createType(info) {
    function _callApi(info) {
        return axios({
            url: `${_var.domain_server}/api/product/type`,
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
            toast.success("Thêm thể loại sản phẩm thành công!");
        } catch (e) {
            toast.error("Thêm thể loại sản phẩm thất bại!");
            dispatch(_failed());
            console.error(e);
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.PRODUCT_CREATE_TYPE,
        };
    }

    function _succeed() {
        return {
            type: actionTypes.PRODUCT_CREATE_TYPE_SUCCEED,
        };
    }

    function _failed() {
        return {
            type: actionTypes.PRODUCT_CREATE_TYPE_FAILED,
        };
    }
}
