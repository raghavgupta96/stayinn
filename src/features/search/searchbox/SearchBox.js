import Calendar from "../../../app/calendar/Calendar";
import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Autocomplete from 'react-google-autocomplete';

// const API_KEY = GOOGLE_API_KEY;
// const API_KEY = "AIzaSyBAaov165t1KK89TiqHPLjM1poFNHJk8OY"

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
              <Autocomplete
      style={{width: '90%'}}
      onPlaceSelected={(place) => {
        console.log(place);
      }}
      types={['(regions)']}
      componentRestrictions={{country: "ru"}}
      />
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
