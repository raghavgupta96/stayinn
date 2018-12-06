import React from "react";
import { Button } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import { withRouter } from "react-router-dom";
import { withFirebase } from "react-redux-firebase";

/* Styling */
const styles = theme => ({
  root: {
    flexGrow: 1
  },

  // facebook button design
  facebookButton: {
    boxSizing: "border-box",
    position: "relative",
    margin: 10,
    padding: "0px 15px 0px 46px",
    border: "none",
    textAlign: "center",
    whiteSpace: "nowrap",
    borderRadius: 0.2,
    fontSize: 16,
    color: "#FFF",
    lineHeight: "34px",
    /* Facebook */
    backgroundColor: "#4C69BA",
    background:
      "url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_facebook.png') 6px 6px no-repeat",
    borderRight: "#364e92 1px solid",
    "&:hover": {
      backgroundColor: "#5B7BD5",
      transition: "background-color 500ms",
      cursor: "pointer"

    },
    "&:focus": {
      backgroundColor: "#5B7BD5"
    }
  },
  //   google button design
  googleButton: {
    boxSizing: "border-box",
    position: "relative",
    margin: 0.2,
    padding: "0px 15px 0px 46px",
    border: "none",
    textAlign: "center",
    whiteSpace: "nowrap",
    borderRadius: 0.2,
    fontSize: 16,
    color: "#FFF",
    lineHeight: "34px",
    /* Facebook */
    backgroundColor: "#DD4B39",
    background:
      "url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_google.png') 6px 6px no-repeat",
    borderRight: "#BB3F30 1px solid",
    "&:hover": {
      backgroundColor: "#E74B37",
      transition: "background-color 500ms",
      cursor: "pointer"
    },
    "&:focus": {
      backgroundColor: "#E74B37"
    }
  }
});

const SocialLogin = ({ socialLogin, history, firebase, classes }) => {
  // console.log("Social Login: ", firebase);
  firebase.auth().currentUser && history.push("/");
  return (
    <div>
      <button
        className={classes.facebookButton}
        onClick={() => socialLogin("facebook")}
      >
        Login with Facebook
      </button>
      <button
        className={classes.googleButton}
        onClick={() => socialLogin("google")}
      >
        Login with Google
      </button>
    </div>
  );
};
export default withFirebase(withStyles(styles)(withRouter(SocialLogin)));
