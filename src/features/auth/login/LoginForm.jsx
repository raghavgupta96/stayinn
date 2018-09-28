import React, { Component } from "react";
import { login } from '../authActions';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../../../app/common/form/TextInput';
//import TextField from "@material-ui/core/TextField";
//import Button from "@material-ui/core/Button";
import { connect } from 'react-redux';
/* Simple Login Form

   Should be changed to stateless when redux is
   integrated into application, but for now
   keep as stateful component.

   Issues:
   1) No mockup, so no styling. Ask Design team about mockup.
   2) Handlers should be passed down as props.
   3) State should be stored on redux.
*/
const actions = {
  login
}
// class LoginForm extends Component {
//   // state = {
//   //   email: "",
//   //   password: ""
//   // };

//   // emailChangeHandler(event) {
//   //   this.setState({ email: event.target.value });
//   // }

//   // passwordChangeHandler(event) {
//   //   this.setState({ password: event.target.value });
//   // }

//   // submitHandler() {
//   //   alert(`Email: ${this.state.email}\nPassword: ${this.state.password}`);
//   // }

//   render(props) {
//     return (
//       <form onSubmit={() => this.submitHandler()}>
//         <div>
//           <TextField
//             id="email"
//             label="Email"
//             value={this.state.email}
//             onChange={e => this.emailChangeHandler(e)}
//           />
//           <TextField
//             id="password"
//             label="Password"
//             type="password"
//             value={this.state.password}
//             onChange={e => this.passwordChangeHandler(e)}
//           />
//           <Button type="submit">Submit</Button>
//         </div>
//       </form>
//     );
//   }
// }

// export default LoginForm;


const LoginForm = ({login, handleSubmit}) => {
  return (
    <div>
      <form size="large" onSubmit={handleSubmit(login)}>
        <Field
          name="email"
          component={TextInput}
          type="text"
          placeholder="Email Address"
        />
        <Field
          name="password"
          component={TextInput}
          type="password"
          placeholder="password"
        />      
        <input type="submit"></input>
      </form>
    </div>

  )
}

export default connect(null, actions)(reduxForm({form: 'loginForm'})(LoginForm));