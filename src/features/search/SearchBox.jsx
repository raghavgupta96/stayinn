import React, { Component } from "react";
import Button from "@material-ui/core/Button";
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
import firebase from "../../app/config/firebase";
import FilterBox from "./filterBox";
import { connect } from "react-redux";
import Rewards from "./RewardsBox";
import Info from "./Info";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { DateRangePicker } from "react-dates";
import bg from "./bg.png";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  secondaryContainer: {
    height: "800px",
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    overflow: "hidden",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: "100%",
    marginBottom: "15px"
  },
  mainpaper: {
    width: "100%",
    marginTop: "350px",
    marginBottom: "20px",
    padding: "10px"
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
    fontSize: "21px",
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
    
    paddingTop: "17px",
    paddingRight: "5px",
    paddingLeft: "15px"
  },
  rewardsBox: {
    marginTop: "15px"
  }
});

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomSize: 1,
      searchKey: "",
      place: null,
      NumOfRooms: 1,
      hotels: [],
      startDate: null,
      endDate: null,
      focusedInput: null
    };
  }

  //initially mount all the hotels info into the hotel list into state
  componentDidMount() {
    // console.log(
    //   "This props reservation start date: -----------> " +
    //     this.props.reservation.startdate
    // );
    // console.log("This state NumOfRoom: -----------> "+ this.state.NumOfRooms);

    const startDateOj = new Date(this.state.startDate);
    const endDateOj = new Date(this.state.endDate);

    //convert the date object to string format yyyy-mm-dd
    //because hotels would not let me push a date object into to hotels array
    //startDate string
    const date = startDateOj;
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const sDate = year + "-" + month + "-" + day;
    //endDate string
    const edate = endDateOj;
    const eYear = edate.getFullYear();
    const eMonth = edate.getMonth() + 1;
    const eDay = edate.getDate();
    const eDate = eYear + "-" + eMonth + "-" + eDay;

    const db = firebase.firestore();

    //uery the hotel data from firestore
    db.collection("testingHotels")
      .get()
      .then(collection => {
        const hotels = [];
        // console.log("hotels -----" + hotels);

        //map all the needed hotel information to the state
        collection.forEach(doc => {
          // doc.data() is never undefined for query doc snapshots
          //-----testing-----
          // console.log(doc.id, " => ", doc.data());
          hotels.push({
            name: doc.data().name,
            hID: doc.id,
            room_cap: doc.data().maxBeds,
            photoUrl: doc.data().photoURL,
            type: doc.data().type,
            rate1: doc.data().room1,
            rate2: doc.data().room2,
            rate3: doc.data().room3,
            rate4: doc.data().room4,
            rating: doc.data().rating,
            address:
              doc.data().street +
              ", " +
              doc.data().city +
              ", " +
              doc.data().state +
              ", " +
              doc.data().zip,
            maxCap: doc.data().maxBeds,
            startDate: sDate,
            endDate: eDate,
            roomType: this.props.reservation.roomType,
            rooms: this.props.reservation.rooms
          });
          // console.log("hotels -----" + hotels);
        });
        this.setState({ hotels });
      });
  }

  //convert the ISO format data "2018-10-15" string to data object
  stringToDate = date => {
    var year = date.substring(0, 4);
    var month = date.substring(5, 7);
    var day = date.substring(8, 10);
    var d = new Date(year, month - 1, day);
    return d;
  };

  //----these code for material ui calendar. app has shift to airbnb calendar on 10/25/2018
  // _handleCheckinDate = e => {
  //   //convert the iso data "2018-05-15" string to data object
  //   const date = this.stringToDate(e.target.value);
  //   //set the store state
  //   this.props.setStartDate(date);
  // };

  // _handleCheckoutDate = e => {
  //   // convert the checkout date string to date object
  //   const date = this.stringToDate(e.target.value);
  //   // console.log(this.state.checkoutDate);
  //   //set the store state
  //   this.props.setEndDate(date);
  // };

  _handleRoomSizeChange = e => {
    this.props.setRoomType(e.target.value);
    this.setState({ roomSize: e.target.value });
  };

  _handleNumOfRoomsChange = e => {
    this.props.setRooms(e.target.value);
    this.setState({ NumOfRooms: e.target.value });
  };

  submit = () => {
    // console.log("----- Test the Store values-------------");
    // console.log(
    //   "this.props.reservation.startdate ++++++++++++>" +
    //     this.props.reservation.startdate
    // );
    // console.log(
    //   "this.props.reservation.enddate -------------->" +
    //     this.props.reservation.enddate
    // );
    // console.log(
    //   "this.props.reservation.roomtype -------------->" +
    //     this.props.reservation.roomtype
    // );
    // console.log(
    //   "this.props.reservation.rooms -------------->" +
    //     this.props.reservation.rooms
    // );

    // console.log("__________submitted_____________");
    //do functional here
    const startDateOj = new Date(this.state.startDate);
    const endDateOj = new Date(this.state.endDate);
    // console.log("Checkin Date: " + startDateOj);
    // console.log("Checkin Date: " + endDateOj);
    // console.log(" Hotels in state: " + this.state.hotels);
    this.props.setStartDate(startDateOj);
    this.props.setEndDate(endDateOj);

    //convert the date object to string format yyyy-mm-dd
    //because hotels would not let me push a date object into to hotels array
    //startDate string
    const date = startDateOj;
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const sDate = year + "-" + month + "-" + day;
    //endDate string
    const edate = endDateOj;
    const eYear = edate.getFullYear();
    const eMonth = edate.getMonth() + 1;
    const eDay = edate.getDate();
    const eDate = eYear + "-" + eMonth + "-" + eDay;

    console.log(
      "Start date in redux store: " + this.props.reservation.startDate
    );
    console.log("End date in redux store: " + this.props.reservation.endDate);

    //---------------------Searching-----------------------------
    // filtering the hotel with "CityName_RoomCap"
    const db = firebase.firestore();
    //uery the hotel data from firestore
    //if user does not enter city
    if (this.state.place === null) {
      const searchKey = this.state.roomSize;
      console.log("searchKey ------->" + searchKey);
      const upperBoundOfSearchKey = 4;
      db.collection("testingHotels")
        .where("maxBeds", ">=", searchKey)
        .where("maxBeds", "<=", upperBoundOfSearchKey)
        .get()
        .then(collection => {
          const hotels = [];
          //map all the needed hotel information to the state
          collection.forEach(doc => {
            //-----testing-----
            console.log(doc.id, " => ", doc.data());

            hotels.push({
              name: doc.data().name,
              hID: doc.id,
              room_cap: doc.data().maxBeds,
              photoUrl: doc.data().photoURL,
              type: doc.data().type,
              rate1: doc.data().room1,
              rate2: doc.data().room2,
              rate3: doc.data().room3,
              rate4: doc.data().room4,
              rating: doc.data().rating,
              address:
                doc.data().street +
                ", " +
                doc.data().city +
                ", " +
                doc.data().state +
                ", " +
                doc.data().zip,
              maxCap: doc.data().maxBeds,
              startDate: sDate,
              endDate: eDate,
              roomType: this.props.reservation.roomType,
              rooms: this.props.reservation.rooms
            });
          });
          this.setState({ hotels });
        });
    } else {
      const searchKey = this.state.place.name + "_" + this.state.roomSize;
      const upperBoundOfSearchKey = this.state.place.name + "_" + "4";
      console.log("searchKey ------->" + searchKey);
      db.collection("testingHotels")
        .where("searchKey", ">=", searchKey)
        .where("searchKey", "<=", upperBoundOfSearchKey)
        .get()
        .then(collection => {
          const hotels = [];
          console.log("hotels ----->" + hotels);
          //map all the needed hotel information to the state
          collection.forEach(doc => {
            // doc.data() is never undefined for query doc snapshots
            //-----testing-----
            // console.log(doc.id, " => ", doc.data());

            hotels.push({
              name: doc.data().name,
              hID: doc.id,
              room_cap: doc.data().maxBeds,
              photoUrl: doc.data().photoURL,
              type: doc.data().type,
              rate1: doc.data().room1,
              rate2: doc.data().room2,
              rate3: doc.data().room3,
              rate4: doc.data().room4,
              rating: doc.data().rating,
              address:
                doc.data().street +
                ", " +
                doc.data().city +
                ", " +
                doc.data().state +
                ", " +
                doc.data().zip,
              maxCap: doc.data().maxBeds,
              startDate: sDate,
              endDate: eDate,
              roomType: this.props.reservation.roomType,
              rooms: this.props.reservation.rooms
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
        <Grid>
          {/* <img
            src={bg}
            alt="logo"
            style={{
              backgroundSize: "cover",
              overflow: "hidden",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              width: "100%"
            }}
          /> */}
        </Grid>
        <Grid
          container
          xs={12}
          md={12}
          lg={12}
          className={classes.secondaryContainer}
        >
          <Grid item xs={2} md={2} lg={2} />
          <Grid item xs={8} md={8} lg={8}>
            <Paper className={classes.mainpaper}>
              <Grid container>
                <Grid container>
                  <Grid item>
                    <Typography
                      gutterBottom
                      variant="title"
                      className={classes.typography}
                    >
                      Room Capacity:
                    </Typography>
                  </Grid>
                  <Grid item>
                    <FormControl className={classes.droppedDownNumber}>
                      <Select
                        value={this.state.roomSize}
                        onChange={this._handleRoomSizeChange}
                        displayEmpty
                        name="roomSize"
                        className={classes.selectEmpty}
                      >
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
                        onChange={this._handleNumOfRoomsChange}
                        displayEmpty
                        name="NumOfRooms"
                        className={classes.selectEmpty}
                      >
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
                  lg={7}
                  className={classes.googleSearchContainer}
                >
                  <Autocomplete
                    className={classes.googleSearch}
                    onPlaceSelected={place => {
                      // console.log(place);
                      this.setState({ place: place });
                      //testing
                      console.log(this.state.place.name);
                    }}
                    types={["(regions)"]}
                    componentRestrictions={{ country: "us" }}
                  />
                </Grid>
                {/* <Grid item xs={6} md={2} lg={1}>
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
              </Grid> */}
                <Grid item xs={12} md={12} lg={4}>
                  <DateRangePicker
                    startDateId="startDate"
                    endDateId="endDate"
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    onDatesChange={({ startDate, endDate }) => {
                      this.setState({ startDate, endDate });
                    }}
                    focusedInput={this.state.focusedInput}
                    onFocusChange={focusedInput => {
                      this.setState({ focusedInput });
                    }}
                  />
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
                    color="primary"
                  >
                    <SearchIcon />
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={2} md={2} lg={2} />
        </Grid>
        <Grid container className={classes.root} xs={12} md={12} lg={12}>
          <Grid item xs={1} md={1} lg={1} />
          <Grid item xs={2} md={2} lg={2}>
            <Grid xs={12} md={12} lg={12}>
              <FilterBox />
            </Grid>
            <Grid xs={12} md={12} lg={12} className={classes.rewardsBox}>
              <Rewards />
            </Grid>
            <Grid xs={12} md={12} lg={12} className={classes.rewardsBox}>
              <Info />
            </Grid>
          </Grid>
          <Grid item xs={9} md={9} lg={8}>
            <SearchResult hotels={this.state.hotels} />
          </Grid>
          <Grid item xs={1} md={1} lg={1} />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    reservation: state.reservation
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setStartDate: date => {
      dispatch({
        type: "SET_STARTDATE",
        payload: date
      });
    },
    setEndDate: date => {
      dispatch({
        type: "SET_ENDDATE",
        payload: date
      });
    },
    setRooms: num => {
      dispatch({
        type: "SET_ROOMS",
        payload: num
      });
    },
    setRoomType: date => {
      dispatch({
        type: "SET_ROOMTYPE",
        payload: date
      });
    }
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SearchBox)
);
