import Calendar from "../../../app/calendar/Calendar";
import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

class SearchBox extends Component {
    state = {
        place : ""
    }
    submit = () => {
    console.log("submitted");
    //do functional here
  };
  render() {
    return (
      <div>
        <TextField
          id="standard-search"
          label="Where are you going?"
          type="search"
          margin="normal"
        />
        <Calendar />
        <Button variant="contained" onClick={this.submit}>
          submit
        </Button>
        <TextField 
       id="standard-select-currency-native"
       select
       label="" />
      </div>
    );
  }
}

export default SearchBox;
