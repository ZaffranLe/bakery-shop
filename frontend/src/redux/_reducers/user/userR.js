import actionTypes from "../../_constants/actionTypes";

const defaultState = {
    user: ""
};

export default (state = defaultState, action) => {
    switch(action.type) {
        default:
            return state;
    }
}