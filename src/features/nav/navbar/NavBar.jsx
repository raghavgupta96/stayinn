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
    let authenticated;
    // if user is logged in from social media, no need to do email verification
    if (auth.providerData) {
      let providerId = auth.providerData[0].providerId;
      if (providerId === "password") {
        authenticated = auth.isLoaded && !auth.isEmpty && auth.emailVerified;
      } else {
        authenticated = auth.isLoaded && !auth.isEmpty;
      }
    }
    // console.log("isLoaded: ", auth.isLoaded);

    //console.log(auth);
    //console.log(authenticated);

    // Check if auth is loaded before displaying navbar
    // should solve the issue where there is flash of "login"
    // even though a user logs in
    return (
      auth.isLoaded && (
        <AppBar position="static">
          <Toolbar>
            <span
              to="/"
              style={{
                flex: 1
              }}
            >

              <Typography
                variant="title"
                style={{
                  fontWeight: "500",
                  fontSize: "40px",
                  color: "#ffffff"
                }}
              >
              <Link
              to="/"
              style={{
                color: 'inherit',
                textDecoration: 'inherit',
                '&:hover': {
                  textDecoration: 'underline',
                }
              }}>
                <img
                  src={logo}
                  alt="logo"
                  style={{
                    height: "40px",
                    width: "50px"
                  }}
                />
                StayInn
                </Link>
              </Typography>

            </span>
            {authenticated ? (
              <div>
                {/* Use Link to direct user to the profile URL with user ID */}
                <Link
                  style={{ color: "black", textDecoration: "none" }}
                  to={`/profile/${auth.uid}`}
                >
                  <Button
                    style={{
                      color: "#ffffff",
                      fontSize: "15px"
                    }}
                  >
                    {auth.displayName}
                  </Button>
                </Link>
                <Button
                  href="/"
                  style={{
                    color: "#ffffff",
                    fontSize: "15px"
                  }}
                  onClick={this.handleSignOut}
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div>
                <Link style={{ textDecoration: "none" }} to={"/login"}>
                  <Button
                    style={{
                      color: "#ffffff",
                      fontSize: "15px"
                    }}
                  >
                    Login
                  </Button>
                </Link>
                <Link style={{ textDecoration: "none" }} to={"/signup"}>
                  <Button
                    style={{
                      color: "#ffffff",
                      fontSize: "15px"
                    }}
                  >
                    Sign Up
                  </Button>
                </Link>
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
