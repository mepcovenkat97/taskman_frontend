import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { AppNavbarBrand, AppSidebarToggler } from "@coreui/react";
import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav
} from "reactstrap";

import logo from "../../assets/img/brand/logo.svg";
import sygnet from "../../assets/img/brand/sygnet.svg";
import avatar from "../../assets/img/avatar/lion.jpg";

export default class Header extends Component {
  profileHandler = () => {
    this.props.history.push("/dashboard/profile");
  };
  //const care = "/home/drv/Downloads/care.png";
  render() {
    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 89, height: 25, alt: "CoreUI Logo" }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: "CoreUI Logo" }}
          onClick={() => this.props.history.push("./")}
          style={{ cursor: "pointer" }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />
        <div></div>
        <Nav className="ml-auto" navbar>
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <img
                src={avatar}
                className="img-avatar"
                alt="admin@bootstrapmaster.com"
              />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem header tag="div" className="text-center">
                <strong>Settings</strong>
              </DropdownItem>
              <DropdownItem onClick={e => this.props.onLogout(e)}>
                <i className="fa fa-lock"></i> Logout
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </React.Fragment>
    );
  }
}

//export default withRouter(Header);
