import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { AppNavbarBrand, AppSidebarToggler } from "@coreui/react";


class Header extends Component {
  profileHandler = () => {
    this.props.history.push("/dashboard/profile");
  };
  //const care = "/home/drv/Downloads/care.png";
  render() {
    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        {/* <label>hi</label> */}
        <AppNavbarBrand
           full={{  width: 89, height: 25, alt: "CoreUI Logo" }}
           minimized={{  width: 30, height: 30, alt: "CoreUI Logo" }}
           onClick={() => this.props.history.push("./")}
           style={{ cursor: "pointer" }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />
        <div></div>
              {/* <img
                src={avatar}
                className="img-avatar"
                alt="admin@bootstrapmaster.com"
              /> */}
      </React.Fragment>
    );
  }
}

export default withRouter(Header);
