import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

//import auth from '../api/auth';
//import { clearAuthInfo } from '../actions/auth';

export default class AuthNav extends Component {
   // handleLogoutClick = () => {
   //   const { history, clearAuthInfo } = this.props;
 
   //   auth.signout();
   //   clearAuthInfo();
 
   //   history.push('/');
   // }
 
   render() {
     const { isAuthenticated, user } = this.props;
     return (
       <ul className="navbar-nav flex-row ml-md-auto d-none d-md-flex">
         {isAuthenticated ? (
           <li className="nav-item">
             <span className="badge badge-info mr-2">User: {user.name}</span>
             <button type="button"
               className="btn btn-sm btn-outline-light"
               onClick={this.handleLogoutClick}
             >Logout</button>
           </li>
         ) : (
             <React.Fragment>
               <li className="nav-item">
                 <NavLink activeClassName="active" to="/login" className="nav-link">Login</NavLink>
               </li>
             </React.Fragment>
           )}
       </ul>
     );
   }
 }