import React, { Component } from 'react';
import NavBar from '../src/features/nav/NavBar/NavBar';
import './App.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import red from '@material-ui/core/colors/red'


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#409BE6',
      light: '#E6F6FF',
      dark: "#35495D"
    },
    secondary: {
      main: '#FAEF40',
      light: "FF9035"
    }
  }
})

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
      <NavBar/>
      </MuiThemeProvider>
    )
  }
}

export default App;
