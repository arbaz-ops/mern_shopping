import React, { Component } from "react";
import AppNav from "../../../layout/AppNav";
import SideBar from "../../../layout/SideBar";
import AppFooter from "../../../layout/AppFooter";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addProduct } from "../../../../actions/productActions";
import SimpleReactValidator from "simple-react-validator";

import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import "./Products.css";

class AddProducts extends Component {
  constructor(props) {
    super(props);
    this.validate = new SimpleReactValidator();
    this.state = {
      name: "",
      price: "",
      description: "",
      size: {
        small: "",
        medium: "",
        large: "",
        extraLarge: ""
      },
      brand: "",
      productImage: "",
      formMessages: "",
      formErrors: {
        name: "",
        brand: "",
        price: "",
        description: "",
        productImage: ""
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.fileHandler = this.fileHandler.bind(this);
  }

  componentDidMount() {
    if (this.props.user.isAuthenticated) {
      if (this.props.user.user.type === "simpleUser")
        this.props.history.push("/home");
    } else {
      this.props.history.push("/dashboard/products/add_products");
    }
  }

  handleChange = e => {
    this.setState({
      productImage: e.target.value
    });
  };

  changeHandler = e => {
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
    this.setState({
      productImage: e.target.files[0]
    });
  };

  handleClick = () => {
    if (!this.state.name) {
      this.setState({
        formErrors: {
          ...this.state.formErrors,
          name: "Please enter product name."
        }
      });
    } else if (!this.state.brand) {
      this.setState({
        formErrors: {
          ...this.state.formErrors,
          name: undefined,
          brand: "Please enter product brand"
        }
      });
    } else if (!this.state.description) {
      this.setState({
        formErrors: {
          ...this.state.formErrors,
          brand: undefined,
          description: "Please enter product description."
        }
      });
    } else if (!this.state.price) {
      this.setState({
        formErrors: {
          ...this.state.formErrors,
          description: undefined,
          price: "Please enter product price."
        }
      });
    } else if (!this.state.productImage) {
      this.setState({
        formErrors: {
          ...this.state.formErrors,
          price: undefined,
          productImage: "Please choose file."
        }
      });
    } else {
      this.setState({
        formErrors: {
          ...this.state.formErrors,
          name: undefined,
          description: undefined,
          price: undefined,
          brand: undefined,
          productImage: undefined
        },
        formMessages: "Product added successfully"
      });
      const { name, price, description, productImage, brand } = this.state;
      const { small, medium, large, extraLarge } = this.state.size;
      const size = {
        small: small,
        medium: medium,
        large: large,
        extraLarge: extraLarge
      };
      const prodData = {
        name: name,
        brand: brand,
        price: price,
        description: description,
        size: size,
        productImage: productImage
      };
      this.props.addProduct(prodData, this.props.history);
    }
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
          <Form className="add-products">
            <h2 className="text-center">Add Products</h2>
            <span className="text-success">{this.state.formMessages}</span>
            <FormGroup>
              <Label className="mt-5">Product Name</Label>
              <Input
                name="name"
                placeholder="Product Name"
                style={{ width: "400px" }}
                onChange={this.changeHandler}
              ></Input>
              <span className="text-danger">{this.state.formErrors.name}</span>
            </FormGroup>
            <FormGroup>
              <Label>Product Brand</Label>
              <Input
                name="brand"
                placeholder="Product Brand"
                style={{ width: "400px" }}
                onChange={this.changeHandler}
              ></Input>
              <span className="text-danger">{this.state.formErrors.brand}</span>
            </FormGroup>

            <FormGroup>
              <Label>Product Description</Label>
              <Input
                type="textarea"
                name="description"
                placeholder="Product Description"
                style={{ resize: "none", height: "100px" }}
                onChange={this.changeHandler}
              ></Input>
              <span className="text-danger">
                {" "}
                {this.state.formErrors.description}{" "}
              </span>
            </FormGroup>
            <FormGroup>
              <Label>Price</Label>
              <Input
                type="number"
                min="0"
                name="price"
                placeholder="Price"
                style={{ width: "200px" }}
                onChange={this.changeHandler}
              ></Input>
              {this.state.formErrors.price ? (
                <span className="text-danger">
                  {this.state.formErrors.price}
                </span>
              ) : (
                <span></span>
              )}
            </FormGroup>
            <Label>Size</Label>
            <FormGroup check>
              <Input
                type="checkbox"
                name="small"
                id="small"
                onChange={this.changeHandlerCheckboxSmall}
                value="Small"
              />
              <Label for="small" check>
                Small
              </Label>
            </FormGroup>
            <FormGroup check>
              <Input
                onChange={this.changeHandlerCheckboxMedium}
                value="Medium"
                type="checkbox"
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
              />
              <Label for="extraLarge" check>
                Extra Large
              </Label>
            </FormGroup>
            <FormGroup className="mt-4">
              <Label>Image</Label>
              <Input type="file" onChange={this.fileHandler}></Input>
              <span className="text-danger">
                {this.state.formErrors.productImage}
              </span>
            </FormGroup>

            <Button
              color="dark"
              style={{ left: "250px", position: "absolute", top: "135%" }}
              onClick={this.handleClick}
            >
              Add Product
            </Button>
            <Button
              color="info"
              className="mt-5 ml-5"
              onClick={() =>
                this.props.history.push("/dashboard/products/list_products")
              }
              style={{ left: "201px", position: "absolute", top: "135%" }}
            >
              Products List
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

AddProducts.propTypes = {
  user: PropTypes.object.isRequired,
  addProduct: PropTypes.func.isRequired,
  products: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  errors: state.errors,
  products: state.products
});

export default connect(mapStateToProps, { addProduct })(AddProducts);
