import React, { Component } from "react";
// import "./App.css";
import EventDashBoard from "./features/event/eventdashboard/EventDashboard";

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