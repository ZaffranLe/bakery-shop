import actionTypes from "../../_constants/actionTypes";

const defaultState = {
    units: [],
    pageLoading: true,
    isCreatedSucceed: false,
    reload: false,
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.UNIT_GET_UNITS:
        case actionTypes.UNIT_CREATE_UNIT:
        case actionTypes.UNIT_UPDATE_UNIT:
        case actionTypes.UNIT_DELETE_UNIT:
            return {
                ...state,
                pageLoading: true,
            };
        case actionTypes.UNIT_GET_UNITS_SUCCEED:
            return {
                ...state,
                units: action.data,
                pageLoading: false,
                reload: false,
                isCreatedSucceed: false,
            };
        case actionTypes.UNIT_GET_UNITS_FAILED:
            return {
                ...state,
                pageLoading: false,
                reload: false,
                isCreatedSucceed: false,
            };
        case actionTypes.UNIT_CREATE_UNIT_FAILED:
        case actionTypes.UNIT_UPDATE_UNIT_FAILED:
        case actionTypes.UNIT_DELETE_UNIT_FAILED:
            return {
                ...state,
                pageLoading: false,
            };
        case actionTypes.UNIT_CREATE_UNIT_SUCCEED:
            return {
                ...state,
                pageLoading: false,
                reload: true,
                isCreatedSucceed: true,
            };
        case actionTypes.UNIT_UPDATE_UNIT_SUCCEED:
        case actionTypes.UNIT_DELETE_UNIT_SUCCEED:
            return {
                ...state,
                pageLoading: false,
                reload: true,
            };
        default:
            return state;
    }
};
