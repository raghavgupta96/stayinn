import React from "react";
import { Field, reduxForm, reset } from "redux-form";
import { connect } from "react-redux";
import { registerUser, socialLogin } from "../authActions";
import { Link } from "react-router-dom";

//Material UI components
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
  registerUser,
  socialLogin
};

const validate = values => {
  const errors = {};
  const requiredFields = ["email", "password", "reEnterPassword"];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Required";
    }
    if (values.password !== values.reEnterPassword) {
      errors.reEnterPassword = "Password not matches";
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
    paddingBottom: 20,
    margin: 30
  },
  input: {
    paddingRight: 20
  },
  divider: {
    width: "100%",
    margin: "15px 0px"
  },
  linkHover: {
    margin: theme.spacing.unit * 2,
    color: "lightGray",
    "&:hover": {
      color: "Gray",
      transition: "color 300ms"
    }
  }
});

// get called after the form gets submitted
const afterSubmit = (result, dispatch, history) => {
  // dispatch(reset('registerForm'));
  // dispatch(push('/login'))
  // console.log(history);
  history.history.push("/login");
};

const RegisterForm = ({
  classes,
  handleSubmit,
  registerUser,
  error,
  invalid,
  submitting,
  socialLogin
}) => {
  return (
    <div>
      <form size="large" onSubmit={handleSubmit(registerUser)}>
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
                <Typography variant="display1">Register</Typography>
                <Field name="email" component={renderTextField} label="Email" />
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
                <Link
                    to="/login"
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
                  Already have an account? Log in
                </Typography>
                </Link>
                </Grid>
                <Grid container justify="center">
                  <Button
                    disabled={invalid || submitting}
                    component={SubmitButton}
                  >
                    Submit
                  </Button>
                  <div>
                    {error && <Typography color="error">{error}</Typography>}
                  </div>
                </Grid>
                <div style={{ textAlign: "center" }}>
                  <Divider className={classes.divider} />
                  <SocialLogin socialLogin={socialLogin} />
                </div>

                {/* </Grid> */}
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
    null,
    actions
  )(
    reduxForm({ form: "registerForm", onSubmitSuccess: afterSubmit, validate })(
      RegisterForm
    )
  )
);
