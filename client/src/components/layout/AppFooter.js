import React, { Component } from "react";
import { Card, CardTitle, CardBody } from "reactstrap";

class AppFooter extends Component {
  render() {
    return (
      <div>
        <Card
          body
          inverse
          color="dark"
          style={{
            top: "970px",
            position: "absolute",
            width: "87%",
            left: "13%",
            borderRadius: "0px",
            resize: "horizontal",

            zIndex: "1"
          }}
        >
          <CardTitle className="text-center">
            <strong>Contact Info</strong>
          </CardTitle>
          <CardBody className="text-center">
            With supporting text below as a natural lead-in to additional
            content.
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default AppFooter;
