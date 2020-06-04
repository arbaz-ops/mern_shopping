import * as actions from "./types";
import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
import { setCreatedProducts } from "./productActions";

export const registerUser = (newUser, history) => dispatch => {
  axios
    .post("http://localhost:5000/user/register", newUser)
    .then(res => history.push("/"))
    .catch(err => {
      dispatch({
        type: actions.GET_ERRORS,
        payload: err.message
      });
    });
};

export const loginUser = (userData, history) => dispatch => {
  axios
    .post("http://localhost:5000/user/login", userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);

      dispatch(setCurrentUser(decoded));

      window.location.reload();
    })
    .catch(err => {
      dispatch({
        type: actions.GET_ERRORS,
        payload: err.message
      });
    });
};

export const setCurrentUser = decoded => {
  return {
    type: actions.LOGIN_USER,
    payload: decoded
  };
};

export const logoutUser = history => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCreatedProducts({}));
  dispatch(setCurrentUser({}));
};

export const logoutuser = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCreatedProducts({}));

  dispatch(setCurrentUser({}));
};
