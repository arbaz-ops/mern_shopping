import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Container,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavItem,
  NavLink
} from "reactstrap";
import { logoutUser } from "../../actions/authActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class AppNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.userlogout = this.userlogout.bind(this);
  }

  toggleCollapse = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  userlogout = e => {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  };

  render() {
    return (
      <div>
        <Navbar
          color="light"
          light
          expand="sm"
          style={
            this.props.user.user.type === "admin"
              ? {
                  borderBottom: "1px solid #c0c0c0",
                  borderRadius: "1px",
                  position: "fixed",
                  zIndex: "9",
                  width: "100%"
                }
              : {
                  borderBottom: "1px solid #c0c0c0",
                  borderRadius: "30px",
                  position: "fixed",
                  zIndex: "9",
                  width: "100%"
                }
          }
        >
          <Container>
            <NavbarBrand
              style={{ position: "absolute", left: "37px" }}
              href={
                this.props.user.user.type === "admin" ? "/dashboard" : "/home"
              }
              className="ml-4 text-dark"
            >
              <strong>{"< MERN SHOPPING />"}</strong>
            </NavbarBrand>
            <NavbarToggler onClick={this.toggleCollapse}></NavbarToggler>
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                {this.props.user.user.type === "simpleUser" ? (
                  <NavItem>
                    <NavLink href="/home" className="mr-5">
                      Home
                    </NavLink>
                  </NavItem>
                ) : null}
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle className="mr-5 " nav caret>
                    Profile
                  </DropdownToggle>

                  <DropdownMenu right style={{ border: "1px solid #c0c0c0" }}>
                    <DropdownItem>Your Profile</DropdownItem>
                    <DropdownItem>Settings</DropdownItem>
                    <DropdownItem divider></DropdownItem>
                    <DropdownItem onClick={this.userlogout}>
                      Logout
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

AppNav.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, { logoutUser })(AppNav);
