import React, { Component } from "react";
// import "./App.css";
import EventDashBoard from "./features/event/eventdashboard/EventDashboard";
import { MuiThemeProvider, createMuiTheme }from '@material-ui/core/styles';
import NavBar from "./features/nav/navbar/NavBar";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#409be6'
    },
  secondary: {
      main: '#35495d'
    },
  }
})

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
      <NavBar color="primary"/>
      </MuiThemeProvider>
    )
  }
}

export default App;