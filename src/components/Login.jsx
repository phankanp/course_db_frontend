import React from "react";
import Joi from "joi-browser";
import { login } from "../services/authService";
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
    const { data } = this.state;
    await login(data.email, data.password);

    console.log("submitted");
  };

  render() {
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
