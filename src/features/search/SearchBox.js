import Calendar from "../../app/calendar/Calendar";
import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Autocomplete from "react-google-autocomplete";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    width: "60%",
    padding: 20,
    marginTop: 100,
    margin: 20,
    color: theme.palette.text.secondary
  },
  item: {
    paddingLeft: 100
  }
});

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
    const { classes } = this.props;
    return (
      <Grid container spacing={16} className={classes.root} alignItems="center">
        <Grid container spacing={8} sm={2} />
        <Paper className={classes.paper}>
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
          <Grid
            item
            sm={3}
            style={{
              width: "100%",
              marginLeft: 450,
              marginRight: 450,
              marginTop: 20,
              marginBottom: 20
            }}
          >
            <Calendar label="Check-in" />
          </Grid>
          <Grid
            item
            sm={3}
            style={{
              width: "100%",
              marginLeft: 450,
              marginRight: 450,
              marginTop: 20,
              marginBottom: 20
            }}
          >
            <Calendar label="Check-out" />
          </Grid>

          <Grid
            item
            sm={3}
            style={{
              width: "100%",
              marginLeft: 450,
              marginRight: 450,
              marginTop: 20,
              marginBottom: 20
            }}
          >
            <Typography variant="title" gutterBottom>
              Room/Persons:
            </Typography>
            <TextField id="standard-select-currency-native" select />
          </Grid>

          <Grid
            item
            sm={3}
            style={{
              width: "100%",
              marginLeft: 450,
              marginRight: 450,
              marginTop: 20,
              marginBottom: 20
            }}
          >
            <Button size="medium" variant="contained" onClick={this.submit}>
              submit
            </Button>
          </Grid>
        </Paper>
      </Grid>
    );
  }
}

export default withStyles(styles)(SearchBox);
