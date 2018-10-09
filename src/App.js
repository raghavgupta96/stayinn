import React, { Component } from "react";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import theme from "./theme";
import NavBar from "./features/nav/navbar/NavBar";
import { Route, Switch } from "react-router-dom";
import Signup from "./features/auth/register/RegisterForm";
import Login from "./features/auth/login/LoginForm";
import HomePage from "./features/home/HomePage";
import UserProfile from "./features/user/UserProfile";
import FilterUi from "./features/filter/Filter.ui";
import SearchBox from "./features/search/SearchBox";
import PaymentLayout from "./features/payment/PaymentLayout";

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <NavBar theme={theme} />
        <Switch>
          {/* Adding exact to prevent home page showing when there is '/' in web address */}
          <Route exact path="/" component={HomePage} />
        </Switch>
        <Route
          path="/(.+)" // forward slash with everything else, searching matching route
          render={() => (
            <div>
              <Switch>
                {/* Using switch to make sure every page load separately */}
                {/* No circumstances where two routes are supposed to load at the samet time */}
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
                <Route path="/profile" component={UserProfile} />
                <Route path="/searchResult" component={FilterUi} />
                <Route path="/payment" component={PaymentLayout} />
                <Route path="/home" component={SearchBox} />
              </Switch>
            </div>
          )}
        />
      </MuiThemeProvider>
    );
  }
}

export default App;
