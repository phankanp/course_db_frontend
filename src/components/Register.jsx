import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { register } from "../services/authService";
import auth from "../services/authService";

class Register extends Form {
  state = {
    data: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
    errors: {}
  };

  schema = {
    firstName: Joi.string()
      .min(3)
      .max(50)
      .required()
      .label("First Name"),
    lastName: Joi.string()
      .min(3)
      .max(50)
      .required()
      .label("Last Name"),
    email: Joi.string()
      .max(40)
      .email({ minDomainAtoms: 2 })
      .label("Email"),
    password: Joi.string()
      .min(6)
      .max(60)
      .required()
      .label("Password"),
    confirmPassword: Joi.string()
      .min(6)
      .max(60)
      .valid(Joi.ref("password"))
      .required()
      .options({ language: { any: { allowOnly: "must match Password" } } })
      .label("Confirm Password")
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;

      await register(
        data.firstName,
        data.lastName,
        data.email,
        data.password,
        data.confirmPassword
      );

      await auth.login(data.email, data.password);

      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }

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
          Register
        </h2>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("firstName", "text", "First Name")}
          {this.renderInput("lastName", "text", "Last Name")}
          {this.renderInput("email", "email", "Email")}
          {this.renderInput("password", "password", "Enter a password")}
          {this.renderInput("confirmPassword", "password", "Confirm password")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default Register;
