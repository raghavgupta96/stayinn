import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { registerUser } from "../authActions";
import TextInput from "../../../app/common/form/TextInput";
import PlaceInput from "../../../app/common/form/PlaceInput";
import { combineValidators, isRequired } from "revalidate";

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

const RegisterForm = ({
  handleSubmit,
  registerUser,
  error,
  invalid,
  submitting
}) => {
  return (
    <div>
      <form size="large" onSubmit={handleSubmit(registerUser)}>
        <Field
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
        {error && <label>{error}</label>}
        <input disabled={invalid || submitting} type="submit" />
      </form>
    </div>
  );
};

export default connect(
  null,
  actions
)(reduxForm({ form: "registerForm", validate })(RegisterForm));
