import React, { Component } from "react";
import {
  Card,
  CardTitle,
  CardText,
  Badge,
  CardBody,
  Table,
  Fade
} from "reactstrap";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";
import PropTypes from "prop-types";
import AppNav from "../../layout/AppNav";
import "react-circular-progressbar/dist/styles.css";

import PieChart from "../../charts/PieChart";
import SideBar from "../../layout/SideBar";
import AppFooter from "../../layout/AppFooter";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeIn: true
    };
  }

  componentDidMount() {
    if (this.props.user.isAuthenticated) {
      if (this.props.user.user.type === "admin") {
        this.props.history.push("/dashboard");
      } else {
        this.props.history.push("/home");
      }
    } else {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <div>
        <AppNav></AppNav>
        <SideBar></SideBar>
        <AppFooter></AppFooter>
        <Fade in={this.state.fadeIn}>
          <Card
            body
            inverse
            style={{
              backgroundColor: "#333",
              borderColor: "#333",
              width: "350px",
              top: "100px",
              left: "300px",
              position: "absolute",
              height: "339px"
            }}
          >
            <CardTitle>
              Today's News
              <Badge color="secondary" pill className="ml-5">
                New
              </Badge>
            </CardTitle>
            <CardText>
              With supporting text below as a natural lead-in to additional
              content.
            </CardText>
          </Card>
        </Fade>
        <Fade in={this.state.fadeIn}>
          <Card
            body
            inverse
            style={{
              backgroundColor: "white",
              width: "500px",
              left: "685px",
              top: "100px",
              position: "absolute",
              border: "1px solid #c0c0c0"
            }}
          >
            <CardTitle className="text-dark">Pie Chart</CardTitle>
            <CardBody>
              <PieChart></PieChart>
            </CardBody>
          </Card>
        </Fade>

        <Fade in={true}>
          <Card
            body
            className="text-center"
            style={{
              position: "absolute",
              top: "450px",
              left: "550px",
              height: "300px",
              width: "600px",
              border: "1px solid #c0c0c0"
            }}
          >
            <CardTitle>Table</CardTitle>
            <CardBody>
              <Table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>User Name</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
            <CardText></CardText>
          </Card>
        </Fade>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);
