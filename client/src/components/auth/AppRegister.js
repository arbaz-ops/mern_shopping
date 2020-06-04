import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import "./Auth.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FacebookLoginButton } from "react-social-login-buttons";
import { Link, withRouter } from "react-router-dom";
import { registerUser } from "../../actions/authActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";

class AppRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      password2: "",
      type: "",
      errors: {
        email: " ",
        password: " "
      },
      formError: {
        email: " ",
        password: " ",
        password2: " ",
        passdoesnotmatch: " ",
        type: ""
      }
    };
    this.signUp = this.signUp.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      if (nextProps.errors.errors === "Request failed with status code 409") {
        this.setState({
          errors: { ...this.state.errors, email: "Email already exist." }
        });
      }
      console.log(nextProps.errors.errors);
    }
  }

  componentDidMount() {
    if (this.props.user.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  signUp(e) {
    e.preventDefault();
    const { email, password, type } = this.state;
    if (!email) {
      this.setState({
        formError: { ...this.state.formError, email: "Email is required." }
      });
    } else if (!password) {
      this.setState({
        formError: {
          ...this.state.formError,
          password: "Password is required."
        }
      });
    } else if (!type) {
      this.setState({
        formError: { ...this.state.formError, type: "Please select user type." }
      });
    } else {
      this.setState({
        formError: {
          ...this.state.formError,
          email: undefined,
          password: undefined,
          type: undefined
        }
      });
      const newUser = {
        email: this.state.email,
        password: this.state.password,
        type: this.state.type
      };
      this.props.registerUser(newUser, this.props.history);
    }
  }

  changeHandlerPass = e => {
    this.setState({ password: e.target.value });
  };
  changeHandlerEmail = e => {
    this.setState({ email: e.target.value });
  };

  handleChange = e => {
    this.setState({
      type: e.target.value
    });
  };

  render() {
    const errors = this.state.errors;

    return (
      <Form className="login-form">
        <h1>
          <span className="font-weight-bold text-center ">Sign Up</span>
        </h1>
        <br></br>
        <br></br>
        <FormGroup>
          <Label>Email</Label>
          <Input
            onChange={this.changeHandlerEmail}
            type="email"
            placeholder="Email"
            error={errors.email}
            className={classnames("", {
              invalid: errors.email
            })}
          ></Input>
          <span className="text-danger">{errors.email}</span>
          <span className="text-danger">{this.state.formError.email}</span>
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input
            onChange={this.changeHandlerPass}
            type="password"
            placeholder="Password"
            error={errors.password}
            className={classnames("", {
              invalid: errors.password
            })}
          ></Input>
          <span className="red-text">{errors.password}</span>
          <span className="text-danger">{this.state.formError.password}</span>
        </FormGroup>

        <FormGroup>
          <Label>User type:</Label>
          <ul>
            <li>
              <Label>
                <Input
                  type="radio"
                  value="simpleUser"
                  checked={this.state.type === "simpleUser"}
                  onChange={this.handleChange}
                ></Input>
                Simple User
              </Label>
            </li>
            <li>
              <Label>
                <Input
                  type="radio"
                  value="admin"
                  checked={this.state.type === "admin"}
                  onChange={this.handleChange}
                ></Input>
                Admin
              </Label>
            </li>
            <span className="text-danger">{this.state.formError.type}</span>
          </ul>
        </FormGroup>

        <Button
          className="btn-lg btn-danger btn-block"
          onClick={this.signUp}
          href="/signup"
        >
          Sign Up
        </Button>
        <br></br>
        <p className="grey-text text-darken-1 text-center">
          Already have an account? <Link to="/">Log in</Link>
        </p>

        <div className="text-center pt-3">
          Or continue with your social account
        </div>
        <FacebookLoginButton></FacebookLoginButton>
        <br></br>
        <br></br>
        <br></br>
      </Form>
    );
  }
}

AppRegister.propTypes = {
  registerUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStatetoProps = state => ({
  user: state.user,
  errors: state.errors
});

export default connect(mapStatetoProps, { registerUser })(
  withRouter(AppRegister)
);
