import React, { Component } from "react";

import "./ForgotPassword.css";

export default class ForgotPassword extends Component {
  state = {
    email: "",
    password: "",
    confirmPassword: "",
    validEmail: false,
    validPassword: false
  };
  onChangeHandler = event => {
    this.setState({ [event.target.id]: event.target.value });
  };
  validateEmailHandler = event => {
    event.preventDefault();
    if (this.state.email === "admin@example.com") {
      this.setState({ validEmail: true, email: "" });
    } else {
      alert("Enter email used for registeration");
    }
  };
  validatePasswordHandler = event => {
    event.preventDefault();
    if (this.state.password === this.state.confirmPassword) {
      this.setState({ validPassword: true });
    } else {
      alert("Passwords do not match");
    }
  };
  renderRequestEmail = () => (
    <form>
      <h2>Enter your registered Email ID</h2>
      <div className="form-content">
        <input
          id="email"
          placeholder="Email"
          type="email"
          value={this.state.email}
          onChange={this.onChangeHandler}
        />
        <button onClick={this.validateEmailHandler} className="button">
          Validate Email
        </button>
        <br />
      </div>
    </form>
  );

  renderChangePasswordForm = () => (
    <form className="password-container">
      <h2>Change Password</h2>
      <div className="form-content">
        <input
          id="password"
          placeholder="Password"
          type="password"
          value={this.state.password}
          onChange={this.onChangeHandler}
        />
        <input
          id="confirmPassword"
          placeholder="Confirm Password"
          type="password"
          value={this.state.confirmPassword}
          onChange={this.onChangeHandler}
        />
        <button onClick={this.validatePasswordHandler} className="button green">
          Change Password
        </button>
        <button
          onClick={() => this.props.history.push("/login")}
          className="button yellow"
        >
          Cancel{" "}
        </button>
        <br />
      </div>
    </form>
  );

  renderSuccessForm = () => (
    <form>
      <h2>Change Password</h2>
      <div className="form-content">
        <label>Password Changed Successfully!</label>
        <button
          onClick={() => this.props.history.push("/login")}
          className="button"
        >
          Back to Login
        </button>
        <br />
      </div>
    </form>
  );

  render() {
    return (
      <div className="forgot-container">
        {!this.state.validEmail
          ? this.renderRequestEmail()
          : !this.state.validPassword
          ? this.renderChangePasswordForm()
          : this.renderSuccessForm()}
      </div>
    );
  }
}
