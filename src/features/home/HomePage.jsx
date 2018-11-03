import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Autocomplete from "react-google-autocomplete";
import Paper from "@material-ui/core/Paper";
import SearchIcon from "@material-ui/icons/Search";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import firebase from "../../app/config/firebase";
import { connect } from "react-redux";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { DateRangePicker } from "react-dates";
import bg from "./bg.jpg";
import moment from "moment";
import { Link } from "react-router-dom";


const styles = theme => ({
  root: {
    flexGrow: 1,
    minHeight: "100%",
    height: "1000px",
    backgroundImage: `url(${bg})`,
    backgroundSize: "100%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top",
    position: "fix",
    top: "0",
  },
  mainpaper: {
    padding: "10px",
    opacity: "0.95",
    marginTop : "350px"
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
    backgroundColor: "primary",
    height: "47px",
    color: "#ffffff",
    marginLeft: "15px",
    marginRight: "15px",
    width: "100%",
    marginBottom: "15px",
    minWidth: "30px"
  },
  filterButton: {
    backgroundColor: "#409BE6",
    height: "40px",
    color: "#ffffff",
    marginRight: "15px",
    width: "96%",
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

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      place: null,
      NumOfRooms: 1,
      focusedInput: null,
      userReservations: [],
      disabled: false,
      startDate: moment(), // set your initial start date here
      endDate: moment().add(1, "days") // set your initial end date here
    };
  }

  //initially mount all the hotels info into the hotel list into state
  componentDidMount() {
    const db = firebase.firestore();

    // this._updateButtonDisable(this.state.startDate, this.state.endDate)====

    // Get users reservation dates if logged in
    if (this.props.auth.uid) {
      const reservationsQuery = db
        .collection("reservations")
        .where("userId", "==", this.props.auth.uid);

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
  }

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
      }
    }

    // toastr gets called
    if (disabled) {
      // toastr.warning('Conflicting Book Dates', 'Cannot book multiple hotels during the same time period.');
      window.alert("Conflicting reservation dates");
    }

    this.setState({ disabled });
  };

  //convert the ISO format data "2018-10-15" string to data object
  stringToDate = date => {
    var year = date.substring(0, 4);
    var month = date.substring(5, 7);
    var day = date.substring(8, 10);
    var d = new Date(year, month - 1, day);
    return d;
  };

  _handleNumOfRoomsChange = e => {
    this.props.setRooms(e.target.value);
    this.setState({ NumOfRooms: e.target.value });
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.root}>
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
              <Grid item xs={12} md={12} lg={4}>
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
                  position="absolute"
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={1}
                lg={1}
                className={classes.searchButtonWrapper}
              >
                <Link
                  to={{
                    pathname: "/search",
                    state: {
                      startDate: this.startDate,
                      endDate: this.endDate,
                      place: this.place,
                      rooms: this.rooms
                    }
                  }}
                  className={classes.searchButton}
                >
                  <Button
                    variant="contained"
                    className={classes.searchButton}
                    color="primary"
                  >
                    <SearchIcon />
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={2} md={2} lg={2} />
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
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
  )(HomePage)
);
