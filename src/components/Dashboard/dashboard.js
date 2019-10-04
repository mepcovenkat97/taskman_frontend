import React, { Component, Suspense } from "react";
import { Container } from "reactstrap";
import Header from "./header";
import { Switch, Route, Redirect } from "react-router-dom";
import * as router from "react-router-dom";

import {
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav2 as AppSidebarNav
} from "@coreui/react";

import routes from "../../routes";
import navigation from "../../_nav"

export default class Dashboard extends Component {
  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  signOut(e) {
    e.preventDefault();
    this.props.logoutAction();
    console.log("Log Out");
    this.props.history.push("/login");
  }

  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <Header onLogout={e => this.signOut(e)} />
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
              <AppSidebarNav
                navConfig={navigation}
                {...this.props}
                router={router}
              />
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => <route.component {...props} />}
                      />
                    ) : (
                      console.log("None")
                    );
                  })}
                  {/* <Redirect from="/" to="/dashboard" /> */}
                </Switch>
              </Suspense>
            </Container>
          </main>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <React.Fragment>
              <span>&copy; 2019 creativeLabs.</span>
              <span className="ml-auto">
                Powered by{" "}
                <a href="https://techzillaindia.com">
                  Techzilla India Infotech
                </a>
              </span>
            </React.Fragment>
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

