import actionTypes from "../../_constants/actionTypes";
import axios from "axios";
import _var from "../../../utils/_var";
import { toast } from "react-toastify";

export const ProviderActions = {
    getProviders,
    createProvider,
    updateProvider,
    deleteProvider,
};

function getProviders() {
    function _callApi() {
        return axios({
            url: `${_var.domain_server}/api/provider`,
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
            toast.error("Có lỗi xảy ra khi lấy danh sách nhà cung cấp!");
            dispatch(_failed());
            console.error(e);
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.PROVIDER_GET_PROVIDERS,
        };
    }

    function _succeed(data) {
        return {
            type: actionTypes.PROVIDER_GET_PROVIDERS_SUCCEED,
            data,
        };
    }

    function _failed() {
        return {
            type: actionTypes.PROVIDER_GET_PROVIDERS_FAILED,
        };
    }
}

function updateProvider(id, info) {
    function _callApi(id, info) {
        return axios({
            url: `${_var.domain_server}/api/provider/${id}`,
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
            toast.success("Sửa nhà cung cấp thành công!");
        } catch (e) {
            toast.error("Sửa nhà cung cấp thất bại!");
            dispatch(_failed());
            console.error(e);
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.PROVIDER_UPDATE_PROVIDER,
        };
    }

    function _succeed() {
        return {
            type: actionTypes.PROVIDER_UPDATE_PROVIDER_SUCCEED,
        };
    }

    function _failed() {
        return {
            type: actionTypes.PROVIDER_UPDATE_PROVIDER_FAILED,
        };
    }
}

function deleteProvider(id) {
    function _callApi(id) {
        return axios({
            url: `${_var.domain_server}/api/provider/${id}`,
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
            toast.success("Xoá nhà cung cấp thành công!");
        } catch (e) {
            toast.error("Xoá nhà cung cấp thất bại!");
            dispatch(_failed());
            console.error(e);
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.PROVIDER_DELETE_PROVIDER,
        };
    }

    function _succeed() {
        return {
            type: actionTypes.PROVIDER_DELETE_PROVIDER_SUCCEED,
        };
    }

    function _failed() {
        return {
            type: actionTypes.PROVIDER_DELETE_PROVIDER_FAILED,
        };
    }
}

function createProvider(info) {
    function _callApi(info) {
        return axios({
            url: `${_var.domain_server}/api/provider`,
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
            toast.success("Thêm nhà cung cấp thành công!");
        } catch (e) {
            toast.error("Thêm nhà cung cấp thất bại!");
            dispatch(_failed());
            console.error(e);
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.PROVIDER_CREATE_PROVIDER,
        };
    }

    function _succeed() {
        return {
            type: actionTypes.PROVIDER_CREATE_PROVIDER_SUCCEED,
        };
    }

    function _failed() {
        return {
            type: actionTypes.PROVIDER_CREATE_PROVIDER_FAILED,
        };
    }
}
