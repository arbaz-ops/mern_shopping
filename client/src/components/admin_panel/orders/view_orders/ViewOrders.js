import React, { Component } from "react";
import AppNav from "../../../layout/AppNav";
import SideBar from "../../../layout/SideBar";
import AppFooter from "../../../layout/AppFooter";
import "./ViewOrder.css";
import { Fade, Card, CardTitle, CardBody, Table, CardText } from "reactstrap";

class ViewOrders extends Component {
  render() {
    return (
      <div>
        <AppNav></AppNav>
        <SideBar></SideBar>
        <AppFooter></AppFooter>
        <div className="view-orders">
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
              <CardTitle>Orders List</CardTitle>

              <CardBody>
                <Table>
                  <thead style={{ backgroundColor: "1px solid #c0c0c0" }}>
                    <tr>
                      <th>#</th>
                      <th>Customer Name</th>
                      <th>Customer Ph.</th>
                      <th>Customer Address</th>
                      <th>Product Size</th>
                      <th>Product Image</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody></tbody>
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

export default ViewOrders;
