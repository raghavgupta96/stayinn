import React, { Component } from "react";
<<<<<<< HEAD
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import theme from "./theme";
import NavBar from "./features/nav/navbar/NavBar";
import { Route } from "react-router-dom";
import RegisterForm from "./features/auth/register/RegisterForm";
import LoginForm from "./features/auth/login/LoginForm";

// import "./App.css";
=======
import { Container } from 'semantic-ui-react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from './theme';
import NavBar from './features/nav/NavBar/NavBar'
import { Route, Switch } from 'react-router-dom'
import Signup from './features/auth/register/RegisterForm'
import Login from './features/auth/login/LoginForm'
import HomePage from './features/home/HomePage'
import UserDashboard from './features/user/UserDashboard'
import FilterUi from './features/filter/Filter.ui'

>>>>>>> 7750501874291861ad226b8b024723595b0b1c35

class App extends Component {
  render() {
    return (
<<<<<<< HEAD
        <div>
          <MuiThemeProvider theme={theme}>
            <NavBar theme={theme} />
          </MuiThemeProvider>
          <Route path='/register' component={RegisterForm}/>
          <Route path='/login' component={LoginForm}/>
        </div>
=======
      <MuiThemeProvider theme={theme}>
      <NavBar theme={theme}/>
      <Switch>
        {/* Adding exact to prevent home page showing when there is '/' in web address */}
        <Route exact path='/' component={HomePage}/>
      </Switch>
      <Route 
        path="/(.+)" // forward slash with everything else, searching matching route
        render={() =>(
          <div>
              <Switch>
                {/* Using switch to make sure every page load separately */}
                {/* No circumstances where two routes are supposed to load at the samet time */}
                <Route path='/signup' component={Signup}/>
                <Route path='/login' component={Login}/>
                <Route path='/userDashboard' component={UserDashboard}/>
                <Route path='/searchResult' component={FilterUi}/>
              </Switch>
          </div>   
        )}
      />
      </MuiThemeProvider>



>>>>>>> 7750501874291861ad226b8b024723595b0b1c35
    );
  }
}

export default App;