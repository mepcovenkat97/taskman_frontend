import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from "./components/Dashboard/dashboard"
import Login from './components/Login/login';
import Nav from './components/Nav/nav'

function App() {
  return (
    <div className="container-fluid">
      {/* <Nav /> */}
      <Switch>
      {/* <Route exact path="/" component={Home} />
      <Route exact path="/products" component={Products} />
      <PrivateRoute exact path="/products/new" component={ProductForm} />
      <Route exact path="/products/:id" component={ProductDetail} />
      <PrivateRoute path="/products/:id/edit" component={ProductForm} />
      <PrivateRoute admin="true" path="/users" component={Users} />*/}
      <Route path="/" component={Dashboard} /> 
      <Route exact path="/login" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
