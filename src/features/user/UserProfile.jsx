import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { withFirestore, isLoaded } from "react-redux-firebase";
import { withRouter } from "react-router";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import MyBooking from "./myBooking";
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

<<<<<<< HEAD
var showPhone = null;
=======
function showImage(pic)
{
  console.log(pic);
}

const mapState = (state) => ({
    auth: state.firebase.auth,
    profile: state.firebase.profile
})
>>>>>>> 0285a46e86185c49686832cbd36e24e2fd230f74

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: 1,
      id: this.props.match.params
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
          console.log("Phone Number:", doc.data().phoneNumber);
          showPhone = doc.data().phoneNumber;
          obj.setState({
            data: showPhone
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
<<<<<<< HEAD
    // console.log("Render Phone Number:" + showPhone);
    console.log(this.props.match.params.id);
    // only show when auth is loaded
    if (isLoaded(auth)) {
      // when user does not log in
      if (!auth.isEmpty) {
        if(auth.uid !== this.props.match.params.id)
        {
          return window.location.replace("/");
        }
        return (
          <div>
            <h1>User Profile</h1>
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
            <h2>Email: {auth.email}</h2>
            <h2>Phone Number: {showPhone} </h2>
            <Button href="/profileEdit">Update Profile</Button>
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
=======
    return (
    <div>
      <h1>User Profile</h1>
      {/* <h2>Name: {window.name}</h2>
      <h2>Email: {window.email}</h2>
      <h2>photoURL: {window.photoURL}</h2> */}
      <img width="200" height= "200" src={auth.photoURL} alt=""/>
      <h2>Name: {auth.displayName}</h2>
      <h2>Email: {auth.email}</h2>

    </div>
  );
};
};
>>>>>>> 0285a46e86185c49686832cbd36e24e2fd230f74

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
