import React, { Component } from "react";
import "./Login.css";
import { withRouter, Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { loginAction } from "../../actions/authActions";

import auth from "../../apis/auth";
import { saveUser } from "../../apis/storage";

export default class Login extends Component {
  state = {
    email: "",
    password: "",
    logged: false
  };

  componentDidMount() {
    const logged = localStorage.getItem("vodToken");
    this.setState({ logged });
  }

  onChangeHandler = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  onLoginHandler = async event => {
    event.preventDefault();

    const credentials = {
      email: this.state.email,
      password: this.state.password
    };
    try {
      await auth.authenticate(credentials);
      const { user, token } = auth;
      console.log("Inside Login ")
      console.log(auth)
      //this.props.loginAction(user, token);
      saveUser(user,token)
      console.log(user.type);
      if(user.type === 'admin')
      {
        this.props.history.push("/dashboard");
      }
      if(user.type === 'user')
      {
        this.props.history.push('/userdashboard');
      }
      auth.isAuth = false;
    } catch (e) {
      alert("Login Failed:", e.message);
    }

    // console.log(auth.isAuth);
    // if (!auth.isAuth) {
    //   alert("Invalid Credentials");
    //   return;
    // }
    // console.log("abc");

    // console.log(this.props.history);
  };

  forgotPasswordHandler = () => {
    console.log(this.props.history);
    this.props.history.push("/forgotpassword");
  };

  render() {
    let showLogin = null;
    if (!this.state.logged) {
      showLogin = (
        <div className="login-container">
          <form>
            <h1>Sign in</h1>
            <div className="form-content">
              <input
                id="email"
                placeholder="Email ID"
                type="text"
                value={this.state.email}
                onChange={this.onChangeHandler}
              />
              <input
                id="password"
                placeholder="Password"
                type="password"
                value={this.state.password}
                onChange={this.onChangeHandler}
              />
              <br />
              <button onClick={this.onLoginHandler} className="button">
                Log in
              </button>
              <br />
              <div className="signup-message">
                <br />
                <p
                  // onClick={() => this.props.history.push("/forgot-password")}
                  onClick={this.forgotPasswordHandler}
                  className="link"
                >
                  Forgot your password?
                </p>
              </div>
            </div>
          </form>
        </div>
      );
    } else {
      showLogin = <Redirect to="/dashboard" />;
    }
    return <div className="app flex-row align-items-center">{showLogin}</div>;
  }
}

// export default connect(
//   null,
//   { loginAction }
// )(Login);
