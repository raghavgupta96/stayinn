import React, { Component } from "react";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import theme from "./theme";
import NavBar from "./features/nav/navbar/NavBar";
import { Route } from "react-router-dom";
import RegisterForm from "./features/auth/register/RegisterForm";
import LoginForm from "./features/loginform/LoginForm";

// import "./App.css";

class App extends Component {
  render() {
    return (
        <div>
          <MuiThemeProvider theme={theme}>
            <NavBar theme={theme} />
          </MuiThemeProvider>
          <Route path='/register' component={RegisterForm}/>
          <Route path='/login' component={LoginForm}/>
        </div>
    );
  }
}

export default App;