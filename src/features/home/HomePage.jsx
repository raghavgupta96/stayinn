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
import { connect } from "react-redux";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { DateRangePicker } from "react-dates";
import bg from "./bg.jpg";
import moment from "moment";
import { Link } from "react-router-dom";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  secondaryContainer: {
    // Make into 100%
    height: "1024px",
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    overflow: "hidden",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: "100%",
    marginTop: "-100px"
  },
  mainpaper: {
    padding: "20px",
    opacity: "0.95",
    marginTop: "250px",
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

  componentDidMount() {
    if (this.props.reservation.startDate !== null) {
      //update the local state
      const sDateMonmet = moment(this.props.reservation.startDate);
      this.setState({ startDate: sDateMonmet });
    } else {
      this.props.setStartDate(new Date());
      console.log(">>>>>>>_______new data here" + new Date());
    }
    if (this.props.reservation.endDate !== null) {
      const eDateMoment = moment(this.props.reservation.endDate);
      this.setState({ endDate: eDateMoment });
    }
    if (this.props.reservation.rooms !== null) {
      this.setState({ rooms: this.props.reservation.rooms });
    }
  }

  _handleNumOfRoomsChange = e => {
    this.props.setRooms(e.target.value);
    this.setState({ NumOfRooms: e.target.value });
  };

  _handleDateChange = (sDate, eDate) => {
    if (sDate !== null) {
      const sDateObj = sDate.toDate();
      this.props.setStartDate(sDateObj);
    }

    if (eDate !== null) {
      const eDateObj = eDate.toDate();
      this.props.setEndDate(eDateObj);
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.root}>
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
                      this.props.setPlace(place);
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
                      this._handleDateChange(startDate, endDate);
                      this.setState({ startDate, endDate });
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
                      pathname: "/search"
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
          <Grid item xs={0} md={2} lg={2} />
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
    setPlace: place => {
      dispatch({
        type: "SET_PLACE",
        payload: place
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
