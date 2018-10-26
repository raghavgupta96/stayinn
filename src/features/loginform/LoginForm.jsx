import React, { Component } from "react";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

/* Simple Login Form

   Should be changed to stateless when redux is
   integrated into application, but for now
   keep as stateful component.

   Issues:
   1) No mockup, so no styling. Ask Design team about mockup.
   2) Handlers should be passed down as props.
   3) State should be stored on redux.
*/
class LoginForm extends Component {
  state = {
    email: "",
    password: ""
  };

  emailChangeHandler(event) {
    this.setState({ email: event.target.value });
  }

  passwordChangeHandler(event) {
    this.setState({ password: event.target.value });
  }

  submitHandler() {
    alert(`Email: ${this.state.email}\nPassword: ${this.state.password}`);
  }

  render(props) {
    return (
      <form onSubmit={() => this.submitHandler()}>
        <div>
          <TextField
            id="email"
            label="Email"
            value={this.state.email}
            onChange={e => this.emailChangeHandler(e)}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            value={this.state.password}
            onChange={e => this.passwordChangeHandler(e)}
          />
          <Button type="submit">Submit</Button>
        </div>
      </form>
    );
  }
}

export default LoginForm;
