import React from "react";
import { login, socialLogin } from "../authActions";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

//material ui imports
import renderTextField from "../../../app/common/form/TextInput";
import renderPasswordField from "../../../app/common/form/PasswordInput";
import SubmitButton from "../../../app/common/form/SubmitButton";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import SocialLogin from "../socialLogin/SocialLogin";
const actions = {
  login,
  socialLogin
};

const mapState = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  firebase: state.firebase
});

const validate = values => {
  const errors = {};
  const requiredFields = ["email", "password"];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  return errors;
};

/* Styling */
const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 30,
    margin: 30
  },
  linkHover: {
    margin: theme.spacing.unit * 2,
    color: "lightGray",
    "&:hover": {
      color: "Gray",
      transition: "color 300ms"
    }
  },
  divider: {
    width: "100%",
    margin: "15px 0px"
  }
});

const afterSubmit = (result, dispatch, history) => {
  // dispatch(reset('registerForm'));
  // dispatch(push('/login'))
  // console.log(history);
  // toastr.success("Welcome to StayInn", "You have successfully logged in.");
  history.history.push("/");
};

const LoginForm = ({
  classes,
  login,
  socialLogin,
  handleSubmit,
  error,
  invalid,
  submitting
}) => {
  return (
    <div>
      <form size="large" onSubmit={handleSubmit(login)}>
        <div>
          <Grid
            container
            className={classes.root}
            justify="center"
            spacing={16}
          >
            <Grid item xs={3} />
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <Typography variant="display1">Login</Typography>
                <Field name="email" component={renderTextField} label="Email" />
                <Field
                  name="password"
                  label="Password"
                  component={renderPasswordField}
                />
                <Grid container justify="center">
                  <Link
                    to="/resetPassword"
                    style={{
                      flex: 1,
                      textDecoration: "none"
                    }}
                  >
                    <Typography
                      variant="body2"
                      className={classes.linkHover}
                      style={{ margin: 0 }}
                    >
                      Forgot your password?
                    </Typography>
                  </Link>
                  <Link
                    to="/signup"
                    style={{
                      flex: 1,
                      textDecoration: "none"
                    }}
                  >
                    <Typography
                      variant="body2"
                      className={classes.linkHover}
                      style={{ margin: 0, float: "right" }}
                    >
                      Don't have a account? Sign up
                    </Typography>
                  </Link>
                  <Grid container justify="center">
                    <Button
                      disabled={invalid || submitting}
                      component={SubmitButton}
                    >
                      LOGIN
                    </Button>
                  </Grid>
                  <div>
                    {error && <Typography color="error">{error}</Typography>}
                  </div>
                  <Divider className={classes.divider} />
                  <SocialLogin socialLogin={socialLogin} />
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={3} />
          </Grid>
        </div>
      </form>
    </div>
  );
};

export default withStyles(styles)(
  connect(
    mapState,
    actions
  )(
    reduxForm({ form: "loginForm", onSubmitSuccess: afterSubmit, validate })(
      LoginForm
    )
  )
);
