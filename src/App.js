import React from "react";
import { Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import "./App.scss";

import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

import { getUser } from "./apis/storage";


import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import UserDashboard from "./components/Dashboard/UserDashboard";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  
  }

  render() {
    return (
        <div className="App">
          <Switch>
            <Route path="/forgotpassword" component={ForgotPassword} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/userdashboard" component={UserDashboard} />
            {["/", "/login"].map((path, index) => (
              <Route path={path} component={Login} key={index} />
            ))}
          </Switch>
        </div>
    );
  }
}
