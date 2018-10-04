import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Autocomplete from "react-google-autocomplete";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";

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
    this.state = {
      checkinDate: null,
      checkoutDate: null,
      badsNumber: [{ number: 1 }, { number: 2 }]
    };
  }

  _handleCheckinDate = e => {
    this.setState({
      checkinDate: e.target.value
    });
    console.log(this.state.checkinDate);
  };

  _handleCheckoutDate = e => {
    this.setState({
      checkoutDate: e.target.value
    });
    console.log(this.state.checkoutDate);
  };

  submit = () => {
    console.log("submitted");
    //do functional here
    console.log("Checkin Date" + this.state.checkinDate);
    console.log("Checkout Date" + this.state.checkoutDate);
  };
  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.root} spacing={16}>
        <Grid item sm={1} />
        <Grid item sm={9}>
          <Paper
            className={classes.paper}
            style={{
              backgroundColor: "#409BE6"
            }}
          >
            <Grid container>
              <Grid container>
                <Typography
                  variant="title"
                  gutterBottom
                  color="inherit"
                  style={{
                    color: "#ffffff"
                  }}
                >
                  Room Size:
                </Typography>
                <TextField id="standard-select-currency-native" select />
              </Grid>
              <Grid
                item
                sm={7}
                style={{
                  paddingRight: 20
                }}
              >
                <Autocomplete
                  style={{
                    width: "100%",
                    innerHeight: "100",
                    height: 45
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
              <Grid item sm={2}>
                <Paper
                  style={{
                    backgroundColor: "#E6F6FF",
                    marginRight: 20
                  }}
                >
                  <TextField
                    id="date"
                    label="Checkin Date"
                    type="date"
                    value={this.state.checkinDate}
                    InputLabelProps={{
                      shrink: true
                    }}
                    onChange={this._handleCheckinDate}
                  />
                </Paper>
              </Grid>
              <Grid item sm={2}>
                <Paper
                  style={{
                    backgroundColor: "#E6F6FF",
                    marginRight: 20
                  }}
                >
                  <TextField
                    id="date"
                    label="Checkout Date"
                    type="date"
                    style={{
                      color: "#ffffff"
                    }}
                    value={this.state.checkoutDate}
                    InputLabelProps={{
                      shrink: true
                    }}
                    onChange={this._handleCheckoutDate}
                  />
                </Paper>
              </Grid>
              <Grid item sm={1}>
                <Button
                  size="medium"
                  style={{
                    backgroundColor: "white",
                    color: "#409BE6",
                    height: 47
                  }}
                  variant="contained"
                  onClick={this.submit}
                >
                  <SearchIcon />
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
