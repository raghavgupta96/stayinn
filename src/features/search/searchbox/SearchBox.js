import Calendar from "../../../app/calendar/Calendar";
import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';


class SearchBox extends Component {
  state = {
    place: ""
  };
  submit = () => {
    console.log("submitted");
    //do functional here
  };
  render() {
    return (
      <Grid container direction="column">
        {/* <link  href="/path/to/hotel-datepicker.css" rel="stylesheet"/>
            <script src="/path/to/fecha.js"></script>
            <script src="/path/to/hotel-datepicker.min.js"></script> */}
        <Grid item>
          <TextField
            id="standard-search"
            label="Where are you going?"
            type="search"
            margin="normal"
          />
        </Grid>
        {/* <IconButton>
                <CalendarToday type="date"/>
            </IconButton> */}
        <Grid item>
          <Calendar label="Check-in" />
        </Grid>
        <Grid item>
          <Calendar label="Check-out" />
        </Grid>
        <Grid item container direction="row">
            <Typography >
            Room/Persons:
            </Typography>
          <TextField id="standard-select-currency-native" select label="" />
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={this.submit}>
            submit
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default SearchBox;
