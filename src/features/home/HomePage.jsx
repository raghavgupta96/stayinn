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

  componentDidMount () {
    if(this.props.reservation.startDate !== null){
      //update the local state
      const sDateMonmet = moment(this.props.reservation.startDate);
      this.setState({startDate: sDateMonmet});
    }
    if(this.props.reservation.endDate !==  null){
      const eDateMoment = moment(this.props.reservation.endDate);
      this.setState({endDate: eDateMoment});
    }
    if(this.props.reservation.rooms !== null ){
      this.setState({ rooms : this.props.reservation.rooms });
    }
  }

  //convert the ISO format data "2018-10-15" string to data object
  stringToDate = date => {
    var year = date.substring(0, 4);
    var month = date.substring(5, 7);
    var day = date.substring(8, 10);
    var d = new Date(year, month - 1, day);
    return d;
  };

  dateToString = (date) => {
    const temp = date;
    const year = temp.getFullYear();
    const month = temp.getMonth() + 1;
    const day = temp.getDate();
    return (year + "-" + month + "-" + day);
  }

  _handleNumOfRoomsChange = e => {
    this.props.setRooms(e.target.value);
    this.setState({ NumOfRooms: e.target.value });
  };

  _handleDateChange = (sDate, eDate) => {
    if(sDate !== null){
      const sDateObj = sDate.toDate();
      this.props.setStartDate(sDateObj);
    }
    
    if(eDate !== null) {
      const eDateObj = eDate.toDate();
      this.props.setEndDate(eDateObj);
    }
  }

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
                    this.props.setPlace(place);
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
        <Grid item xs={2} md={2} lg={2} />
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    reservation: state.reservation,
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
