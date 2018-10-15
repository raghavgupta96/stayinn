import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Autocomplete from "react-google-autocomplete";
import Paper from "@material-ui/core/Paper";
import SearchIcon from "@material-ui/icons/Search";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import SearchResult from "./SearchResult";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  mainpaper: {
    width: "100%",
    marginTop: "100px",
    marginBottom: "20px"
  },
  googleSearchContainer: {
    paddingLeft: "15px",
    paddingRight: "15px"
  },
  droppedDownNumber: {
    minWidth: "50px",
    marginTop: "15px"
  },
  dateContainer: {
    display: "flex",
    flexWrap: "wrap",
    marginLeft: "15px",
    marginRight: "15px",
    marginBottom: "15px"
  },
  googleSearch: {
    width: "100%",
    height: "45px",
    fontSize: "18px",
    fontFamily: "Times",
    border: "none",
    borderBottomStyle: "solid",
    borderBottomWidth: "1px",
    outline: "0",
    marginBottom: "15px"
  },
  searchButton: {
    backgroundColor: "#409BE6",
    height: "47px",
    color: "#ffffff",
    marginLeft: "15px",
    marginRight: "15px",
    width: "100%",
    marginBottom: "15px",
    minWidth: "30px"
  },
  searchButtonWrapper: {
    flexWrap: "wrap",
    display: "flex"
  },
  typography: {
    fontFamily: "Times",
    fontSize: "20px",
    paddingTop: "17px",
    paddingRight: "5px",
    paddingLeft: "15px"
  }
});

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkinDate: null,
      checkoutDate: null,
      roomnumber: 1,
      hotels: [
        {
          name: "Hilton",
          hID: "1sdfsdfsdasdfasfewdsvae",
          room_cap: 4,
          photoUrl:
            "https://shinola.imgix.net/media/wysiwyg/landingpages/shinola-hotel/hotel-render-desktop-retina.jpg?ixlib=php-1.1.0&w=2560",
          key: 1
        },
        {
          name: "Hilton, San Jose",
          hID: "2XCxddsdasdfasfewdsvae",
          room_cap: 2,
          photoUrl:
            "https://shinola.imgix.net/media/wysiwyg/landingpages/shinola-hotel/hotel-render-desktop-retina.jpg?ixlib=php-1.1.0&w=2560",
          key: 2
        },
        {
          name: "Hotel 8, San Jose",
          hID: "3XCxddsdasdfasfewdsvae",
          room_cap: 1,
          photoUrl:
            "https://shinola.imgix.net/media/wysiwyg/landingpages/shinola-hotel/hotel-render-desktop-retina.jpg?ixlib=php-1.1.0&w=2560",
          key: 3
        },
        {
          name: "Mobil 6",
          hID: "4XCxddsdasdfasfewdsvae",
          room_cap: 3,
          photoUrl:
            "https://shinola.imgix.net/media/wysiwyg/landingpages/shinola-hotel/hotel-render-desktop-retina.jpg?ixlib=php-1.1.0&w=2560",
          key: 4
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
      <Grid container className={classes.root} xs={12} md={12} lg={12}>
        <Grid item xs={1} md={1} lg={1} />
        <Grid item xs={10} md={10} lg={10}>
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
                <Grid item>
                  <FormControl className={classes.droppedDownNumber}>
                    <Select
                      value={this.state.roomnumber}
                      onChange={this.handleChange}
                      displayEmpty
                      name="roomnumber"
                      className={classes.selectEmpty}
                    >
                      <MenuItem value="">#</MenuItem>
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                md={7}
                lg={9}
                className={classes.googleSearchContainer}
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
              <Grid item xs={6} md={2} lg={1}>
                <form className={classes.dateContainer} noValidate>
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
              <Grid item xs={6} md={2} lg={1}>
                <form className={classes.dateContainer} noValidate>
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
              <Grid
                item
                xs={12}
                md={1}
                lg={1}
                className={classes.searchButtonWrapper}
              >
                <Button
                  variant="contained"
                  onClick={this.submit}
                  className={classes.searchButton}
                >
                  <SearchIcon />
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={1} md={1} lg={1} />
        <Grid container className={classes.root} xs={12} md={12} lg={12}>
          <Grid item xs={1} md={1} lg={1}>
            filter box
          </Grid>
          <Grid item xs={10} md={10} lg={10}>
            <SearchResult hotels={this.state.hotels} />
          </Grid>
          <Grid item xs={1} md={1} lg={1} />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(SearchBox);
