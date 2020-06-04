import React, { Component } from "react";
import AppNav from "../../../layout/AppNav";
import SideBar from "../../../layout/SideBar";
import AppFooter from "../../../layout/AppFooter";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Form, FormGroup, Label, Input, Button, CardImg } from "reactstrap";
import "./ViewProduct.css";
import { updateProds } from "../../../../actions/productActions";
import Axios from "axios";

class ViewProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      price: "",
      description: "",
      brand: "",
      productImage: null,
      size: {}
    };
  }

  componentDidMount() {
    if (this.props.user.isAuthenticated) {
      if (this.props.user.user.type === "admin") {
        this.props.history.push("/dashboard/products/view_products");
      } else {
        this.props.history.push("/home");
      }
    } else {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.products.getSingleProduct) {
      const {
        _id,
        name,
        price,
        description,
        brand,
        productImage
      } = nextProps.products.getSingleProduct.productDetails;

      this.setState({
        size: {
          ...this.state.size,
          small: nextProps.products.getSingleProduct.productDetails.size[0],
          medium: nextProps.products.getSingleProduct.productDetails.size[1],
          large: nextProps.products.getSingleProduct.productDetails.size[2],
          extraLarge: nextProps.products.getSingleProduct.productDetails.size[3]
        }
      });

      this.setState({
        id: _id,
        name: name,
        price: price,
        description: description,
        brand: brand
      });

      Axios.get(`http://localhost:5000/${productImage}`, {
        responseType: "arraybuffer"
      }).then(result => {
        const base64 = btoa(
          new Uint8Array(result.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );
        this.setState({ productImage: "data:;base64," + base64 });
      });
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  changeHandlerCheckboxSmall = e => {
    if (this.state.size.small === e.target.value) {
      this.setState({
        size: { ...this.state.size, [e.target.name]: "" }
      });
    } else {
      this.setState({
        size: { ...this.state.size, [e.target.name]: e.target.value }
      });
    }
  };

  changeHandlerCheckboxMedium = e => {
    if (this.state.size.medium === e.target.value) {
      this.setState({
        size: { ...this.state.size, [e.target.name]: "" }
      });
    } else {
      this.setState({
        size: { ...this.state.size, [e.target.name]: e.target.value }
      });
    }
  };

  changeHandlerCheckboxLarge = e => {
    if (this.state.size.large === e.target.value) {
      this.setState({
        size: { ...this.state.size, [e.target.name]: "" }
      });
    } else {
      this.setState({
        size: { ...this.state.size, [e.target.name]: e.target.value }
      });
    }
  };

  changeHandlerCheckboxExtraLarge = e => {
    if (this.state.size.extraLarge === e.target.value) {
      this.setState({
        size: { ...this.state.size, [e.target.name]: "" }
      });
    } else {
      this.setState({
        size: { ...this.state.size, [e.target.name]: e.target.value }
      });
    }
  };

  fileHandler = e => {
    console.log(e.target.files[0]);
    this.setState({
      productImage: e.target.files[0]
    });
  };

  showProductsList = e => {
    this.props.history.push("/dashboard/products/list_products");
  };

  handleClick = () => {
    const { id, name, price, description, productImage, brand } = this.state;
    const { small, medium, large, extraLarge } = this.state.size;
    const size = {
      small: small,
      medium: medium,
      large: large,
      extraLarge: extraLarge
    };
    const updateProdData = {
      id: id,
      name: name,
      brand: brand,
      price: price,
      description: description,
      size: size,
      productImage: productImage
    };
    this.props.updateProds(updateProdData);
  };

  render() {
    return (
      <div>
        <AppNav></AppNav>
        <SideBar></SideBar>
        <AppFooter></AppFooter>
        <div
          style={{
            position: "absolute",
            top: "60px",
            left: "221px",
            width: "81.6%",
            height: "860px"
          }}
        >
          <h2 className="text-center mt-2">View Product</h2>
          <Form className="view-products mt-5 ">
            <FormGroup>
              <Label>Product Name</Label>
              <Input
                style={{ width: "400px" }}
                name="name"
                placeholder="Product Name"
                defaultValue={this.state.name}
                onChange={this.handleChange}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label>Product Brand</Label>
              <Input
                name="brand"
                placeholder="Product Brand"
                defaultValue={this.state.brand}
                style={{ width: "400px" }}
                onChange={this.handleChange}
              ></Input>
              <span></span>
            </FormGroup>
            <FormGroup>
              <Label>Product Description</Label>
              <Input
                type="textarea"
                name="description"
                placeholder="Product Description"
                defaultValue={this.state.description}
                style={{ resize: "none", height: "100px" }}
                onChange={this.handleChange}
              ></Input>
              <span></span>
            </FormGroup>
            <FormGroup>
              <Label>Price</Label>
              <Input
                type="number"
                min="0"
                name="price"
                placeholder="Price"
                defaultValue={this.state.price}
                style={{ width: "200px" }}
                onChange={this.handleChange}
              ></Input>
            </FormGroup>
            <Label>Size</Label>
            <FormGroup check>
              <Input
                type="checkbox"
                name="small"
                id="small"
                onChange={this.changeHandlerCheckboxSmall}
                value="Small"
                checked={this.state.size.small ? true : false}
              />
              <Label for="small" check>
                Small
              </Label>
            </FormGroup>
            <FormGroup check>
              <Input
                value="Medium"
                checked={this.state.size.medium === "Medium" ? true : false}
                type="checkbox"
                onChange={this.changeHandlerCheckboxMedium}
                name="medium"
                id="medium"
              />
              <Label for="medium" check>
                Medium
              </Label>
            </FormGroup>
            <FormGroup check>
              <Input
                onChange={this.changeHandlerCheckboxLarge}
                value="Large"
                type="checkbox"
                name="large"
                checked={this.state.size.large === "Large" ? true : false}
                id="large"
              />
              <Label for="large" check>
                Large
              </Label>
            </FormGroup>
            <FormGroup check>
              <Input
                onChange={this.changeHandlerCheckboxExtraLarge}
                value="Extra Large"
                type="checkbox"
                name="extraLarge"
                id="extraLarge"
                checked={
                  this.state.size.extraLarge === "Extra Large" ? true : false
                }
              />
              <Label for="extraLarge" check>
                Extra Large
              </Label>
            </FormGroup>
            <FormGroup className="mt-4">
              <Label>Image</Label>
              <Input type="file" onChange={this.fileHandler}></Input>
            </FormGroup>
            <CardImg
              draggable="false"
              src={this.state.productImage}
              top
              width="100%"
              style={{
                position: "absolute",
                left: "500px",
                width: "400px",
                top: "350px",
                height: "300px"
              }}
            ></CardImg>
            <Button
              color="primary"
              style={{ position: "absolute", top: "700px" }}
              onClick={this.handleClick}
              className="mt-5"
            >
              Update Product
            </Button>
            <Button
              color="info"
              className="mt-5 ml-5"
              onClick={this.showProductsList}
              style={{ left: "550px", position: "absolute", top: "700px" }}
            >
              Products List
            </Button>
            <Button
              color="secondary"
              className="mt-5 ml-5"
              onClick={() =>
                this.props.history.push("/dashboard/products/add_products")
              }
              style={{ left: "150px", position: "absolute", top: "700px" }}
            >
              Add Product
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

ViewProducts.propTypes = {
  user: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  products: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  errors: state.errors,
  products: state.products
});

export default connect(mapStateToProps, { updateProds })(ViewProducts);
