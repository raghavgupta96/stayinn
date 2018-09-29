import React from "react";
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import { NavLink, withRouter } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const mapState = (state) => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile
})

// style={{ flex: 1 }} pushes the subsequent things to the right
const NavBar = theme => {

  const handleSignOut = () => {
    this.props.firebase.logout();
    //this.props.history.push('/');
  }
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="headline" color="inherit" style={{ flex: 1 }}>
          StayInn
          </Typography>
            {/* not sure if as={NavLink} is the right way... */}
            {/* <Button as={NavLink} to='/login' color='inherit'>Login</Button> | */}
            <Button href='/login' color='inherit'>Login</Button> 
            <Button href='/register' color='inherit'>Signup</Button> 
        </Toolbar>
      </AppBar>
  )
}

export default withRouter(withFirebase(connect(mapState)(NavBar)));
