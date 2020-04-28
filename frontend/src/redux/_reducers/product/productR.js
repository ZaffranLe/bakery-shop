import actionTypes from "../../_constants/actionTypes";

const defaultState = {
    pageLoading: false,
    products: []
}

export default (state = defaultState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}
