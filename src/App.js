import React, { Component } from "react";
// import "./App.css";
import EventDashBoard from "./features/event/eventdashboard/EventDashboard";
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from './theme';
import NavBar from './features/nav/Navbar/NavBar'

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
      <NavBar theme={theme}/>
      </MuiThemeProvider>
    )
  }
}

export default App;