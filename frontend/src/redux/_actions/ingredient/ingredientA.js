import actionTypes from "../../_constants/actionTypes";
import axios from "axios";
import _var from "../../../utils/_var";
import { toast } from "react-toastify";

export const IngredientActions = {
    getIngredients,
    createIngredient,
    updateIngredient,
    deleteIngredient,
};

function getIngredients() {
    function _callApi() {
        return axios({
            url: `${_var.domain_server}/api/ingredient`,
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
            type: actionTypes.INGREDIENT_GET_INGREDIENTS,
        };
    }

    function _succeed(data) {
        return {
            type: actionTypes.INGREDIENT_GET_INGREDIENTS_SUCCEED,
            data,
        };
    }

    function _failed() {
        return {
            type: actionTypes.INGREDIENT_GET_INGREDIENTS_FAILED,
        };
    }
}

function updateIngredient(id, info) {
    function _callApi(id, info) {
        return axios({
            url: `${_var.domain_server}/api/ingredient/${id}`,
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
            toast.success("Sửa nguyên liệu thành công!");
        } catch (e) {
            toast.error("Sửa nguyên liệu thất bại!");
            dispatch(_failed());
            console.error(e);
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.INGREDIENT_UPDATE_INGREDIENT,
        };
    }

    function _succeed() {
        return {
            type: actionTypes.INGREDIENT_UPDATE_INGREDIENT_SUCCEED,
        };
    }

    function _failed() {
        return {
            type: actionTypes.INGREDIENT_UPDATE_INGREDIENT_FAILED,
        };
    }
}

function deleteIngredient(id) {
    function _callApi(id) {
        return axios({
            url: `${_var.domain_server}/api/ingredient/${id}`,
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
            toast.success("Xoá nguyên liệu thành công!");
        } catch (e) {
            toast.error("Xoá nguyên liệu thất bại!");
            dispatch(_failed());
            console.error(e);
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.INGREDIENT_DELETE_INGREDIENT,
        };
    }

    function _succeed() {
        return {
            type: actionTypes.INGREDIENT_DELETE_INGREDIENT_SUCCEED,
        };
    }

    function _failed() {
        return {
            type: actionTypes.INGREDIENT_DELETE_INGREDIENT_FAILED,
        };
    }
}

function createIngredient(info) {
    function _callApi(info) {
        return axios({
            url: `${_var.domain_server}/api/ingredient`,
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
            toast.success("Thêm nguyên liệu thành công!");
        } catch (e) {
            toast.error("Thêm nguyên liệu thất bại!");
            dispatch(_failed());
            console.error(e);
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.INGREDIENT_CREATE_INGREDIENT,
        };
    }

    function _succeed() {
        return {
            type: actionTypes.INGREDIENT_CREATE_INGREDIENT_SUCCEED,
        };
    }

    function _failed() {
        return {
            type: actionTypes.INGREDIENT_CREATE_INGREDIENT_FAILED,
        };
    }
}
