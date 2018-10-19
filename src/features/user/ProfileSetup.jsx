import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

//Material UI components
import { isLoaded } from "react-redux-firebase";
import CircularProgress from "@material-ui/core/CircularProgress";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from "@material-ui/core/TextField";
import { updateUser } from "../auth/authActions";
import { Typography } from "@material-ui/core";

const actions = {
  updateUser
};

const mapState = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile
});

function CircularIndeterminate() {
  return (
    <div>
      <CircularProgress />
    </div>
  );
}

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: "60px",
    height: 300,
    width: 400,
  },

  uploadPic: {
    marginTop: "40px"
  }
  
})

//rendering the UI components
const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
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
);

const renderButton = ({ ...custom }) => (
  <Button
    variant="contained"
    justify="right"
    color="primary"
    type="submit"
    {...custom}
  />
);

const setupProfileForm = ({
  classes,
  handleSubmit,
  updateUser,
  error,
  invalid,
  submitting,
  auth
}) => {
  // redner after auth is loaded
  if (isLoaded(auth)) {
    // if auth is not empty
    // when user logs in
    if (!auth.isEmpty) {
      return (
        <div>
          <form size="large" onSubmit={handleSubmit(updateUser)}>
            <Grid container className={classes.root} justify="center" spacing={16}>
              <Grid item xs={4}>
                <Paper className={classes.paper}>
                  <div>
                    <div>
                      {/* The way to make an image to upload button */}
                      {/* without upload button, Field cannot access data, always show undefined */}
                      <Typography 
                        gutterBottom
                        variant="title"
                        className={classes.typography}
                      >
                        Fill out the details below to complete registration. 
                      </Typography>
                      {/* <Field name="photoFile" component="input" type="file" /> */}
                    </div>
                    <div>
                      <Field
                        name="displayName"
                        label="Name"
                        component={renderTextField}
                      />
                    </div>
                    <Field
                      name="phoneNumber"
                      label="Phone Number"
                      component={renderTextField}
                    />
                    <Grid container justify="center">
                      <Button component={renderButton}>Confirm</Button>
                    </Grid>
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </form>
        </div>
      );
    } else {
      // bring users to login page if they do not login
      return window.location.replace("/login");
    }
  } else {
    // show circular loading figure if info is not ready yet
    return <CircularIndeterminate />;
  }
};

export default withStyles(styles)(
  connect(
    mapState,
    actions
  )(reduxForm({ form: "setupProfileForm" })(setupProfileForm))
);
