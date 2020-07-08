import actionTypes from "../../_constants/actionTypes";
import axios from "axios";
import _var from "../../../utils/_var";
import { toast } from "react-toastify";
import jwt from "jsonwebtoken";
import { history } from "../../../routes/history";

export const UserActions = {
    signIn,
    signUp,
    checkToken,
    signOut,
    checkUsername,
    updateUserInfo,
    deleteUser,
    getUsers,
};

function signIn(username, password) {
    function _callApi(name, pass) {
        return axios({
            url: `${_var.domain_server}/api/login`,
            method: "post",
            auth: {
                username: name,
                password: pass,
            },
        });
    }

    return async (dispatch) => {
        try {
            dispatch(_beginAction());
            const resp = await _callApi(username, password);
            const token = resp.data;
            window.localStorage.setItem("token", token);
            const userInfo = jwt.decode(token);
            dispatch(_succeed(userInfo));
        } catch (e) {
            if (e.hasOwnProperty("response")) {
                if (e.response.status === 401) {
                    toast.error(e.response.data.msg);
                }
                toast.error("Sai tên đăng nhập hoặc mật khẩu.");
            } else {
                toast.error("Đăng nhập thất bại, vui lòng thử lại sau.");
            }
            dispatch(_failed());
            console.error(e);
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.USER_LOGIN,
        };
    }

    function _succeed(data) {
        return {
            type: actionTypes.USER_LOGIN_SUCCEED,
            data,
        };
    }

    function _failed() {
        return {
            type: actionTypes.USER_LOGIN_FAILED,
        };
    }
}

function checkToken() {
    return async (dispatch) => {
        try {
            dispatch(_beginAction());
            const token = window.localStorage.getItem("token");
            if (token) {
                const userInfo = jwt.decode(token);
                dispatch(_succeed(userInfo));
            } else {
                dispatch(_failed());
            }
        } catch (e) {
            console.error(e);
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.USER_LOGIN,
        };
    }

    function _succeed(data) {
        return {
            type: actionTypes.USER_LOGIN_SUCCEED,
            data,
        };
    }

    function _failed() {
        return {
            type: actionTypes.USER_LOGIN_FAILED,
        };
    }
}

function signOut() {
    return async (dispatch) => {
        let token = "";
        try {
            dispatch(_beginAction());
            token = window.localStorage.getItem("token");
            window.localStorage.clear();
            dispatch(_succeed());
            toast.success("Đăng xuất thành công, hẹn gặp lại.");
            history.push("/");
        } catch (e) {
            toast.error("Đăng xuất thất bại, vui lòng thử lại sau.");
            window.localStorage.setItem("token", token);
            dispatch(_failed());
            console.error(e);
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.USER_LOGOUT,
        };
    }

    function _succeed() {
        return {
            type: actionTypes.USER_LOGOUT_SUCCEED,
        };
    }

    function _failed() {
        return {
            type: actionTypes.USER_LOGOUT_FAILED,
        };
    }
}

function checkUsername(name) {
    function _callApi(username) {
        return axios({
            url: `${_var.domain_server}/api/verify-username`,
            method: "post",
            data: {
                username,
            },
        });
    }

    return async (dispatch) => {
        try {
            dispatch(_beginAction());
            await _callApi(name);
            dispatch(_succeed());
        } catch (e) {
            if (e.response.status === 500) {
                toast.error("Có lỗi xảy ra trong quá trình kiểm tra tên đăng nhập.");
            }
            if (e.response.status === 400) {
                toast.error("Tên đăng nhập không hợp lệ.");
            }
            dispatch(_failed());
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.USER_CHECK_USERNAME,
        };
    }

    function _succeed() {
        return {
            type: actionTypes.USER_CHECK_USERNAME_SUCCEED,
        };
    }

    function _failed() {
        return {
            type: actionTypes.USER_CHECK_USERNAME_FAILED,
        };
    }
}

function updateUserInfo(id, info) {
    function _callApi(id, info) {
        return axios({
            url: `${_var.domain_server}/api/user/${id}`,
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
            const token = window.localStorage.getItem("token");
            const userInfo = jwt.decode(token);
            if (userInfo.userId == id) {
                toast.success("Cập nhật thành công. Vui lòng đăng nhập lại.");
            } else {
                toast.success("Cập nhật thông tin thành công.");
            }
            dispatch(_succeed());
        } catch (e) {
            console.error(e);
            if (e.response.status === 403) {
                toast.error(e.response.data.msg);
            } else if (e.response.status === 500) {
                toast.error("Cập nhật thông tin thất bại do lỗi hệ thống.");
            }
            dispatch(_failed());
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.USER_UPDATE_USER,
        };
    }

    function _succeed() {
        return {
            type: actionTypes.USER_UPDATE_USER_SUCCEED,
        };
    }

    function _failed() {
        return {
            type: actionTypes.USER_UPDATE_USER_FAILED,
        };
    }
}

function signUp(info) {
    function _callApi(info) {
        return axios({
            url: `${_var.domain_server}/api/user`,
            method: "post",
            data: info,
        });
    }

    return async (dispatch) => {
        try {
            dispatch(_beginAction());
            await _callApi(info);
            dispatch(_succeed());
            toast.success("Tạo tài khoản thành công.");
        } catch (e) {
            console.error(e);
            dispatch(_failed());
            toast.error("Tạo tài khoản thất bại. Có lỗi xảy ra trên hệ thống.");
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.USER_SIGNUP,
        };
    }

    function _succeed() {
        return {
            type: actionTypes.USER_SIGNUP_SUCCEED,
        };
    }

    function _failed() {
        return {
            type: actionTypes.USER_SIGNUP_FAILED,
        };
    }
}

function deleteUser(id) {
    function _callApi(id) {
        return axios({
            url: `${_var.domain_server}/api/user/${id}`,
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
            toast.success("Xoá người dùng thành công.");
            dispatch(_succeed());
        } catch (e) {
            console.error(e);
            toast.error("Xoá người dùng thất bại.");
            dispatch(_failed());
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.USER_DELETE_USER,
        };
    }

    function _succeed() {
        return {
            type: actionTypes.USER_DELETE_USER_SUCCEED,
        };
    }

    function _failed() {
        return {
            type: actionTypes.USER_DELETE_USER_FAILED,
        };
    }
}

function getUsers() {
    function _callApi() {
        return axios({
            url: `${_var.domain_server}/api/user`,
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
            toast.error("Lấy danh sách người dùng thất bại.");
            dispatch(_failed());
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.USER_GET_USERS,
        };
    }

    function _succeed(data) {
        return {
            type: actionTypes.USER_GET_USERS_SUCCEED,
            data,
        };
    }

    function _failed() {
        return {
            type: actionTypes.USER_GET_USERS_FAILED,
        };
    }
}
