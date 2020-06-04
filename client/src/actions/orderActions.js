import * as actions from "./types";
import Axios from "axios";

export const createOrder = orderData => dispatch => {
  Axios.post("http://localhost:5000/orders/createOrder", orderData)
    .then(result => {
      dispatch(setCreatedOrder(result.data));
      window.location.reload();
    })
    .catch(err => {
      dispatch({
        type: actions.GET_ERRORS,
        payload: err.message
      });
    });
};

const setCreatedOrder = orderData => {
  return {
    type: actions.CREATE_ORDER,
    payload: orderData
  };
};
