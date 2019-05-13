import React from "react";

import { Switch, Route, Redirect } from "react-router";

import { connect } from "react-redux";

import { history } from "./store/store";
import querystring from "query-string";
import axios from "axios";
import { Spinner } from "reactstrap";
import Library from "./components/Library";

class App extends React.Component<any> {
  componentDidUpdate(prevProps: any) {}
  render() {
    // const { user, router } = this.props;
    // const accountStatus = user.statuses.account.auth;
    // const { location } = router;
    // const path = location.pathname + location.search;
    // const query = querystring.parse(location.search);
    return (
      <div className="app align-items-stretch d-flex flex-column" style={{ minHeight: "100vh" }}>
        <Switch>
          <Route path="/" component={Library} />
          <Route path="*" component={InvalidPage} /> 
        </Switch>
      </div>
    );
  }
}

const InvalidPage = () => <Redirect to="/" />;

const mapDispatchToProps = {};
const mapStateToProps = (state: any) => ({
  user: state.user,
  router: state.router
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
