import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { withFirestore, isLoaded } from "react-redux-firebase";
import { withRouter } from "react-router";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import MyBooking from "./myBooking";
import EditInfoForm from "./EditInfoForm";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const actions = {};

const mapState = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile
});

const styles = theme => ({
  //added styles for root and paper
  root: {
    flexGrow: 1,
    margin: "12px"
  },
  paper: {
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 30
  },
  progress: {
    margin: theme.spacing.unit * 2
  },
  title: {
    fontSize: "36px"
  },
  headerInfo: {
    fontSize: "18px"
  }
});

const renderButton = ({ ...custom }) => (
  <Button
    variant="contained"
    justify="right"
    color="primary"
    style={{
      color: "#ffffff"
    }}
    {...custom}
  />
);

function CircularIndeterminate() {
  return (
    <div>
      <CircularProgress />
    </div>
  );
}

var phoneNum = null;

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPhone: null,
      showReward: 100,
      id: this.props.match.params,
      updating: false
    };
  }

  // getPhone = () => {
  async componentDidMount() {
    const { firebase } = this.props;

    const obj = this;
    var currentUser;

    // Check if auth changes after initializes
    firebase.auth().onAuthStateChanged(function(user) {
      // if user does not log in
      if (!user) {
        return;
      }
      currentUser = user;
      var userId = currentUser.uid;

      obj.setState({
        id: userId
      });

      var docRef = firebase
        .firestore()
        .collection("users")
        .doc(userId);
      docRef.get().then(doc => {
        if (doc.exists) {
          console.log("user data", doc.data());

          obj.setState({
            showPhone: doc.data().phoneNumber,
            showReward: doc.data().reward
          });
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      });
    });
    // this.setState({
    //   data: showPhone
    // })
  }

  // async componentDidMount() {
  // try
  // {
  //   const { auth } = this.props;
  //   const {firestore, firebase} = this.props;

  //   var currentUser;
  //   firebase
  //   .auth()
  //   .onAuthStateChanged(function(user){

  //       currentUser = user;
  //       var userId = currentUser.uid;

  //       var docRef = firebase.firestore().collection("users").doc(userId);
  //       docRef.get().then((doc) => {
  //           if (doc.exists) {
  //               console.log("Phone Number:", doc.data().phoneNumber);
  //               showPhone = doc.data().phoneNumber;
  //           } else {
  //               // doc.data() will be undefined in this case
  //               console.log("No such document!");
  //           }
  //       }).catch(function(error) {
  //           console.log("Error getting document:", error);
  //       });
  //   });
  // }
  // catch (error) {
  //   console.log(error);
  // }

  // }

  render() {
    // Testing
    // console.log(this.state.data);
    // return (
    //   <div>
    //     <button onClick={this.getPhone}>Click</button>
    //     <h1>Phone Number: {this.state.data}</h1>
    //     {/* <h1>Profile Page</h1> */}
    //   </div>
    // );

    const { auth, classes } = this.props;
    // console.log("Render Phone Number:" + showPhone);
    // console.log(this.props.match.params.id);
    // only show when auth is loaded
    if (isLoaded(auth)) {
      // when user does not log in
      if (!auth.isEmpty) {
        if (auth.uid !== this.props.match.params.id) {
          return window.location.replace("/");
        }
        return (
          <div>
            {!this.state.updating && (
              <div>
                <Grid
                  container
                  className={classes.root}
                  justify="center"
                  spacing={16}
                >
                  <Grid item xs={4}>
                    <h1 style={{textAlign: "center",}}>User Profile</h1>
                    <Paper className={classes.paper}style={{textAlign: "center",}}>
                      {auth.photoURL && (
                        <img
                          width="200"
                          height="200"
                          src={auth.photoURL}
                          alt=""
                          style={{borderRadius: "100%"}}
                        />
                      )}
                      {!auth.photoURL && (
                        <img
                          width="200"
                          height="200"
                          src="https://www.skylom.com/assets/frontend/images/google_profile.png"
                          alt=""
                        />
                      )}
                      <Typography className={classes.title}>
                        {auth.displayName}
                      </Typography>
                      <Typography className={classes.headerInfo}>
                        Email: {auth.email}
                      </Typography>
                      <Typography className={classes.headerInfo}>
                        Phone: {this.state.showPhone}
                      </Typography>
                      <Typography className={classes.headerInfo}>
                        Reward: {this.state.showReward} points
                      </Typography>
                      <Button
                        component={renderButton}
                        onClick={() =>
                          this.setState({
                            updating: true
                          })
                        }
                      >
                        Update Profile
                      </Button>
                    </Paper>
                  </Grid>
                  <Grid item xs={8}>
                    <MyBooking />
                  </Grid>
                </Grid>
              </div>
            )}

            {this.state.updating && (
              <div>
                <Grid
                  container
                  className={classes.root}
                  justify="center"
                  spacing={16}
                >
                  <Grid item xs={4}>
                    <h1>Update Profile</h1>
                    <EditInfoForm userProfile={this} />
                  </Grid>
                  <Grid item xs={8}>
                    <MyBooking />
                  </Grid>
                </Grid>
                {/* <Button
                  onClick={() =>
                    this.setState({
                      updating: false
                    })
                  }
                >
                  Cancel
                </Button> */}
              </div>
            )}
          </div>
        );
      } else {
        // bring guest to login page if not sign in
        return window.location.replace("/login");
      }
    } else {
      // render circular loading page
      return <CircularIndeterminate />;
    }
  }
}

export default withStyles(styles)(
  withFirestore(
    withRouter(
      connect(
        mapState,
        actions
      )(UserProfile)
    )
  )
);
