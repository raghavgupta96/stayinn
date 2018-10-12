import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
<<<<<<< HEAD
import { withFirestore, isLoaded, isEmpty } from 'react-redux-firebase'
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
=======
import { withFirestore, isLoaded } from "react-redux-firebase";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import MyBooking from './myBooking'
>>>>>>> cbc72cbb378fcd7d1fcbb1a678f69a58550717c7
const actions = {};

const mapState = state => ({
  auth: state.firebase.auth,
<<<<<<< HEAD
  profile: state.firebase.profile,
});


const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

function CircularIndeterminate() {
  return (
    <div>
      <CircularProgress/>    
=======
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
>>>>>>> cbc72cbb378fcd7d1fcbb1a678f69a58550717c7
    </div>
  );
}

<<<<<<< HEAD

var showPhone = null;


class UserProfile extends Component {


  async componentDidMount() {
    try
    {
      const { auth } = this.props;
      const {firestore, firebase} = this.props;

      var currentUser;
      firebase
      .auth()
      .onAuthStateChanged(function(user){

        
          currentUser = user;
          var userId = currentUser.uid;
   
          var docRef = firebase.firestore().collection("users").doc(userId);
      
          docRef.get().then(function(doc) {
              if (doc.exists) {
                  console.log("Document data:", doc.data().phoneNumber);
                  auth.phoneNumber = doc.data().phoneNumber;
              } else {
                  // doc.data() will be undefined in this case
                  console.log("No such document!");
              }
          }).catch(function(error) {
              console.log("Error getting document:", error);
          });
      });


    }
    catch (error) {
      console.log(error);
    }
    
  }

  render() {
    const { auth } = this.props;
    
    if(isLoaded(auth) || !isEmpty(auth))
    {
      if(!auth.isEmpty)
      {
        return (
          <div>
            <h1>User Profile</h1>
            <img width="200" height="200" src={auth.photoURL} alt="" />
            <h2>Name: {auth.displayName}</h2>
            <h2>Email: {auth.email}</h2>
            <h2>Phone Number: {auth.phoneNumber} </h2>
            <Button href="/profileEdit">Update Profile</Button>
          </div>
        );
      }
      else
      {
        return (window.location.replace("/login"))
      }
    }

    else
    {
      return (
        <CircularIndeterminate></CircularIndeterminate>
      )
    }

  }
}

export default withStyles(styles)(withFirestore(connect(
  mapState,
  actions
)(UserProfile)));
=======
var showPhone = null;

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: 1
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

    // REal code
    const { auth } = this.props;
    console.log("Render Phone Number:" + showPhone);

    // only show when auth is loaded
    if (isLoaded(auth)) {
      // when user does not log in
      if (!auth.isEmpty) {
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
            <MyBooking/>
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
    connect(
      mapState,
      actions
    )(UserProfile)
  )
);
>>>>>>> cbc72cbb378fcd7d1fcbb1a678f69a58550717c7
