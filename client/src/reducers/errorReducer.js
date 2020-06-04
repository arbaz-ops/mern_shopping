import * as actions from "../actions/types";

const initialState = {
  errors: {}
};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_ERRORS:
      return {
        ...state,
        errors: action.payload
      };
    default:
      return state;
  }
};

export default errorReducer;
