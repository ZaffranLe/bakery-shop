import actionTypes from "../../_constants/actionTypes";
import axios from "axios";
import _var from "../../../utils/_var";
import { toast } from "react-toastify";

export const ProductActions = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
};

function getProducts() {
    function _callApi() {
        return axios({
            url: `${_var.domain_server}/api/product`,
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
            type: actionTypes.PRODUCT_GET_PRODUCTS,
        };
    }

    function _succeed(data) {
        return {
            type: actionTypes.PRODUCT_GET_PRODUCTS_SUCCEED,
            data,
        };
    }

    function _failed() {
        return {
            type: actionTypes.PRODUCT_GET_PRODUCTS_FAILED,
        };
    }
}

function createProduct(info) {
    function _callApi(info) {
        return axios({
            url: `${_var.domain_server}/api/product`,
            method: "post",
            data: info,
            headers: {
                token: window.localStorage.getItem("token"),
            },
        });
    }

    return async (dispatch) => {
        try {
            dispatch(_beginAction());
            await _callApi(info);
            dispatch(_succeed());
        } catch (e) {
            console.error(e);
            toast.error("Tạo sản phẩm thất bại");
            dispatch(_failed());
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.PRODUCT_CREATE_PRODUCT,
        };
    }

    function _succeed() {
        return {
            type: actionTypes.PRODUCT_CREATE_PRODUCT_SUCCEED,
        };
    }

    function _failed() {
        return {
            type: actionTypes.PRODUCT_CREATE_PRODUCT_FAILED,
        };
    }
}

function updateProduct(id, info) {
    function _callApi(id, info) {
        return axios({
            url: `${_var.domain_server}/api/product/${id}`,
            method: "patch",
            data: info,
            headers: {
                token: window.localStorage.getItem("token"),
            },
        });
    }

    return async (dispatch) => {
        try {
            dispatch(_beginAction());
            await _callApi(id, info);
            dispatch(_succeed());
            toast.success("Chỉnh sửa sản phẩm thành công");
        } catch (e) {
            console.error(e);
            toast.error("Chỉnh sửa sản phẩm thất bại");
            dispatch(_failed());
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.PRODUCT_UPDATE_PRODUCT,
        };
    }

    function _succeed() {
        return {
            type: actionTypes.PRODUCT_UPDATE_PRODUCT_SUCCEED,
        };
    }

    function _failed() {
        return {
            type: actionTypes.PRODUCT_UPDATE_PRODUCT_FAILED,
        };
    }
}

function deleteProduct(id) {
    function _callApi(id) {
        return axios({
            url: `${_var.domain_server}/api/product/${id}`,
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
            toast.success("Xoá sản phẩm thành công");
        } catch (e) {
            console.error(e);
            toast.error("Xoá sản phẩm thất bại");
            dispatch(_failed());
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.PRODUCT_DELETE_PRODUCT,
        };
    }

    function _succeed() {
        return {
            type: actionTypes.PRODUCT_DELETE_PRODUCT_SUCCEED,
        };
    }

    function _failed() {
        return {
            type: actionTypes.PRODUCT_DELETE_PRODUCT_FAILED,
        };
    }
}

function getProduct(id) {
    function _callApi(id) {
        return axios({
            url: `${_var.domain_server}/api/product/${id}`,
            method: "get",
        });
    }

    return async (dispatch) => {
        try {
            dispatch(_beginAction());
            const resp = await _callApi(id);
            dispatch(_succeed(resp.data));
        } catch (e) {
            console.error(e);
            toast.error("Lấy sản phẩm thất bại");
            dispatch(_failed());
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.PRODUCT_GET_PRODUCT,
        };
    }

    function _succeed(data) {
        return {
            type: actionTypes.PRODUCT_GET_PRODUCT_SUCCEED,
            data
        };
    }

    function _failed() {
        return {
            type: actionTypes.PRODUCT_GET_PRODUCT_FAILED,
        };
    }
}

