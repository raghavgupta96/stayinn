import React, { Component } from 'react';
import NavBar from './features/nav/NavBar/NavBar';
import LoginForm from './features/LoginForm/LoginForm';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <LoginForm/>
      </div>
    )
  }
}

export default App;
