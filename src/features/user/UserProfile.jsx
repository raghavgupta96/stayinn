import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { withFirestore, isLoaded, isEmpty } from 'react-redux-firebase'
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
const actions = {};

const mapState = state => ({
  auth: state.firebase.auth,
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
    </div>
  );
}


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
