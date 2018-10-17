import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { withFirestore, isLoaded } from "react-redux-firebase";
import { withRouter } from "react-router";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import MyBooking from "./myBooking";
import EditInfoForm from "./EditInfoForm";
const actions = {};

const mapState = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile
});

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2
  }
});

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

    console.log(this.props);

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
            showReward: doc.data().reward,
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

    const { auth } = this.props;
    // console.log("Render Phone Number:" + showPhone);
    console.log(this.props.match.params.id);
    // only show when auth is loaded
    if (isLoaded(auth) && this.state.showPhone) {
      // when user does not log in
      if (!auth.isEmpty) {
        if (auth.uid !== this.props.match.params.id) {
          return window.location.replace("/");
        }
        return (
          <div>
            <h1>User Profile</h1>

            {!this.state.updating && (
              <div>
                {auth.photoURL && (
                  <img width="200" height="200" src={auth.photoURL} alt="" />
                )}
                {!auth.photoURL && (
                  <img
                    width="200"
                    height="200"
                    src="https://www.skylom.com/assets/frontend/images/google_profile.png"
                    alt=""
                  />
                )}
                <h2>Name: {auth.displayName}</h2>
                <h2>Phone Number: {this.state.showPhone} </h2>
                <h2>Email: {auth.email}</h2>
                <h2>Password: ********</h2>
                <h2>Reward: {this.state.showReward} points</h2>
                <Button
                  onClick={() =>
                    this.setState({
                      updating: true
                    })
                  }
                >
                  Update Profile
                </Button>
              </div>
            )}

            {this.state.updating && (
              <div>
                <EditInfoForm />{" "}
                <Button
                  onClick={() =>
                    this.setState({
                      updating: false
                    })
                  }
                >
                  Cancel
                </Button>
              </div>
            )}

            {/* <Button href="/profileEdit">Update Profile</Button> */}

            <MyBooking />
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
