import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import "./Auth.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FacebookLoginButton } from "react-social-login-buttons";
import { loginUser } from "../../actions/authActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";

class AppLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {
        email: "",
        password: ""
      },
      formError: {
        email: " ",
        password: " "
      }
    };

    this.login = this.login.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.isAuthenticated) {
      if (nextProps.user.user.type === "admin") {
        this.props.history.push("/dashboard");
      }
      if (nextProps.user.user.type === "simpleUser") {
        this.props.history.push("/home");
      }
    }
    if (this.props.user.user.type === "simpleUser") {
      console.log("simpleUser");
    }
    if (nextProps.errors) {
      if (nextProps.errors.errors === "Request failed with status code 404") {
        this.setState({
          errors: { ...this.state.errors, email: "Email does not exist." }
        });
      } else if (
        nextProps.errors.errors === "Request failed with status code 401"
      ) {
        this.setState({
          errors: { ...this.state.errors, password: "Password is incorrect." }
        });
      }
    }
  }

  componentDidMount() {
    if (this.props.user.isAuthenticated) {
      if (this.props.user.user.type === "admin") {
        this.props.history.push("/dashboard");
      }
      if (this.props.user.user.type === "simpleUser") {
        this.props.history.push("/home");
      }
    }
  }

  login(e) {
    e.preventDefault();
    const { email, password } = this.state;
    if (!email) {
      this.setState({
        formError: {
          ...this.state.formError,
          email: "Email is required."
        }
      });
    } else if (!password) {
      this.setState({
        formError: {
          ...this.state.formError,

          password: "Password is required."
        }
      });
    } else {
      this.setState({
        formError: {
          ...this.state.formError,
          email: undefined,
          password: undefined
        }
      });
      const userData = {
        email: this.state.email,
        password: this.state.password
      };
      this.props.loginUser(userData, this.props.history);
    }
  }
  changeHandlerPass = e => {
    this.setState({ password: e.target.value });
  };
  changeHandlerEmail = e => {
    this.setState({ email: e.target.value });
  };

  render() {
    const errors = this.state.errors;
    return (
      <Form className="login-form">
        <h1>
          <span className="font-weight-bold text-center ">Login</span>
        </h1>
        <br></br>
        <h2 className="text-center ">Welcome</h2>
        <br></br>
        <span className="text-danger">{errors.error}</span>
        <FormGroup>
          <Label>Email</Label>
          <Input
            onChange={this.changeHandlerEmail}
            type="email"
            required={true}
            placeholder="Email"
            error={this.state.errors.email}
            className={classnames("", {
              invalid: errors.email || errors.emailnotfound
            })}
          ></Input>

          <span className="text-danger">{this.state.formError.email}</span>

          <span className="text-danger">{errors.email}</span>
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input
            onChange={this.changeHandlerPass}
            type="password"
            required={true}
            placeholder="Password"
            error={this.state.errors.password}
            className={classnames("", {
              invalid: errors.password || errors.passwordincorrect
            })}
          ></Input>
          <span className="text-danger">{errors.password}</span>
          <span className="text-danger">{this.state.formError.password}</span>
        </FormGroup>

        <Button
          onClick={this.login}
          type="submit"
          className="btn-lg btn-info btn-block"
        >
          Login
        </Button>
        <Button className="btn-lg btn-danger btn-block" href="/signup">
          Sign Up
        </Button>

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

AppLogin.propTypes = {
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

export const mapStateToProps = state => ({
  user: state.user,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(AppLogin);
