import React, { Component } from "react";

import { connect } from 'react-redux'

const actions = {

}

function showImage(pic)
{
  console.log(pic);
}

const mapState = (state) => ({
    auth: state.firebase.auth,
    profile: state.firebase.profile
})

class UserProfile extends Component {
  render(){
    const { auth } = this.props;
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

export default connect(mapState,actions)(UserProfile);
