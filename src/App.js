import React, { Component } from "react";
import { Container } from 'semantic-ui-react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from './theme';
import NavBar from './features/nav/NavBar/NavBar'
import { Route, Switch } from 'react-router-dom'
import Signup from './features/auth/register/RegisterForm'
import Login from './features/auth/login/LoginForm'


class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
      <NavBar theme={theme}/>
      <Route 
        path="/(.+)" // forward slash with everything else, searching matching route
        render={() =>(
          <div>
              <Switch>
                {/* Using switch to make sure every page load separately */}
                {/* No circumstances where two routes are supposed to load at the samet time */}
                <Route path='/signup' component={Signup}/>
                <Route path='/login' component={Login}/>
              </Switch>
          </div>   
        )}
      />
      {/* <Switch>
        <Route path='/signup' component={Signup}/>
      </Switch> */}
      </MuiThemeProvider>



    );
  }
}

export default App;