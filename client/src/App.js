import React from "react";
import "./App.css";
import AppLogin from "./components/auth/AppLogin";
import AppRegister from "./components/auth/AppRegister";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./components/admin_panel/dashboard/Dashboard";
import PrivateRoute from "./components/private-route/PrivateRoute";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutuser } from "./actions/authActions";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/lib/integration/react";
import AppHome from "./components/front_site/home/AppHome";
import AddProducts from "./components/admin_panel/products/add_products/AddProducts";
import ListProducts from "./components/admin_panel/products/list_products/ListProducts";
import ViewProducts from "./components/admin_panel/products/view_products/ViewProducts";
import HomeViewProducts from "./components/front_site/product/view_product/HomeViewProducts";
import ViewOrders from "./components/admin_panel/orders/view_orders/ViewOrders";

const token = localStorage.getItem("jwtToken");

if (token) {
  setAuthToken(token);
  const decoded = jwt_decode(token);

  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now();
  if (decoded.exp < currentTime) {
    store.dispatch(logoutuser());
    window.location.href = "/";
  }
}

function App() {
  const persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <div className="App">
            <Route path="/" exact component={AppLogin}></Route>
            <Route path="/signup" exact component={AppRegister}></Route>
            <Switch>
              (//* Admin Panel)
              <PrivateRoute
                exact
                path="/dashboard"
                component={Dashboard}
              ></PrivateRoute>
              <PrivateRoute
                exact
                path="/dashboard/products/add_products"
                component={AddProducts}
              ></PrivateRoute>
              <PrivateRoute
                exact
                path="/dashboard/products/list_products"
                component={ListProducts}
              ></PrivateRoute>
              <PrivateRoute
                exact
                path="/dashboard/products/view_products"
                component={ViewProducts}
              ></PrivateRoute>
              <PrivateRoute
                exact
                path="/dashboard/orders/view_orders"
                component={ViewOrders}
              ></PrivateRoute>
              (//* Front Site)
              <PrivateRoute
                exact
                path="/home"
                component={AppHome}
              ></PrivateRoute>
              <PrivateRoute
                exact
                path="/home/view_product"
                component={HomeViewProducts}
              ></PrivateRoute>
            </Switch>
          </div>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
