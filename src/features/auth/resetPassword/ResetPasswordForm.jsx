import React from "react";
import { Field, reduxForm, reset } from "redux-form";
import { connect } from "react-redux";
import { resetPassword } from "../authActions";

//Material UI components
import renderTextField from "../../../app/common/form/TextInput";
import renderPasswordField from "../../../app/common/form/PasswordInput";
import SubmitButton from "../../../app/common/form/SubmitButton";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const actions = {
  resetPassword
};

const validate = values => {
    const errors = {};
    const requiredFields = ["email"];
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
    paddingBottom: 20,
    margin: 30
  },
  input: {
    paddingRight: 20
  }
});

// get called after the form gets submitted
const afterSubmit = (result, dispatch, history) => {
  // dispatch(reset('registerForm'));
  // dispatch(push('/login'))
  // console.log(history);
  history.history.push("/login");
};

const ResetPasswordForm = ({
  classes,
  handleSubmit,
  resetPassword,
  error,
  invalid,
  submitting
}) => {
  return (
    <div>
      <form size="large" onSubmit={handleSubmit(resetPassword)}>
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
                <Typography variant="display1">Reset Password</Typography>
                <Typography variant="subheading">
                  Please enter your email to reset the password
                </Typography>
                <Field name="email" component={renderTextField} label="Email" />
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
      ResetPasswordForm
    )
  )
);
