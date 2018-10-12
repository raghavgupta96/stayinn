import React from "react";
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { registerUser } from '../authActions';
import { combineValidators, isRequired } from 'revalidate'

//Material UI components
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const actions = {
  registerUser
}

const validate = combineValidators({
  displayName: isRequired('display'),
  email: isRequired('email'),
  password: isRequired('password')
})

/* Styling */
const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
  },
  input: {
    paddingRight: 20,
  }
})

//rendering the UI components
const renderTextField = ({
  input, label, meta: { touched, error }, ...custom
}) => (
    <TextField

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
}) => (
    <TextField

      style={{ paddingBottom: 10 }}
      type="password"
      label={label}
      hintText={label}
      floatingLabelText={label}
      errorText={touched && error}
      {...input}
      {...custom}
      margin="normal"
      fullWidth
    />
  )
const renderButton = ({
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

const RegisterForm = ({ classes, handleSubmit, registerUser, error, invalid, submitting }) => {
  return (
    <div>
      <form size="large" onSubmit={handleSubmit(registerUser)}>
        <div>
          <Grid container className={classes.root} justify="center" spacing={16}>
            <Grid item xs={2}></Grid>
            <Grid item xs={6}></Grid>
            <Paper className={classes.paper}>
              <Typography variant="display1" >Register</Typography>
              <Grid container className={classes.root} spacing={8}>
                <Grid item xs={12}>
                  <Field
                    name="email"
                    label="Email"
                    component={renderTextField}
                  />
                  <Field
                    name="password"
                    label="Password"
                    component={renderPasswordField}
                  />
                  <Field
                    name="re-enter password"
                    label="Re-enter Password"
                    component={renderPasswordField}
                  />
                  <Grid container justify="center">
                    <Button component={renderButton}>
                      Submit
                      </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={2}></Grid>
        </div>

        {error && <label>{error}</label>}

      </form>
    </div>
  );
};

export default withStyles(styles)(
  connect(null, actions)(
    reduxForm({ form: 'registerForm', validate })(
      RegisterForm
    )
  )
);