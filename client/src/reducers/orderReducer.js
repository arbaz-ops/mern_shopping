import * as actions from "../actions/types";

const initialState = {
  createdOrder: {}
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.CREATE_ORDER:
      return {
        ...state,
        createdOrder: action.payload
      };
    default:
      return state;
  }
};

export default orderReducer;
