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
import SearchResult from './SearchResult'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  mainpaper: {
    width: "100%",
    padding: "15px",
    paddingTop: "10px",
    marginTop: "100px"
  },
  box: {
    paddingRight: "20px"
  },
  formControl: {
    minWidth: "50px",
    paddingTop: "8px",
    paddingLeft: "5px",
    marginBottom: "5px"
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    margin: "10px",
    marginTop: "0px"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  googleSearch: {
    width: "100%",
    height: "45px",
    fontSize: "18px",
    fontFamily: "Times",
    border: "none",
    borderBottomStyle: "solid",
    borderBottomWidth: "1px",
    outline: "0"
  },
  button: {
    backgroundColor: "#409BE6",
    height: "47px",
    color: "#ffffff"
  },
  typography: {
    fontFamily: "Times",
    fontSize: "20px",
    paddingTop: "10px"
  }
});

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkinDate: null,
      checkoutDate: null,
      roomnumber: "",
      hotels: [
        { name: "Hilton",
          hID: "sdfsdfsdasdfasfewdsvae",
          room_cap: 4,
          photoUrl: "https://shinola.imgix.net/media/wysiwyg/landingpages/shinola-hotel/hotel-render-desktop-retina.jpg?ixlib=php-1.1.0&w=2560",
          key: 1
        },
        { name: "Hilton, San Jose",
          hID: "XCxddsdasdfasfewdsvae",
          room_cap: 2,
          photoUrl: "https://shinola.imgix.net/media/wysiwyg/landingpages/shinola-hotel/hotel-render-desktop-retina.jpg?ixlib=php-1.1.0&w=2560",
          key: 2
        }
      ]
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
      <div>
        <Grid container className={classes.root} spacing={16} xs={12}>
          <Grid item xs={1} />
          <Grid item xs={10}>
            <Paper className={classes.mainpaper}>
              <Grid container>
                <Grid container>
                  <Grid item>
                    <Typography
                      gutterBottom
                      variant="title"
                      className={classes.typography}
                    >
                      Room Size:
                    </Typography>
                  </Grid>
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
                <Grid
                  item
                  xs={7}
                  className={classes.box}
                  style={{
                    paddingRight: "20px"
                  }}
                >
                  <Autocomplete
                    className={classes.googleSearch}
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
                <Grid item xs={2}>
                  <form className={classes.container} noValidate>
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
                  </form>
                </Grid>
                <Grid item xs={2}>
                  <form className={classes.container} noValidate>
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
                  </form>
                </Grid>
                <Grid item xs={1}>
                  <Button
                    className={classes.button}
                    variant="contained"
                    onClick={this.submit}
                  >
                    <SearchIcon />
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={1} />
          <SearchResult hotels={this.state.hotels} />
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(SearchBox);
