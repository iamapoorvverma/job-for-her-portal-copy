import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import RegisterUser from "./components/auth/RegisterUser";
import LoginUser from "./components/auth/LoginUser";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import DashboardOrg from "./components/dashboard/DashboardOrg";
import Joblisting from "./components/joblisting/Joblisting";
import OrgjobListing from "./components/joblisting/Orgjoblisting";

import "./App.css";
import RegisterOrg from "./components/auth/RegisterOrg";
import LoginOrg from "./components/auth/LoginOrg";

const App = () => {
  useEffect(() => {
    // Check for token to keep user logged in
    if (localStorage.jwtToken) {
      // Set auth token header auth
      const token = localStorage.jwtToken;
      setAuthToken(token);
      // Decode token and get user info and exp
      const decoded = jwt_decode(token);
      // Set user and isAuthenticated
      store.dispatch(setCurrentUser(decoded));
      // Check for expired token
      const currentTime = Date.now() / 1000; // to get in milliseconds
      if (decoded.exp < currentTime) {
        // Logout user
        store.dispatch(logoutUser());
        // Redirect to login
        window.location.href = "./login";
      }
    }
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <Provider store={store}>
      <Router>
        <React.Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <Route exact path="/registeruser" component={RegisterUser} />
          <Route exact path="/loginuser" component={LoginUser} />
          <Route exact path="/registerorg" component={RegisterOrg} />
          <Route exact path="/loginorg" component={LoginOrg} />
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/dashboardorg" component={DashboardOrg} />
            <PrivateRoute exact path="/listings" component={Joblisting} />
            <PrivateRoute exact path="/openings" component={OrgjobListing} />
          </Switch>
        </React.Fragment>
      </Router>
    </Provider>
  );
};

export default App;
