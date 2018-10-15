import React, { Component } from "react";
import { connect } from "react-redux"
import { withRouter } from "react-router-dom";
import { withFirebase } from "react-redux-firebase";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

const mapState = (state) => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile
})

// style={{ flex: 1 }} pushes the subsequent things to the right
class NavBar extends Component {

  handleSignOut = () => {
    this.props.firebase.logout();
    this.props.history.push('/');
  }
  render() {
    // auth contains all user information (Ex: email, user, displayName, etc.)
    const { auth } = this.props;
    const authenticated = auth.isLoaded && !auth.isEmpty && auth.emailVerified;
    //console.log(auth);
    //console.log(authenticated);
    
    // Check if auth is loaded before displaying navbar
    // should solve the issue where there is flash of "login"
    // even though a user logs in
    return auth.isLoaded && (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="headline" color="inherit" style={{ flex: 1 }}>
            <IconButton href="/">StayInn</IconButton>
          </Typography>
          { authenticated ? (
            <div>
              <Button href="/profile" color="inherit">
                {auth.displayName}
              </Button>
              <Button href="/" color="inherit" onClick={this.handleSignOut}>
                Sign Out
              </Button>
              </div>
            ) : (
              <div>
              <Button href="/login" color="inherit">
                Login
              </Button>
              <Button href="/signup" color="inherit">
                Signup
              </Button>
              </div>            
          )}
        </Toolbar>
      </AppBar>
    );
  }
};

export default withRouter(withFirebase(connect(mapState, null)(NavBar)));
