import React from "react";
import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
import auth from "../services/authService";
import Form from "./common/form";

class Login extends Form {
  state = {
    data: {
      email: "",
      password: ""
    },
    errors: {}
  };

  schema = {
    email: Joi.string()
      .email({ minDomainAtoms: 2 })
      .label("Email"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;

      await auth.login(data.email, data.password);

      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        console.log(ex.response);
        const errors = { ...this.state.errors };
        errors.email = ex.response.data.email;
        errors.password = ex.response.data.password;
        this.setState({ errors });
      }
    }

    console.log("submitted");
  };

  render() {
    if (auth.getCurrentUser()) {
      return <Redirect to="/" />;
    }

    return (
      <div
        className="container"
        style={{
          width: "300px",
          max: "100%",
          margin: "50px auto",
          paddingTop: "150px"
        }}
      >
        <h2 className="text-center" style={{ paddingBottom: "10px" }}>
          Login
        </h2>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "email", "Username")}
          {this.renderInput("password", "password", "Enter your password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default Login;
