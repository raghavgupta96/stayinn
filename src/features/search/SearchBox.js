import Calendar from "../../app/calendar/Calendar";
import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Autocomplete from "react-google-autocomplete";

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  submit = () => {
    console.log("submitted");
    //do functional here
  };
  render() {
    return (
      // <Grid container direction="row" alignContent="flex-start" xl="3">
      //   <Grid item>
      <Grid container direction="column" spacing={24} alignItems="center">
        {/* <link  href="/path/to/hotel-datepicker.css" rel="stylesheet"/>
            <script src="/path/to/fecha.js"></script>
            <script src="/path/to/hotel-datepicker.min.js"></script> */}
        <Grid item>
          {/* -------Jun's Google auto complete codes that don't quite work with 
            with the over all code yet----- */}

          <Autocomplete
            style={{
              width: "100%"
            }}
            onPlaceSelected={place => {
              // console.log(place);
              this.setState({ place });
              //testing
              console.log(this.state.place.name);
            }}
            types={["(regions)"]}
            componentRestrictions={{ country: "us" }}
          />
        </Grid>
        <Grid item />
        {/* <IconButton>
                <CalendarToday type="date"/>
            </IconButton> */}
        <Grid item>
          <Calendar label="Check-in" />
        </Grid>
        <Grid item>
          <Calendar label="Check-out" />
        </Grid>
        <Grid item>
          <Grid container direction="row" alignItems="center">
            <Typography variant="title" gutterBottom>
              Room/Persons:
            </Typography>
            <TextField id="standard-select-currency-native" select />
          </Grid>
        </Grid>
        <Grid item>
          <Button size="medium" variant="contained" onClick={this.submit}>
            submit
          </Button>
        </Grid>
      </Grid>
      //   </Grid>
      // </Grid>
    );
  }
}

export default SearchBox;
