import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import AppNav from "../../../layout/AppNav";
import "./ViewProduct.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Axios from "axios";
import { createOrder } from "../../../../actions/orderActions";

class HomeViewProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productDetails: {},
      sizes: [],
      image: null,
      customerDetail: {
        c_name: "",
        c_address: "",
        productId: "",
        c_ph_number: "",
        quantity: "1",
        productId: "",
        size: ""
      },
      formErrors: {
        name: "",
        address: "",
        productId: "",
        ph_number: "",
        quantity: "1",
        size: ""
      },
      formSuccess: ""
    };
    this.changeHandler = this.changeHandler.bind(this);
  }

  componentDidMount() {
    if (this.props.user.isAuthenticated) {
      if (this.props.user.user.type === "simpleUser") {
        this.props.history.push("/home/view_product");
      } else {
        this.props.history.push("/dashboard");
      }
    }
  }

  changeHandler = e => {
    this.setState({
      customerDetail: {
        ...this.state.customerDetail,
        [e.target.name]: e.target.value
      }
    });
  };

  componentWillReceiveProps(props) {
    if (props.products) {
      this.setState({
        productDetails: props.products.getSingleProduct.productDetails,
        sizes: props.products.getSingleProduct.productDetails.size
      });
      this.setState({
        customerDetail: {
          ...this.state.customerDetail,
          productId: props.products.getSingleProduct.productDetails._id
        }
      });
      if (props.products.getSingleProduct.productDetails.productImage) {
        this.getProdImage(
          props.products.getSingleProduct.productDetails.productImage
        );
      }
    }
  }

  getProdImage = image => {
    Axios.get(`http://localhost:5000/${image}`, {
      responseType: "arraybuffer"
    }).then(response => {
      const base64 = btoa(
        new Uint8Array(response.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      this.setState({ image: "data:;base64," + base64 });
    });
  };

  handleSubmit = () => {
    const {
      c_name,
      c_address,
      c_ph_number,

      size
    } = this.state.customerDetail;
    if (!c_name) {
      this.setState({
        formErrors: {
          ...this.state.formErrors,
          name: "Please enter your name."
        }
      });
    } else if (!c_address) {
      this.setState({
        formErrors: {
          ...this.state.formErrors,
          name: undefined,
          address: "Please enter your address."
        }
      });
    } else if (!c_ph_number) {
      this.setState({
        formErrors: {
          ...this.state.formErrors,
          name: undefined,
          address: undefined,

          ph_number: "Please enter your phone number."
        }
      });
    } else if (!size) {
      this.setState({
        formErrors: {
          ...this.state.formErrors,
          name: undefined,
          address: undefined,
          ph_number: undefined,
          size: "Please enter size."
        }
      });
    } else {
      this.setState({
        formErrors: {
          ...this.state.formErrors,
          name: undefined,
          address: undefined,
          ph_number: undefined,
          quantity: undefined,
          size: undefined
        }
      });
      const orderData = {
        c_name: this.state.customerDetail.c_name,
        c_address: this.state.customerDetail.c_address,
        c_ph_number: this.state.customerDetail.c_ph_number,
        quantity: this.state.customerDetail.quantity,
        productId: this.state.customerDetail.productId,
        size: this.state.customerDetail.size
      };
      this.props.createOrder(orderData);
    }
  };

  render() {
    let i = 0;
    const sizes = this.state.sizes.map(size => {
      return (
        <div key={(i = i + 1)}>
          <CardText>{size}</CardText>
        </div>
      );
    });

    return (
      <div>
        <AppNav></AppNav>
        <div className="home-content">
          <div className="view-product">
            <Card className="content" color="light">
              <h3 className="mt-2 ml-2 ">Product Details</h3>
              <CardImg
                draggable={false}
                className="image"
                top
                width="100%"
                src={this.state.image}
              />
              <CardBody>
                <CardTitle className="mt-1">
                  <strong>{this.state.productDetails.name}</strong>
                </CardTitle>
                <CardTitle className="mt-4">
                  <strong>Brand</strong>
                  <br></br>
                  {this.state.productDetails.brand}
                </CardTitle>

                <CardSubtitle className="mt-4">
                  <strong>Product Details</strong>
                </CardSubtitle>
                <CardText className="mt-1">
                  {this.state.productDetails.description}
                </CardText>
                <CardSubtitle className="mt-4">
                  <strong>Size</strong>
                </CardSubtitle>
                {sizes}
                <br></br>
                <CardSubtitle className="mt-2">
                  <strong>Price</strong>
                </CardSubtitle>
                <CardText>{this.state.productDetails.price}</CardText>
              </CardBody>
            </Card>

            <Form>
              <Card className="personal-detail">
                <h3 className="mt-2 ml-2">Personal Details</h3>

                <CardBody>
                  <FormGroup>
                    <Label>Cutomer Name</Label>
                    <Input
                      type="text"
                      name="c_name"
                      required={true}
                      placeholder="Customer Name"
                      onChange={this.changeHandler}
                      style={{ width: "500px" }}
                    />
                    <span className="text-danger">
                      {this.state.formErrors.name}
                    </span>
                  </FormGroup>
                  <FormGroup>
                    <Label>Address</Label>
                    <Input
                      onChange={this.changeHandler}
                      type="text"
                      required={true}
                      name="c_address"
                      placeholder=" Address"
                    />
                    <span className="text-danger">
                      {this.state.formErrors.address}
                    </span>
                  </FormGroup>

                  <FormGroup>
                    <Label>Phone Number</Label>
                    <Input
                      type="tel"
                      required={true}
                      onChange={this.changeHandler}
                      name="c_ph_number"
                      placeholder="Phone Number"
                      style={{ width: "500px" }}
                    />
                    <span className="text-danger">
                      {this.state.formErrors.ph_number}
                    </span>
                  </FormGroup>

                  <FormGroup>
                    <Label>Quantity</Label>
                    <Input
                      type="number"
                      defaultValue={this.state.customerDetail.quantity}
                      min="1"
                      name="quantity"
                      required={true}
                      placeholder="Quantity"
                      style={{ width: "200px" }}
                      onChange={this.changeHandler}
                    ></Input>
                  </FormGroup>

                  <FormGroup>
                    <Label>Size</Label>
                    <Input
                      style={{ width: "200px" }}
                      onChange={this.changeHandler}
                      required={true}
                      type="select"
                      name="size"
                    >
                      <option value=""></option>
                      <option value="Small">Small</option>
                      <option value="Medium">Medium</option>
                      <option value="Large">Large</option>
                      <option value="Extra Large">Extra Large</option>
                    </Input>
                    <span className="text-danger">
                      {this.state.formErrors.size}
                    </span>
                  </FormGroup>

                  <Button className="mt-5" onClick={this.handleSubmit}>
                    Submit Order
                  </Button>
                </CardBody>
              </Card>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

HomeViewProduct.propTypes = {
  user: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  products: PropTypes.object.isRequired,
  createOrder: PropTypes.func.isRequired,
  orders: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  errors: state.errors,
  products: state.products,
  orders: state.orders
});

export default connect(mapStateToProps, { createOrder })(HomeViewProduct);
