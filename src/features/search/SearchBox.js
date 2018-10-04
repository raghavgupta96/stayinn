import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Autocomplete from "react-google-autocomplete";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    width: "100%",
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15,
    paddingTop: 10,
    marginTop: 100,
    margin: 20,
    color: theme.palette.text.secondary
  },
  formControl: {
    minWidth: 50,
    paddingTop: 5
  }
});

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkinDate: null,
      checkoutDate: null,
      roomnumber: "",
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

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
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
          <Paper className={classes.paper}>
            <Grid container>
              <Grid sm={12}>
                <Grid
                  container
                  style={{
                    paddingBottom: 5
                  }}
                >
                  <Grid sm={1}>
                    <Typography
                      variant="title"
                      gutterBottom
                      color="inherit"
                      style={{
                        fontFamily: "Times",
                        fontSize: 20,
                        lineHeight: 1,
                        paddingTop: 10
                      }}
                    >
                      Room Size:
                    </Typography>
                  </Grid>
                  <Grid sm={2}>
                    <FormControl className={classes.formControl}>
                      <Select
                        value={this.state.roomnumber}
                        onChange={this.handleChange}
                        displayEmpty
                        name="roomnumber"
                        className={classes.selectEmpty}
                      >
                        <MenuItem value="">1</MenuItem>
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
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
                    height: 45,
                    fontSize: 18,
                    fontFamily: "Times"
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
                    marginRight: 20
                  }}
                >
                  <TextField
                    id="date"
                    label="Checkout Date"
                    type="date"
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
                    backgroundColor: "#ffffff",
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
