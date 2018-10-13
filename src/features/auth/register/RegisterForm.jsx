import React from "react";
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { registerUser } from '../authActions';

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

const validate = values => {
  const errors = {}
  const requiredFields = ['email', 'password', 'reEnterPassword']
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
    if(values.password !== values.reEnterPassword)
    {
      errors.reEnterPassword = 'Password not matches'
    }
  })
  return errors
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
    paddingBottom: 20,
  },
  input: {
    paddingRight: 20,
  }
})

// rendering the UI components
const renderTextField = ({
  input, label, meta: { touched, error }, ...custom
}) => (
  <div>
    <TextField
    style={{height: 50 }}
    fullWidth
    label={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
    margin="normal"
    />

   <Typography color='error'>{touched && error}</Typography>

  </div>


)


const renderPasswordField = ({
  input, label, meta: { touched, error }, ...custom
}) => (
  <div>
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
    <Typography color='error'>{touched && error}</Typography>
  </div>
    
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
                {/* <Grid item xs={12}> */}
                  <Field
                    name="email"
                    component={renderTextField}
                    label="Email"
                  />
                  <Field
                    name="password"
                    label="Password"
                    component={renderPasswordField}
                  />
                  <Field
                    name="reEnterPassword"
                    label="Re-enter Password"
                    component={renderPasswordField}
                  />
                  <Grid container justify="center">
                    <Button disabled={invalid || submitting} component={renderButton}>
                      Submit
                    </Button>
                    <div>
                      {error && <Typography color='error'>{error}</Typography>}
                    </div>
                  </Grid>
                </Grid>
              {/* </Grid> */}
            </Paper>
          </Grid>
          <Grid item xs={2}></Grid>
        </div>

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