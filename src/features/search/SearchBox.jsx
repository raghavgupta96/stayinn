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
import firebase from '../../app/config/firebase';

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
      // hotels: []
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

    //mount all the hotels info into the hotel list into state
    componentDidMount() {
      const db = firebase.firestore();

      //uery the hotel data from firestore
      db.collection("testingHotels").get().then(collection => {
        const hotels= [];
        console.log("hotels -----" + hotels);

        //map all the needed hotel information to the state
        collection.forEach(doc => {
            // doc.data() is never undefined for query doc snapshots
            //-----testing-----
            console.log(doc.id, " => ", doc.data());

            // console.log("name: " + doc.data().name );
            // console.log("hID: " + doc.id);
            // console.log("room_cap: " + doc.data().maxBeds );
            // console.log("photoUrl: " + doc.data().photoURL );
            // console.log("photoUrl: " + doc.data().type);


            hotels.push({
              name: doc.data().name,
              hID: doc.id,
              room_cap: doc.data().maxBeds,
              photoUrl: doc.data().photoURL,
              type: doc.data().type
            });
            console.log("hotels -----" + hotels);
        });
        this.setState({ hotels });
    });
  
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
    console.log(" Hotels in state: " + this.state.hotels);
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.root} spacing={16} xs={12}>
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
              <Grid item xs={6} md={2}>
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
              <Grid item xs={6} md={2}>
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
              <Grid item xs={12} md={1} className={classes.searchButtonWrapper}>
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
        <SearchResult hotels={this.state.hotels} />
      </Grid>
    );
  }
}

export default withStyles(styles)(SearchBox);
