import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

import AuthNav from './AuthNav';
import { deleteUser, getUser } from '../../apis/storage';

export default class UserNav extends Component {

  signOut(e){
    e.preventDefault();
    deleteUser();
    this.props.history.push('/login')
  }
  render() {
    const user = getUser();
    return (
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand mb-0 h1" to="/userdashboard">Task-MAN</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          
          <AuthNav
            user = {user.user.name}
           onLogout={e=>this.signOut(e)}/>
        </div>
      </nav>
    );
  }
}