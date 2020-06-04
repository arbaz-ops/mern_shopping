import React, { Component } from "react";
import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
  Container,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown
} from "reactstrap";

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    return (
      <div>
        <Navbar
          color="light"
          light
          style={{
            position: "fixed",
            width: "220px",
            border: "1px solid #c0c0c0",
            top: "56px",
            borderTop: "white",
            height: "865px",
            borderBottom: "white",
            zIndex: "9"
          }}
        >
          <Container>
            <Nav navbar style={{ top: "20px", position: "absolute" }}>
              <NavItem className=" ml-5 mt-3 ">
                <NavLink href="/dashboard" className="text-dark">
                  Dashboard
                </NavLink>
              </NavItem>

              <UncontrolledDropdown className=" mt-3" nav inNavbar>
                <DropdownToggle className="ml-5  text-dark" nav caret>
                  Products
                </DropdownToggle>

                <DropdownMenu right style={{ border: "1px solid #c0c0c0" }}>
                  <DropdownItem href="/dashboard/products/add_products">
                    Add Products
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem href="/dashboard/products/list_products">
                    View Products
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

              <UncontrolledDropdown className=" mt-3" nav inNavbar>
                <DropdownToggle className="ml-5  text-dark" nav caret>
                  Orders
                </DropdownToggle>

                <DropdownMenu
                  right
                  style={{
                    border: "1px solid #c0c0c0"
                  }}
                >
                  <DropdownItem href="/dashboard/orders/view_orders">
                    View Orders
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem className="ml-5 mt-3 " style={{ top: "30px" }}>
                <NavLink className="text-dark" href="/dashboard">
                  About
                </NavLink>
              </NavItem>
            </Nav>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default SideBar;
