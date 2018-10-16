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
      roomSize: 1,
      searchKey: "",
      place: null,
      NumOfRooms: 1,
      // hotels: []
      hotels: []
    };
  }

    //initially mount all the hotels info into the hotel list into state
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
            // push individual hotel to a object
            hotels.push({
              name: doc.data().name,
              hID: doc.id,
              room_cap: doc.data().maxBeds,
              photoUrl: doc.data().photoURL,
              type: doc.data().type,
              street: doc.data().street,
              city: doc.data().city,
              state: doc.data().state,
              price: doc.data().room1,
              bar: doc.data().bar,
              gym: doc.data().gym,
              swimmingPool: doc.data().swimmingPool
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
    console.log("this.state.NumOfRooms: "+ this.state.NumOfRooms);

    //---------------------Searching-----------------------------
    // filtering the hotel with "CityName_RoomCap"
    const db = firebase.firestore();
    //query the hotel data from firestore
    //if user did not enter the city. There is only room size.
    //(default room size is one)---------------------------------
    if(this.state.place === null){
      const searchKey = this.state.roomSize;
      console.log("searchKey ------->" + searchKey)
      const upperBoundOfSearchKey = 4;
      db.collection("testingHotels").where("maxBeds", ">=", searchKey).where("maxBeds", "<=", upperBoundOfSearchKey).get().then(collection => {
        const hotels= [];
        //map all the needed hotel information to the state
        collection.forEach(doc => {
            // doc.data() is never undefined for query doc snapshots
            //-----testing-----
            console.log(doc.id, " => ", doc.data());
  
            hotels.push({
              name: doc.data().name,
              hID: doc.id,
              room_cap: doc.data().maxBeds,
              photoUrl: doc.data().photoURL,
              type: doc.data().type,
              street: doc.data().street,
              city: doc.data().city,
              state: doc.data().state,
              price: doc.data().room1,
              bar: doc.data().bar,
              gym: doc.data().gym,
              swimmingPool: doc.data().swimmingPool
            });
        });
        this.setState({ hotels });
      });
    // if user enter the city and room size------------------------
    } else {
      const searchKey = this.state.place.name + "_" + this.state.roomSize;
      const upperBoundOfSearchKey = this.state.place.name + "_" + "4";
      console.log("searchKey ------->" + searchKey)
      db.collection("testingHotels").where("searchKey", ">=", searchKey).where("searchKey", "<=", upperBoundOfSearchKey).get().then(collection => {
        const hotels= [];
        console.log("hotels ----->" + hotels);
        //map all the needed hotel information to the state
        collection.forEach(doc => {
            //-----testing-----
            // console.log(doc.id, " => ", doc.data());
  
            hotels.push({
              name: doc.data().name,
              hID: doc.id,
              room_cap: doc.data().maxBeds,
              photoUrl: doc.data().photoURL,
              type: doc.data().type,
              street: doc.data().street,
              city: doc.data().city,
              state: doc.data().state,
              price: doc.data().room1,
              bar: doc.data().bar,
              gym: doc.data().gym,
              swimmingPool: doc.data().swimmingPool
            });
        });
        this.setState({ hotels });
      });
    }
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
                      value={this.state.roomSize}
                      onChange={this.handleChange}
                      displayEmpty
                      name="roomSize"
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
                <Grid item>
                  <Typography
                    gutterBottom
                    variant="title"
                    className={classes.typography}
                  >
                    Number of Rooms:
                  </Typography>
                </Grid>
                <Grid item>
                  <FormControl className={classes.droppedDownNumber}>
                    <Select
                      value={this.state.NumOfRooms}
                      onChange={this.handleChange}
                      displayEmpty
                      name="NumOfRooms"
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
                  onPlaceSelected={ place => {
                    // console.log(place);
                    this.setState({ place : place });
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
          <Grid item xs={2} md={2} lg={2}>
            filter box
          </Grid>
          <Grid item xs={10} md={10} lg={10}>
            <SearchResult hotels={this.state.hotels} />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(SearchBox);
