import React from "react";
import { login } from '../authActions';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

//material ui imports
import renderTextField from '../../../app/common/form/TextInput';
import renderPasswordField from '../../../app/common/form/PasswordInput';
import SubmitButton from '../../../app/common/form/SubmitButton';
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const actions = {
  login
}

const validate = values => {
  const errors = {}
  const requiredFields = ['email', 'password' ]
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
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
    paddingBottom: 30,
    margin: 30
  },
  
})


const LoginForm = ({classes, login, handleSubmit, error, invalid, submitting}) => {

  return (
    <div>
      <form size="large" onSubmit={handleSubmit(login)}>
      <div>
        <Grid container className={classes.root} justify="center" spacing={16}>
          <Grid item xs={3}></Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Typography variant="display1" >Login</Typography>
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
              <Grid container justify="center">
                      <Button disabled={invalid || submitting} component={SubmitButton}>
                        LOGIN
                      </Button>
                      <div>
                        {error && <Typography color='error'>{error}</Typography>}
                      </div>
                    </Grid>
            </Paper>
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
      </div>
      </form>
    </div>

  )
}

export default withStyles(styles)(
  connect(null, actions)(
    reduxForm({form: 'loginForm', validate})(LoginForm)
  )
);