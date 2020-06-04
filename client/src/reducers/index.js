import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import { combineReducers } from "redux";
import productReducer from "./productReducer";
import orderReducer from "./orderReducer";

export default combineReducers({
  user: authReducer,
  errors: errorReducer,
  products: productReducer,
  orders: orderReducer
});
