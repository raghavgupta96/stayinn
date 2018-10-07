import React, { Component } from "react";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircle from "@material-ui/icons/AccountCircle";

import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { registerUser } from "../authActions";
import TextInput from "../../../app/common/form/TextInput";
import { combineValidators, isRequired } from "revalidate";

//Material UI components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const actions = {
  registerUser
};

const validate = combineValidators({
  displayName: isRequired("display"),
  email: isRequired("email"),
  password: isRequired("password")
});

// The form is created with material UI
// Probably need to incorporate Redux into it

// class RegisterForm extends Component {
//   state = {
//     email: "",
//     password: ""
//   };

//   emailChangeHandler(event) {
//     this.setState({ email: event.target.value });

//   }

//   passwordChangeHandler(event) {
//     this.setState({ password: event.target.value });
//   }

//   submitHandler(event) {
//     console.log(this.state.email)
//   }

//   render(props) {
//     return (
// <Grid container>
//   <Grid item sm>
//     <form onSubmit={() => this.submitHandler()}>
//       <div style={{ width: "100%" }}>
//         <FormControl>
//           <Paper>
//             <Typography>Username</Typography>

//             <Input
//               startAdornment={
//                 <InputAdornment position="start">
//                   <AccountCircle />
//                 </InputAdornment>
//               }
//             />
//           </Paper>

//           <Paper>
//             <Typography>Password</Typography>
//             <Input/>
//           </Paper>

//           <Paper>
//             <Typography>Confirm Password</Typography>
//             <Input/>
//           </Paper>

//           <Button type="submit" color="default">Submit</Button>
//         </FormControl>
//       </div>
//     </form>
//   </Grid>
// </Grid>
//     );
//   }
// }
/* Styling */
const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20
  },
  input: {
    paddingRight: 20
  }
});

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
const renderPasswordField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
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

const RegisterForm = ({
  classes,
  handleSubmit,
  registerUser,
  error,
  invalid,
  submitting
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
            <Grid item xs={2} />
            <Grid item xs={6} />
            <Paper className={classes.paper}>
              <Typography variant="display1">Register</Typography>
              <Grid container className={classes.root} spacing={8}>
                <Grid item xs={6}>
                  <Field
                    name="displayName"
                    label="Name"
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
                  <Button component={renderButton}>Submit</Button>
                </Grid>
                <Grid item xs={6}>
                  <Field
                    name="email"
                    label="Email"
                    component={renderTextField}
                  />
                  <Field
                    name="phoneNumber"
                    label="Phone Number"
                    component={renderTextField}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={2} />
        </div>

        {error && <label>{error}</label>}
      </form>
    </div>
  );
};

export default withStyles(styles)(
  connect(
    null,
    actions
  )(reduxForm({ form: "registerForm", validate })(RegisterForm))
);

/**
 * <Field
            name="displayName"
            type="text"
            component={TextInput}
            placeholder="Name"
          />
          <Field
            name="email"
            type="text"
            component={TextInput}
            placeholder="Email"
          />
          <Field
            name="password"
            type="password"
            component={TextInput}
            placeholder="Password"
          />
          <Field
            name="address"
            type="text"
            component={PlaceInput}
            placeholder="Address"
          />
          <Field
            name="photoUrl"
            type="text"
            component={TextInput}
            placeholder="Photo URL"
          />
          <Field
            name="phoneNumber"
            type="text"
            component={TextInput}
            placeholder="Phone Number"
          />
          <input disabled={invalid || submitting} type="submit"></input>
 */
