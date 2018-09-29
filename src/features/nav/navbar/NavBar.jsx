import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// style={{ flex: 1 }} pushes the subsequent things to the right
const NavBar = (theme) => {
  return (
    <AppBar position="static">
        <Toolbar>
          <Typography variant="headline" color="inherit" style={{ flex: 1 }}> 
            StayInn
          </Typography>
            {/* not sure if as={NavLink} is the right way... */}
            {/* <Button as={NavLink} to='/login' color='inherit'>Login</Button> | */}
            <Button href='/login' color='inherit'>Login</Button> 
            <Button href='/signup' color='inherit'>Signup</Button> 
        </Toolbar>
      </AppBar>
  )
}

export default withRouter(NavBar)