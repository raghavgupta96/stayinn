import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { withFirebase } from "react-redux-firebase";
import logo from "./logo_transparent.png";

const mapState = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile
});

// style={{ flex: 1 }} pushes the subsequent things to the right
class NavBar extends Component {
  handleSignOut = () => {
    this.props.firebase.logout();
    this.props.history.push("/");
  };
  render() {
    // auth contains all user information (Ex: email, user, displayName, etc.)
    const { auth } = this.props;
    const authenticated = auth.isLoaded && !auth.isEmpty && auth.emailVerified;
    //console.log(auth);
    //console.log(authenticated);

    // Check if auth is loaded before displaying navbar
    // should solve the issue where there is flash of "login"
    // even though a user logs in
    return (
      auth.isLoaded && (
        <AppBar position="static">
          <Toolbar>
            <Link
              to="/"
              style={{
                flex: 1,
                textDecoration: "none"
              }}
            >
              <Typography
                variant="title"
                style={{
                  fontFamily: "Times",
                  fontSize: "30px",
                  color: "#ffffff"
                }}
              >
                <img src={logo} alt="logo" style={{
                height: "30px",
                width: "40px"
                }}/>
                StayInn
              </Typography>
            </Link>
            {authenticated ? (
              <div>
                {/* Use Link to direct user to the profile URL with user ID */}
                <Link
                  style={{ color: "black", textDecoration: "none" }}
                  to={`/profile/${auth.uid}`}
                >
                  <Button color="inherit">{auth.displayName}</Button>
                </Link>
                <Button href="/" color="inherit" onClick={this.handleSignOut}>
                  Sign Out
                </Button>
              </div>
            ) : (
              <div>
                <Button
                  href="/login"
                  style={{
                    color: "#ffffff"
                  }}
                >
                  Login
                </Button>
                <Button
                  href="/signup"
                  style={{
                    color: "#ffffff"
                  }}
                >
                  Signup
                </Button>
              </div>
            )}
          </Toolbar>
        </AppBar>
      )
    );
  }
}

export default withRouter(
  withFirebase(
    connect(
      mapState,
      null
    )(NavBar)
  )
);
