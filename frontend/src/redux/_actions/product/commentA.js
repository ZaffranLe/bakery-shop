import actionTypes from "../../_constants/actionTypes";
import axios from "axios";
import _var from "../../../utils/_var";
import { toast } from "react-toastify";

export const ProductCommentActions = {
    createComment,
};


function createComment(info) {
    function _callApi(info) {
        return axios({
            url: `${_var.domain_server}/api/product/comment`,
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
            toast.error("Bình luận thất bại");
            dispatch(_failed());
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.PRODUCT_CREATE_COMMENT,
        };
    }

    function _succeed() {
        return {
            type: actionTypes.PRODUCT_CREATE_COMMENT_SUCCEED,
        };
    }

    function _failed() {
        return {
            type: actionTypes.PRODUCT_CREATE_COMMENT_FAILED,
        };
    }
}

