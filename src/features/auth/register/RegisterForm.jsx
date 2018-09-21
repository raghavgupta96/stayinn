import React, { Component } from "react";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

class RegisterForm extends Component {
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

  submitHandler(event) {
    //
  }

  render(props) {
    return (
      <Grid container>
        <Grid item sm>
          <form onSubmit={() => this.submitHandler()}>
            <div style={{ width: "100%" }}>
              <FormControl>
                <Paper>
                  <Typography>Username</Typography>

                  <Input
                    startAdornment={
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    }
                  />
                </Paper>

                <Paper>
                  <Typography>Password</Typography>
                  <Input/>
                </Paper>
                
                <Paper>
                  <Typography>Confirm Password</Typography>
                  <Input/>
                </Paper>

                <Button type="submit" color="default">Submit</Button>
              </FormControl>
            </div>
          </form>
        </Grid>
      </Grid>
    );
  }
}

export default RegisterForm;
