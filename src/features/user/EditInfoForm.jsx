import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { isLoaded } from "react-redux-firebase";

//Material UI components
import CircularProgress from "@material-ui/core/CircularProgress";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import FileInput from "../../app/common/form/FileInput";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { updateUser } from "../auth/authActions";
import PhoneInput from "../../app/common/form/PhoneInput";

const actions = {
  updateUser
};

const mapState = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile
});

const validate = values => {
  const errors = {};
  const requiredFields = ["photoFile", "displayName", "phoneNumber"];
  requiredFields.forEach(field => {
    if (!values.photoFile && !values.displayName && !values.phoneNumber) {
      errors[field] = "Required";
    }
  });
  return errors;
};

function CircularIndeterminate() {
  return (
    <div>
      <CircularProgress />
    </div>
  );
}

const styles = theme => ({
  //added styles for root and paper
  root: {
    flexGrow: 1,
    margin: "12px"
  },
  paper: {
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20
  },
  progress: {
    margin: theme.spacing.unit * 2,
    size: 20
  },
  title: {
    fontSize: "36px"
  },
  headerInfo: {
    fontSize: "18px"
  }
});

const warningButton = ({ ...custom }) => (
  <Button variant="contained" justify="right" {...custom} />
);

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

const renderButton = ({ loading, classes, ...custom }) => (
  <Button
    variant="contained"
    justify="right"
    color="primary"
    type="submit"
    {...custom}
    style={{
      color: "white",
      marginRight: 10
    }}
  >
    Update
    {loading && (
      <CircularProgress style={{ marginLeft: 5, width: 20, height: 20 }} />
    )}
  </Button>
);

// Working on updating user profile snackbar

// const afterSubmit = (result, dispatch, history) =>
// {
//   // dispatch(reset('registerForm'));
//   // dispatch(push('/login'))
//   // console.log(history);
//   let url = window.location.href;
//   const startChar = url.indexOf('/', 8);
//   const path = url.substr(startChar, url.length);
//   console.log(path);
//   history.history.push(path);

// }

const EditInfoForm = ({
  classes,
  handleSubmit,
  updateUser,
  error,
  invalid,
  submitting,
  auth,
  userProfile
}) => {
  // redner after auth is loaded
  if (isLoaded(auth)) {
    // if auth is not empty
    // when user logs in
    if (!auth.isEmpty) {
      return (
        // <div>
        // <form size="large" onSubmit={handleSubmit(updateUser)}>
        //       <div>
        //         <Grid container className={classes.root} justify="center" spacing={16}>
        //           <Grid item xs={2}></Grid>
        //           <Grid item xs={6}></Grid>
        //             <Paper className={classes.paper}>
        //             <Typography variant="display1" >Update Information</Typography>
        //               <Grid container className={classes.root} spacing={8}>
        //                 <Grid item xs={6}>
        //                   <Field
        //                     name="displayName"
        //                     label="Name"
        //                     component={renderTextField}
        //                   />
        //                   <Button component={renderButton}>
        //                     Update
        //                   </Button>
        //                   <Button  component={renderButton}>
        //                     Cancel
        //                   </Button>
        //                 </Grid>
        //                 <Grid item xs={6}>
        //                 {/* Don't know yet if we are updating email */}
        //                   {/* <Field
        //                     name="email"
        //                     label="Email"
        //                     component={renderTextField}
        //                   /> */}
        //                   <Field
        //                     name="phoneNumber"
        //                     label="Phone Number"
        //                     component={renderTextField}
        //                   />
        //                   <Field
        //                     name="photoFile"
        //                     component={FileInput}
        //                   />
        //                 </Grid>
        //               </Grid>
        //             </Paper>
        //           </Grid>
        //           <Grid item xs={2}></Grid>
        //       </div>
        //   </form>
        // </div>
        <div>
          <form size="large" onSubmit={handleSubmit(updateUser)}>
            <Paper className={classes.paper}>
              {/* {auth.photoURL && (
                    <img width="200" height="200" src={auth.photoURL} alt="" />
                  )}
                  {!auth.photoURL && (
                    <img
                      width="200"
                      height="200"
                      src="https://www.skylom.com/assets/frontend/images/google_profile.png"
                      alt=""
                    />
                  )} */}
              {/* The way to make an image to upload button */}
              {/* without upload button, Field cannot access data, always show undefined */}
              <Field
                id="photoFile"
                type="text"
                name="photoFile"
                component={FileInput}
              />
              {/* <Field name="photoFile" component="input" type="file" /> */}
              <Field
                name="displayName"
                label="Name"
                component={renderTextField}
              />
              <Field
                name="phoneNumber"
                label="Phone Number"
                component={PhoneInput}
              />
              <Typography
                className={classes.headerInfo}
                style={{
                  margin: "20px 0px"
                }}
              >
                Email: {auth.email}
              </Typography>
              <Button
                loading={submitting}
                disabled={invalid || submitting}
                component={renderButton}
                type="submit"

              >
                Update
              </Button>
              <Button
                component={warningButton}
                onClick={() => {
                  userProfile.setState({
                    updating: false
                  });
                }}
              >
                Cancel
              </Button>
            </Paper>
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

// working on snackbar....
// export default withStyles(styles)(
//   withRouter(connect(
//     mapState,
//     actions
//   )(reduxForm({ form: "editInfoForm", onSubmitSuccess: afterSubmit, validate })(EditInfoForm)))
// );
export default withStyles(styles)(
  withRouter(
    connect(
      mapState,
      actions
    )(reduxForm({ form: "editInfoForm", validate })(EditInfoForm))
  )
);
