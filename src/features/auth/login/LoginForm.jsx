import React, { Component } from "react";
import { login } from '../authActions';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../../../app/common/form/TextInput';
//import TextField from "@material-ui/core/TextField";
//import Button from "@material-ui/core/Button";
import FormLabel from '@material-ui/core/FormLabel';
import { connect } from 'react-redux';

//material ui imports
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

/* Simple Login Form
   Should be changed to stateless when redux is
   integrated into application, but for now
   keep as stateful component.

   Issues:
   1) No mockup, so no styling. Ask Design team about mockup.
   2) Handlers should be passed down as props.
   3) State should be stored on redux.
*/
const actions = {
  login
}

/* Styling */
const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
    height: 300,
    width: 400,
  },
  button: {
    paddingTop: 30,
  }
})

//rendering the UI components
const renderTextField = ({
  input, label, meta: { touched, error }, ...custom
}) => (
  <TextField
   style={{height: 50}}
   label={label}
   floatingLabelText={label}
   errorText={touched && error}
   {...input}
   {...custom}
   margin="normal"
   fullWidth
   />
)

const renderPasswordField = ({
  input, label, meta: { touched, error }, ...custom
})=> (
  <TextField 
   required
   style={{paddingBottom: 10}}
   type="password"
   label="Password"
   hintText={label}
   floatingLabelText={label}
   errorText={touched && error}
   {...input}
   {...custom}
   margin="normal"
   fullWidth/>
)
const renderLoginButton = ({
  ...custom
}) => (
  <Button 
  variant="contained" 
  justify="right" 
  color="primary" 
  type="submit"
  {...custom}
  />
)

const LoginForm = ({classes,login, handleSubmit}) => {
  //const {classes} = this.props;

  return (
    <div>
      <form size="large" onSubmit={handleSubmit(login)}>
      <div>
        <Grid container className={classes.root} justify="center" spacing={16}>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <Typography variant="display2" >Login</Typography>
              <Field 
                  name="email"
                  component={renderTextField}
                  label="Email"
                />
              <Field 
                  name="password"
                  component={renderPasswordField}
                />
              <Button className={classes.button} component={renderLoginButton}>
                Login 
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      </div>
      </form>
    </div>

  )
}

export default withStyles(styles)(
  connect(null, actions)(
    reduxForm({form: 'loginForm'})(LoginForm)
  )
);