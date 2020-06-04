import React, { Component } from "react";
import AppNav from "../../layout/AppNav";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./Home.css";
import Axios from "axios";
import {
  getProductsList,
  getProductHome
} from "../../../actions/productActions";

import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from "reactstrap";

class AppHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productsList: [],
      image: []
    };
  }

  componentDidMount() {
    if (this.props.user.isAuthenticated) {
      if (this.props.user.user.type === "simpleUser") {
        this.props.history.push("/home");
        this.props.getProductsList();
        this.props.products.productsList.products.map(product => {
          this.getProdImage(product.productImage);
        });
      } else {
        this.props.history.push("/dashboard");
      }
    }
  }

  componentWillReceiveProps(props) {
    if (props.products.productsList) {
      if (props.products.productsList.products) {
        this.setState({
          productsList: props.products.productsList.products
        });
      }
    }
  }
  getProdImage = url => {
    Axios.get(`http://localhost:5000/${url}`, {
      responseType: "arraybuffer"
    }).then(response => {
      const base64 = btoa(
        new Uint8Array(response.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      this.state.image.push("data:;base64," + base64);
    });
  };

  getSingleProduct = requesturl => {
    this.props.getProductHome(requesturl, this.props.history);
  };

  render() {
    const products = this.state.productsList.map(product => {
      return (
        <div key={product._id} className="products ml-4  d-inline-flex p-1">
          <Card>
            <CardImg style={{ width: "340px", height: "200px" }}></CardImg>
            <CardBody>
              <CardTitle>
                <strong>{product.name}</strong>
              </CardTitle>
              <CardSubtitle>
                <strong>Brand:</strong>
              </CardSubtitle>
              {product.brand}
              <br></br>
              <CardSubtitle className="mt-1">
                <strong>Description:</strong>
              </CardSubtitle>
              <CardText>{product.description}</CardText>
              <CardSubtitle className="mt-1">
                <strong>Size:</strong>
              </CardSubtitle>

              {product.size.map((result, index) => {
                return (
                  <div key={index}>
                    <CardText>{result}</CardText>
                  </div>
                );
              })}

              <Button
                className="mt-2"
                onClick={() => this.getSingleProduct(product.request.url)}
              >
                View Product
              </Button>
            </CardBody>
          </Card>
        </div>
      );
    });
    return (
      <div>
        <AppNav></AppNav>
        <div className="home-content">{products}</div>
      </div>
    );
  }
}

AppHome.propTypes = {
  user: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  products: PropTypes.object.isRequired,
  getProductsList: PropTypes.func.isRequired,
  getProductHome: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  errors: state.errors,
  products: state.products
});

export default connect(mapStateToProps, { getProductsList, getProductHome })(
  AppHome
);
