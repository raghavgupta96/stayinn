import React, { Component } from "react";
import "./App.css";
import EventDashBoard from "./features/event/eventdashboard/EventDashboard";

class App extends Component {
  render() {
    return (
      <div>
        <EventDashBoard />
      </div>
    );
  }
}

export default App;