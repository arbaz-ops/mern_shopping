import * as actions from "./types";
import axios from "axios";
import FormData from "form-data";

export const addProduct = (prodData, history) => dispatch => {
  let data = new FormData();
  data.append("name", prodData.name);
  data.append("price", prodData.price);
  data.append("brand", prodData.brand);

  data.append("description", prodData.description);
  data.append("size", prodData.size.small);
  data.append("size", prodData.size.medium);
  data.append("size", prodData.size.large);
  data.append("size", prodData.size.extraLarge);
  data.append(
    "productImage",
    prodData.productImage,
    prodData.productImage.name
  );

  axios
    .post("http://localhost:5000/products/createProduct", data)
    .then(res => {
      const createdProduct = res.data.productDetails;
      console.log(createdProduct);
      dispatch(setCreatedProducts(createdProduct));
      history.push("/dashboard/products/list_products");
      window.location.reload();
    })
    .catch(e => {
      dispatch({
        type: actions.GET_ERRORS,
        payload: e.message
      });
    });
};

export const setCreatedProducts = createdProduct => {
  return {
    type: actions.ADD_PRODUCT,
    payload: createdProduct
  };
};

export const getProductsList = () => dispatch => {
  axios
    .get("http://localhost:5000/products/showProducts")
    .then(result => {
      const productsList = result.data;

      dispatch(setProductsList(productsList));
    })
    .catch(err =>
      dispatch({
        type: actions.GET_ERRORS,
        payload: err.message
      })
    );
};

export const setProductsList = productsList => {
  return {
    type: actions.GET_PRODUCTS,
    payload: productsList
  };
};

export const getProduct = (request, history) => dispatch => {
  axios
    .get(request.url)
    .then(result => {
      dispatch(getSingleProduct(result.data));
      history.push("/dashboard/products/view_products");
      window.location.reload();
    })
    .catch(err =>
      dispatch({
        type: actions.GET_ERRORS,
        payload: err.message
      })
    );
};

export const getSingleProduct = data => {
  return {
    type: actions.GET_SINGLE_PRODUCT,
    payload: data
  };
};

export const updateProds = data => dispatch => {
  let newdata = new FormData();
  newdata.append("name", data.name);
  newdata.append("price", data.price);
  newdata.append("brand", data.brand);
  newdata.append("description", data.description);
  newdata.append("size", data.size.small);
  newdata.append("size", data.size.medium);
  newdata.append("size", data.size.large);
  newdata.append("size", data.size.extraLarge);

  const id = data.id;

  axios
    .patch(`http://localhost:5000/products/${id}`, newdata)
    .then(result => console.log(result))
    .catch(err => console.log(err));
};

export const getProductHome = (requesturl, history) => dispatch => {
  axios
    .get(requesturl)
    .then(result => {
      dispatch(getSingleProduct(result.data));
      history.push("/home/view_product");
      window.location.reload();
    })
    .catch(err =>
      dispatch({
        type: actions.GET_ERRORS,
        payload: err.message
      })
    );
};
