import React, { Component } from "react";
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


class App extends Component {
  render() {
    return (
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



    );
  }
}

export default App;