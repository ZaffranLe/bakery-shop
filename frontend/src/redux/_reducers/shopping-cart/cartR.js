import actionTypes from "../../_constants/actionTypes";

const defaultState = {
    products: [],
    pageLoading: false,
    isCreatedSucceed: false,
};

export default (state = defaultState, action) => {
    const products = [...state.products];
    switch (action.type) {
        case actionTypes.CART_REFRESH:
            return {
                ...state,
                products: [],
                isCreatedSucceed: false,
            };
        case actionTypes.CART_ADD_PRODUCT:
            const productToAdd = action.data;
            const exist = products.find((product) => product["id"] == productToAdd["id"]);
            if (!exist) {
                products.push(productToAdd);
            }
            return {
                ...state,
                products,
            };
        case actionTypes.CART_REMOVE_PRODUCT:
            const idProductToRemove = action.data;
            return {
                ...state,
                products: products.filter((product) => product["id"] != idProductToRemove),
            };
        case actionTypes.CART_CHANGE_AMOUNT_OF_A_PRODUCT:
            const idProduct = action.id;
            const amount = action.amount;
            const productToChange = products.find((product) => product["id"] == idProduct);
            productToChange["amount"] = amount;
            return {
                ...state,
                products,
            };
        case actionTypes.EXPORT_RECEIPT_CREATE_RECEIPT:
            return {
                ...state,
                pageLoading: true,
            };
        case actionTypes.EXPORT_RECEIPT_CREATE_RECEIPT_FAILED:
            return {
                ...state,
                pageLoading: false,
            };
        case actionTypes.EXPORT_RECEIPT_CREATE_RECEIPT_SUCCEED:
            return {
                ...state,
                pageLoading: false,
                isCreatedSucceed: true,
            };
        default:
            return state;
    }
};
