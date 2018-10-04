import Calendar from "../../app/calendar/Calendar";
import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Autocomplete from "react-google-autocomplete";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from '@material-ui/icons/Search'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    width: "100%",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 20,
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
      <Grid container className={classes.root} spacing={16}>
        <Grid item sm={1} />
        <Grid item sm={9}>
          <Paper className={classes.paper}>
            <Grid container>
              <Grid container>
                  <Typography variant="title" gutterBottom>
                    Room/Persons:
                  </Typography>
                <TextField id="standard-select-currency-native" select />
              </Grid>
              <Grid
                item
                sm={9}
                style={{
                  paddingTop: 20,
                  paddingRight: 10
                }}
              >
                <Autocomplete
                  style={{
                    width: "100%",
                    innerHeight: "100"
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
              <Grid item sm={1}>
                <Calendar label="Check-in" />
              </Grid>
              <Grid item sm={1}>
                <Calendar label="Check-out" />
              </Grid>
              <Grid item sm={1}>
                <Button size="medium" variant="contained" onClick={this.submit}>
                <SearchIcon/>
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(SearchBox);
