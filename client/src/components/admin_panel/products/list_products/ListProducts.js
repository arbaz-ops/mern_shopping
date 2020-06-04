import React, { Component } from "react";
import AppNav from "../../../layout/AppNav";
import SideBar from "../../../layout/SideBar";
import AppFooter from "../../../layout/AppFooter";
import {
  Fade,
  Card,
  CardTitle,
  CardBody,
  Table,
  CardText,
  Button
} from "reactstrap";
import { connect } from "react-redux";
import { getProductsList } from "../../../../actions/productActions";
import PropTypes from "prop-types";
import { FiEdit, FiTrash } from "react-icons/fi";
import { getProduct } from "../../../../actions/productActions";
import Axios from "axios";

class ListProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formMessage: "",

      products: [],
      requests: {}
    };
  }

  componentDidMount() {
    if (this.props.user.isAuthenticated) {
      if (this.props.user.user.type === "admin") {
        this.props.getProductsList();
        this.props.history.push("/dashboard/products/list_products");
        if (this.props.products.productsList) {
          const productsArray = this.props.products.productsList.products;
          this.setState({
            products: productsArray,
            formMessage: this.props.products.productsList.message,
            counts: this.props.products.productsList.counts
          });
        }
      } else {
        this.props.history.push("/home");
      }
    } else {
      this.props.history.push("/");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.products.productsList) {
      const productsArray = nextProps.products.productsList.products;
      this.setState({
        products: productsArray,
        formMessage: nextProps.products.productsList.message,
        counts: nextProps.products.productsList.counts
      });
    }
  }

  getProduct(request) {
    this.props.getProduct(request, this.props.history);
  }

  delProduct = request => {
    Axios.delete(request).then(window.location.reload());
  };

  render() {
    let i = 0;
    let message = "";

    if (this.state.products.length === 0) {
      message = <span className="text-danger">No Records Found!</span>;
    } else {
      message = (
        <span className="text-success" style={{ position: "absolute" }}>
          {this.state.formMessage} <br></br>
          Total Records: {this.state.products.length}
        </span>
      );
    }

    const products = this.state.products.map((product, index) => {
      return (
        <tr key={index}>
          <th scope="row">{(i = i + 1)}</th>
          <td>{product.name}</td>
          <td>
            <div>{product.brand}</div>
          </td>
          <td style={{ width: "100px" }}>{product.price}</td>
          <td>
            {product.size.map((size, index) => {
              return <div key={index}>{size}</div>;
            })}
          </td>
          <td style={{ width: "10px" }}>{product.productImage}</td>

          <td>
            <Button
              color="info"
              className="mr-1"
              onClick={() => this.getProduct(product.request)}
              style={{
                position: "relative",
                width: "40px",
                outlineColor: "none"
              }}
            >
              <FiEdit className="mr-4 text-center"></FiEdit>
            </Button>
            <br></br>

            <Button
              className="mr-1 mt-1"
              color="danger"
              onClick={() => this.delProduct(product.request.url)}
              style={{ position: "relative", width: "40px" }}
            >
              <FiTrash></FiTrash>
            </Button>
          </td>
        </tr>
      );
    });

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
          <Fade in={true}>
            <Card
              body
              className="text-center"
              style={{
                position: "absolute",
                top: "15px",
                left: "15px",
                height: "auto",
                maxHeight: "860px",
                width: "auto",
                maxWidth: "950px",
                border: "1px solid #c0c0c0",
                overflowY: "scroll",
                overflowX: "scroll"
              }}
            >
              <CardTitle>Products List</CardTitle>
              {message}

              <CardBody>
                <Table>
                  <thead style={{ backgroundColor: "1px solid #c0c0c0" }}>
                    <tr>
                      <th>#</th>
                      <th>Product Name</th>
                      <th>Product Brand</th>
                      <th>Product Price</th>
                      <th>Product Size</th>
                      <th>Product Image</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>{products}</tbody>
                </Table>
              </CardBody>
              <CardText></CardText>
            </Card>
          </Fade>
        </div>
      </div>
    );
  }
}

ListProducts.propTypes = {
  getProductsList: PropTypes.func.isRequired,
  products: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  products: state.products,
  errors: state.errors
});

export default connect(mapStateToProps, { getProductsList, getProduct })(
  ListProducts
);
