import actionTypes from "../../_constants/actionTypes";
import _var from "../../../utils/_var";
import { toast } from "react-toastify";
import axios from "axios";

export const CartActions = {
    refreshCart,
    addProduct,
    removeProduct,
    changeAmount,
};

function refreshCart() {
    function _beginAction() {
        return {
            type: actionTypes.CART_REFRESH,
        };
    }

    return async (dispatch) => {
        dispatch(_beginAction());
    };
}

function addProduct(info) {
    function _beginAction(product) {
        return {
            type: actionTypes.CART_ADD_PRODUCT,
            data: product,
        };
    }

    return async (dispatch) => {
        const product = {
            id: info["id"],
            name: info["name"],
            unitPrice: info["unitPrice"],
            unit: info["unit"],
            image: info["image"],
            amount: 1,
        };
        dispatch(_beginAction(product));
        toast.success("Thêm sản phẩm vào giỏ thành công.");
    };
}

function removeProduct(id) {
    function _beginAction(id) {
        return {
            type: actionTypes.CART_REMOVE_PRODUCT,
            data: id,
        };
    }

    return async (dispatch) => {
        dispatch(_beginAction(id));
        toast.success("Xoá sản phẩm khỏi giỏ thành công.");
    };
}

function changeAmount(id, amount) {
    function _beginAction(id, amount) {
        return {
            type: actionTypes.CART_CHANGE_AMOUNT_OF_A_PRODUCT,
            id,
            amount,
        };
    }

    return async (dispatch) => {
        dispatch(_beginAction(id, amount));
    };
}
