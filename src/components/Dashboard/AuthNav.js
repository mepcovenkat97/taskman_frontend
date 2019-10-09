import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteUser } from "../../apis/storage";
import auth from '../../apis/auth';


export default class AuthNav extends Component {

  render() {
    // const { isAuthenticated, user } = this.props;
    return (
      <ul className="navbar-nav flex-row ml-md-auto d-none d-md-flex">
          <li className="nav-item">
            <span className="badge badge-info mr-2">User</span>
            <button type="button"
              className="btn btn-sm btn-outline-light"
              onClick={e => this.props.onLogout(e)}
            >Logout</button>
          </li>
        
      </ul>
    );
  }
}

