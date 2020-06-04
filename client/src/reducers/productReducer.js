import * as actions from "../actions/types";

const initialState = {
  createdProducts: {},
  productsList: {},
  getSingleProduct: {}
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_PRODUCT:
      return {
        ...state,
        createdProducts: action.payload
      };
    case actions.GET_PRODUCTS:
      return {
        ...state,
        productsList: action.payload
      };
    case actions.GET_SINGLE_PRODUCT:
      return {
        ...state,
        getSingleProduct: action.payload
      };

    default:
      return state;
  }
};

export default productReducer;
