import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Theme from "../../../theme";
import { MuiThemeProvider } from "@material-ui/core";

class NavBar extends Component {
  render() {
    return (
      <MuiThemeProvider theme={Theme}>
        <AppBar position="static" color="primary">
          <Toolbar style={Theme.palette.tertiary_orange}>
            <Typography variant="headline" color="inherit">
              StayInn
            </Typography>
          </Toolbar>
        </AppBar>
      </MuiThemeProvider>
    );
  }
}

export default NavBar;
