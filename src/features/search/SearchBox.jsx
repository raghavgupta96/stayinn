import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Autocomplete from "react-google-autocomplete";
import Paper from "@material-ui/core/Paper";
import SearchIcon from "@material-ui/icons/Search";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import SearchResult from "./result/SearchResult";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import firebase from "../../app/config/firebase";
import FilterBox from "./filter/filterBox";
import { connect } from "react-redux";
import Rewards from "./RewardsBox";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { DateRangePicker } from "react-dates";
import bg from "./bg.jpg";
import moment from "moment";
import Modal from "@material-ui/core/Modal";
import CloseIcon from "@material-ui/icons/Close";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  secondaryContainer: {
    // Make into 100%
    height: "500px",
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    overflow: "hidden",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: "100%"
  },
  mainpaper: {
    padding: "20px",
    opacity: "0.95",
    marginTop: "40px",
    zIndex: "1"
  },
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  },
  droppedDownNumber: {
    paddingBottom: "15px"
  },
  googleSearch: {
    width: "100%",
    height: "45px",
    fontSize: "21px",
    border: "none",
    borderBottomStyle: "solid",
    borderBottomWidth: "1px",
    outline: "0"
  },
  searchButton: {
    backgroundColor: "primary",
    height: "47px",
    color: "#ffffff",
    width: "100%",
    minWidth: "30px"
  },
  applyButton: {
    backgroundColor: "primary",
    height: "40px",
    color: "#ffffff",
    width: "100%",
    minWidth: "30px"
  },
  searchButtonWrapper: {
    flexWrap: "wrap",
    display: "flex"
  },
  typography: {
    paddingTop: "2px"
  },
  modal_title: {
    paddingBottom: "17px",
    fontSize: "24px"
  },
  datePicker: {
    paddingLeft: "20px",
    paddingRight: "20px"
  }
});

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomSize: 1,
      searchKey: "",
      place: null,
      rooms: 1,
      hotels: [],
      focusedInput: null,
      userReservations: [],
      disabled: false,
      isLoading: true,
      reward: null,
      startDate: moment(), // set your initial start date here
      endDate: moment().add(1, "days"), // set your initial end date here
      // modal
      open: false
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.auth.uid !== prevProps.auth.uid) {
      this.checkReservationConflicts();
    }
  }

  //initially mount all the hotels info into the hotel list into state
  componentDidMount() {
    //convert the date object to string format yyyy-mm-dd
    //because hotels would not let me push a date object into to hotels array
    //startDate string
    if (this.props.reservation.startDate !== null) {
      //update the local state
      const sDateMonmet = moment(this.props.reservation.startDate);
      this.setState({ startDate: sDateMonmet });
    }
    if (this.props.reservation.endDate !== null) {
      const eDateMoment = moment(this.props.reservation.endDate);
      this.setState({ endDate: eDateMoment });
    }
    this.setState({ rooms: this.props.reservation.rooms });

    const db = firebase.firestore();

    // if the home page pass the place to search page
    if (this.props.reservation.place !== null) {
      this.setState({ place: this.props.reservation.place });

      const searchKey = this.props.reservation.place.name;

      db.collection("testingHotels")
        .where("city", "==", searchKey)
        .get()
        .then(collection => {
          var hotels = [];
          // console.log("hotels ----->" + hotels);
          //map all the needed hotel information to the state
          collection.forEach(doc => {
            // doc.data() is never undefined for query doc snapshots
            //-----testing-----
            // console.log(doc.id, " => ", doc.data());

            hotels.push({
              name: doc.data().name,
              hID: doc.id,
              photoUrl: doc.data().photoURL,
              type: doc.data().type,
              price: doc.data().price,
              rating: doc.data().rating,
              address:
                doc.data().street +
                ", " +
                doc.data().city +
                ", " +
                doc.data().state +
                ", " +
                doc.data().zip,
              gym: doc.data().gym,
              bar: doc.data().bar,
              swimmingPool: doc.data().swimmingPool
            });
          });

          this.setState({ hotels });
          this.setState({isLoading: false});
        });
    } else {
      //uery the hotel data from firestore
      db.collection("testingHotels")
        .get()
        .then(collection => {
          var hotels = [];
          // console.log("hotels -----" + hotels);

          //map all the needed hotel information to the state
          collection.forEach(doc => {
            // doc.data() is never undefined for query doc snapshots
            //-----testing-----
            // console.log(doc.id, " => ", doc.data());
            hotels.push({
              name: doc.data().name,
              hID: doc.id,
              photoUrl: doc.data().photoURL,
              type: doc.data().type,
              price: doc.data().price,
              rating: doc.data().rating,
              address:
                doc.data().street +
                ", " +
                doc.data().city +
                ", " +
                doc.data().state +
                ", " +
                doc.data().zip,
              gym: doc.data().gym,
              bar: doc.data().bar,
              swimmingPool: doc.data().swimmingPool
            });
          });

          this.setState({ hotels });
          this.setState({isLoading: false});
        });
    }

    this.checkReservationConflicts();
  }

  checkReservationConflicts = () => {
    const db = firebase.firestore();

    // Get users reservation dates if logged in
    if (this.props.auth.uid) {
      const reservationsQuery = db
        .collection("reservations")
        .where("userId", "==", this.props.auth.uid)
        .where("isCanceled", "==", false);

      reservationsQuery.get().then(collection => {
        //get all reservation for booking conflict check
        const userReservations = [];

        collection.forEach(doc => {
          const { startDate, endDate } = doc.data();
          userReservations.push({
            startDate: startDate.toDate(),
            endDate: endDate.toDate()
          });
        });
        this.setState({ userReservations });
        this._updateButtonDisable({
          startDate: this.state.startDate,
          endDate: this.state.endDate
        });
      });

      //get the user rewards info
      var docRef = firebase
        .firestore()
        .collection("users")
        .doc(this.props.auth.uid);
      docRef.get().then(doc => {
        if (doc.exists) {
          this.setState({
            reward: doc.data().reward
          });
        } else {
          console.log("No such document!");
        }
      });
    }
  };

  //convert the ISO format data "2018-10-15" string to data object
  stringToDate = date => {
    var year = date.substring(0, 4);
    var month = date.substring(5, 7);
    var day = date.substring(8, 10);
    var d = new Date(year, month - 1, day);
    return d;
  };

  dateToString = date => {
    const temp = date;
    const year = temp.getFullYear();
    const month = temp.getMonth() + 1;
    const day = temp.getDate();
    return year + "-" + month + "-" + day;
  };

  // Close the modal
  handleClose = () => {
    this.setState({
      open: false
    });
  };

  getModalStyle = () => {
    const top = 50;
    const left = 50;

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
      borderRadius: 15
    };
  };

  //--------------------- Search button -----------------------------
  submit = () => {
    //do functional here
    const startDateObj = new Date(this.state.startDate);
    const endDateObj = new Date(this.state.endDate);
    this.props.setStartDate(startDateObj);
    this.props.setEndDate(endDateObj);

    //---------------------Searching-----------------------------
    // filtering the hotel with "CityName_RoomCap"
    const db = firebase.firestore();

    //uery the hotel data from firestore
    //if user does not enter city
    if (this.state.place === null) {
      db.collection("testingHotels")
        .get()
        .then(collection => {
          var hotels = [];
          //map all the needed hotel information to the state
          collection.forEach(doc => {
            //-----testing-----
            console.log(doc.id, " => ", doc.data());

            hotels.push({
              name: doc.data().name,
              hID: doc.id,
              photoUrl: doc.data().photoURL,
              type: doc.data().type,
              price: doc.data().price,
              rating: doc.data().rating,
              address:
                doc.data().street +
                ", " +
                doc.data().city +
                ", " +
                doc.data().state +
                ", " +
                doc.data().zip,
              gym: doc.data().gym,
              bar: doc.data().bar,
              swimmingPool: doc.data().swimmingPool
            });
          });

          // filtering from the hotles object
          // var filteredResult = hotels;
          if (this.props.filter.hotelType === "hotel") {
            hotels = hotels.filter(v => v.type === "hotel");
          }
          if (this.props.filter.hotelType === "motel") {
            hotels = hotels.filter(v => v.type === "motel");
          }
          if (this.props.filter.gymChecked === true) {
            hotels = hotels.filter(v => v.gym === true);
          }
          if (this.props.filter.barChecked === true) {
            hotels = hotels.filter(v => v.bar === true);
          }
          if (this.props.filter.swimmingPoolChecked === true) {
            hotels = hotels.filter(v => v.swimmingPool === true);
          }
          if (this.props.filter.sortOrder === "up") {
            hotels.sort(this.up);
          }
          if (this.props.filter.sortOrder === "down") {
            hotels.sort(this.down);
          }

          console.log("the minPrice: -------" + this.props.filter.minPrice);
          //filter in the hotel by the roomsize and corresponding price, greater than Min price
          if (this.props.filter.minPrice !== "") {
            hotels = hotels.filter(v => v.price >= this.props.filter.minPrice);
          }

          console.log("the maxPrice: -------" + this.props.filter.maxPrice);
          //filter in the hotel by the roomsize and corresponding price, greater than Max price
          if (this.props.filter.maxPrice !== "") {
            hotels = hotels.filter(v => v.price <= this.props.filter.maxPrice);
          }
          this.setState({ hotels })
          this.setState({isLoading: false});;
        });
    } else {
      const searchKey = this.state.place.name;

      db.collection("testingHotels")
        .where("city", "==", searchKey)
        .get()
        .then(collection => {
          var hotels = [];
          // console.log("hotels ----->" + hotels);
          //map all the needed hotel information to the state
          collection.forEach(doc => {
            // doc.data() is never undefined for query doc snapshots
            //-----testing-----
            // console.log(doc.id, " => ", doc.data());

            hotels.push({
              name: doc.data().name,
              hID: doc.id,
              photoUrl: doc.data().photoURL,
              type: doc.data().type,
              price: doc.data().price,
              rating: doc.data().rating,
              address:
                doc.data().street +
                ", " +
                doc.data().city +
                ", " +
                doc.data().state +
                ", " +
                doc.data().zip,
              gym: doc.data().gym,
              bar: doc.data().bar,
              swimmingPool: doc.data().swimmingPool
            });
          });

          // filtering from the hotles object
          // var filteredResult = hotels;
          if (this.props.filter.hotelType === "hotel") {
            hotels = hotels.filter(v => v.type === "hotel");
          }
          if (this.props.filter.hotelType === "motel") {
            hotels = hotels.filter(v => v.type === "motel");
          }
          if (this.props.filter.gymChecked === true) {
            hotels = hotels.filter(v => v.gym === true);
          }
          if (this.props.filter.barChecked === true) {
            hotels = hotels.filter(v => v.bar === true);
          }
          if (this.props.filter.swimmingPoolChecked === true) {
            hotels = hotels.filter(v => v.swimmingPool === true);
          }
          if (this.props.filter.sortOrder === "up") {
            hotels.sort(this.up);
          }
          if (this.props.filter.sortOrder === "down") {
            hotels.sort(this.down);
          }

          //filter in the hotel by the roomsize and corresponding price, greater than Min price
          if (this.props.filter.minPrice !== "") {
            hotels = hotels.filter(v => v.price >= this.props.filter.minPrice);
          }

          //filter in the hotel by the roomsize and corresponding price, greater than Max price
          if (this.props.filter.maxPrice !== "") {
            hotels = hotels.filter(v => v.price <= this.props.filter.maxPrice);
          }

          this.setState({ hotels });
          this.setState({isLoading: false});
        })
    }
  };

  up = (x, y) => {
    return x.price - y.price;
  };

  down = (y, x) => {
    return x.price - y.price;
  };

  _handleNumOfRoomsChange = e => {
    this.setState({ rooms: e.target.value });
    this.props.setRooms(e.target.value);
  };

  _updateButtonDisable = ({ startDate, endDate }) => {
    const { userReservations } = this.state;

    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    let disabled = false;
    for (let reservation in userReservations) {
      if (
        startDateObj.getTime() <=
          userReservations[reservation].endDate.getTime() &&
        endDateObj.getTime() >=
          userReservations[reservation].startDate.getTime()
      ) {
        disabled = true;
        this.setState({ open: true });
      }
    }

    // toastr gets called
    // if (disabled) {
    //   // toastr.warning('Conflicting Book Dates', 'Cannot book multiple hotels during the same time period.');
    //   window.alert("Conflicting reservation dates");
    // }

    this.setState({ disabled });
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid container className={classes.root} xs={12} md={12} lg={12}>
        <Grid
          container
          xs={12}
          md={12}
          lg={12}
          className={classes.secondaryContainer}
        >
          <Grid item xs={0} md={2} lg={2} />
          <Grid item xs={12} md={8} lg={8}>
            <Paper className={classes.mainpaper}>
              <Grid container>
                <Grid item xs={12} md={12} lg={12} container>
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
                    <FormControl>
                      <Select
                        value={this.state.rooms}
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
                <Grid
                  item
                  xs={12}
                  md={12}
                  lg={4}
                  className={classes.datePicker}
                >
                  <DateRangePicker
                    startDateId="startDate"
                    endDateId="endDate"
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    onDatesChange={({ startDate, endDate }) => {
                      this.setState({ startDate, endDate });
                      this._updateButtonDisable({ startDate, endDate });
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
          <Grid item xs={0} md={2} lg={2} />
        </Grid>

        <Grid item xs={1} md={1} lg={1} />
        <Grid item xs={12} md={2} lg={2}>
          <Grid xs={12} md={12} lg={12}>
            <FilterBox />
            <Button
              variant="contained"
              onClick={this.submit}
              className={classes.applyButton}
              color="primary"
            >
              {" "}
              apply
            </Button>
          </Grid>
          <Grid xs={12} md={12} lg={12} className={classes.rewardsBox}>
            <Rewards reward={this.state.reward} />
          </Grid>
        </Grid>
        <Grid item xs={12} md={9} lg={9}>
          <SearchResult
            disabled={this.state.disabled}
            hotels={this.state.hotels}
            isLoading={this.state.isLoading}
          />
        </Grid>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={this.getModalStyle()} className={classes.paper}>
            <Typography variant="h6" className={classes.modal_title}>
              Alert: conflict reservation dates
            </Typography>
            <div />
            <Typography variant="subtitle1" id="simple-modal-description">
              Please pick a different Checkin date or Checkout date
            </Typography>
            <Typography variant="subtitle1" id="simple-modal-description">
              to enable the book button.
            </Typography>
            <div style={{ textAlign: "right" }}>
              <button
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  outline: "none"
                }}
                onClick={this.handleClose}
              >
                <CloseIcon className={classes.iconHover} />
              </button>
            </div>
          </div>
        </Modal>

        {/* <Grid item xs={0} md={1} lg={1} /> */}
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    reservation: state.reservation,
    filter: state.filter,
    auth: state.firebase.auth // auth.uid
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
