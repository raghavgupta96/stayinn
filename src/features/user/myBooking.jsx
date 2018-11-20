import React, { Component } from "react";
import { connect } from "react-redux";
import { withFirestore } from "react-redux-firebase";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import { Link } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";
import { DateRangePicker } from "react-dates";
import moment from "moment";
import LocationIcon from "@material-ui/icons/LocationOn";

const styles = theme => ({
  dateContainer: {
    //display: "flex",
    flexWrap: "wrap",
    marginLeft: "15px",
    marginRight: "15px",
    marginBottom: "15px"
  },
  progress: {
    margin: theme.spacing.unit * 2
  },
  photo: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },
  photoContainer: {
    marginTop: "0px"
  },
  mainpaper: {
    marginBottom: 20
  },
  reservationDetails: {
    width: "100%",
    marginTop: "15px",
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20
  },
  customButton: {
    marginRight: 10
  },
  icon: {
    margin: theme.spacing.unit * 2,
    color: "lightGray"
  },
  iconHover: {
    margin: theme.spacing.unit * 2,
    color: "lightGray",
    "&:hover": {
      color: "Gray",
      transition: "color 200ms"
    }
  },
  divider: {
    width: "90%",
    marginTop: "10px",
    marginLeft: "10px"
  },

  hotelTitle: {
    display: "inline",
    fontSize: 32,
    "&:hover": {
      color: "#F69A33",
      transition: "color 300ms"
    }
  }
});

const actions = {};

const mapState = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile
});

const renderButton = ({ ...custom }) => (
  <Button
    variant="contained"
    justify="right"
    color="primary"
    type="submit"
    {...custom}
  />
);

// warning (red) button that prevents users to click on it
const warningButton = ({ ...custom }) => (
  <Button variant="contained" justify="right" {...custom} />
);

// cancel modal style
const modalStyle = {
  backgroundColor: "white",
  padding: 30,
  textAlign: "center",
  borderRadius: 10,
  marginLeft: 450,
  margin: "auto",
  width: "50%"
};

// edit modal style
const editModalStyle = {
  backgroundColor: "white",
  padding: 30,
  textAlign: "center",
  borderRadius: 10,
  marginLeft: 450,
  marginRight: 450,
  marginTop: 250,
  width: "50%",
};

const regTextStyle = {
  fontSize: 18
};

const highlightTextStyle = {
  fontSize: 18,
  color: "red"
};

class myBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservations: null,
      open: false,
      editOpen: false,
      currRes: null,
      currHotel: null,
      checkin: null,
      checkout: null,
      noDateConflict: true,
      isMultipleBooking: false,
      userCard: null,
      editRefund: null,
      editCharge: null,
      focusedInput: "startDate",
      saveEdit: false,
      startDate: moment(), // set your initial start date here
      endDate: moment().add(1, "days") // set your initial end date here
    };
    this.state = this.state;
  }

  // convertDate = date => {;
  //   console.log(date);
  //   // const month = date.getUTCMonth() + 1;
  //   // const day = date.getUTCDate();
  //   // const year = date.getUTCFullYear();
  //   // const dateConversion = year + "-" + month + "-" + day;
  //   // return dateConversion
  // };

  async componentDidMount() {
    // initialize the calendar dates for edit dates of reservation
    const startDateObj = new Date(this.state.startDate);
    const startDateStr = this.dateToString(startDateObj);

    const endDateObj = new Date(this.state.endDate);
    const endDateStr = this.dateToString(endDateObj);

    this.setState({
      checkin: startDateStr,
      checkout: endDateStr
    });

    const { firebase } = this.props;
    const obj = this;

    // Check if auth changes after initializes
    await firebase.auth().onAuthStateChanged(function(user) {
      // if user does not log in
      if (!user) {
        return;
      }
      const db = firebase.firestore();

      db.collection("users")
        .doc(user.uid)
        .get()
        .then(doc => {
          let userRef = doc.data();

          obj.setState({
            userCard: userRef.card
          });
        });

      //populate population in reservation
      db.collection("reservations")
        .get()
        .then(collection => {
          const reservations = [];

          //add all reservations in the array
          collection.forEach(doc => {
            var docRef = firebase
              .firestore()
              .collection("testingHotels")
              .doc(doc.data().HID);

            docRef.get().then(hotelDoc => {
              if (hotelDoc.exists && doc.data().userId === user.uid) {
                // console.log("hotel data", hotelDoc.data());
                reservations.push({
                  HID: doc.data().HID,
                  hotelAddress:
                    hotelDoc.data().street +
                    ", " +
                    hotelDoc.data().city +
                    ", " +
                    hotelDoc.data().state +
                    ", " +
                    hotelDoc.data().zip,
                  reservationId: doc.id,
                  displayName: doc.data().displayName,
                  startDate: doc.data().startDate,
                  endDate: doc.data().endDate,
                  bookDate: doc.data().bookDate,
                  totalPrice: doc.data().totalPrice, // added precision to the price (;
                  userId: doc.data().userId,
                  isCanceled: doc.data().isCanceled,
                  photoURL: hotelDoc.data().photoURL,
                  hotelName: hotelDoc.data().name,
                  rate: hotelDoc.data().price //<-------- CHANGE THIS TO RATE WHEN IT IS UPDATED FROM JUN !!!!!
                });
                obj.setState({ reservations: reservations });
                // console.log(reservations);
              } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
              }
            });
            // doc.data() is never undefined for query doc snapshots
            // add reservation information
          });
          // console.log("Final Reservations", reservations);
          obj.setState({ reservations: reservations });
        });
    });
  }

  // sort reservations array by latest check-in date
  sortByCheckinDate = (r1, r2) => {
    return r2.startDate.toDate().getTime() - r1.startDate.toDate().getTime();
  };

  // Sort user's reservation without including
  // cancelled reservations
  sortWithoutCancel(reservationList) {
    reservationList.sort(this.sortByCheckinDate);
    let removedRes = [];
    for (let r = 0; r < reservationList.length; r++) {
      if (reservationList[r].isCanceled) {
        console.log("pushing removed Reservation: " + reservationList[r]);
        removedRes.push(reservationList[r]);
      }
    }

    let indexToRemove = -1;
    for (let i = 0; i < removedRes.length; i++) {
      indexToRemove = reservationList.indexOf(removedRes[i]);
      if (indexToRemove >= 0) {
        reservationList.splice(indexToRemove, 1);
        reservationList.push(removedRes[i]);
      }
    }

    return reservationList;
  }

  _handleCheckinDate = e => {
    // console.log("CHECKIN");
    const date = e.target.value;
    // console.log(date);
    this.setState({
      checkin: date
    });
  };

  _handleCheckoutDate = e => {
    // console.log("CHECKOUT");
    const date = e.target.value;
    // console.log(date);
    this.setState({
      checkout: e.target.value
    });
  };

  // for airbnb calendar
  handleDatesChange = ({ startDate, endDate }) => {
    const startDateObj = new Date(startDate);
    const startDateStr = this.dateToString(startDateObj);

    const endDateObj = new Date(endDate);
    const endDateStr = this.dateToString(endDateObj);

    this.setState({
      checkin: startDateStr,
      checkout: endDateStr
    });
  };

  dateToString = date => {
    const temp = date;
    const year = temp.getFullYear();
    const month = temp.getMonth() + 1;
    const day = temp.getDate();
    return year + "-" + month + "-" + day;
  };

  dateCheck = (date1, date2) => {
    // Split checkin and checkout dates to separate year, month, day
    const dateIn = date1.split("-");
    const dateOut = date2.split("-");

    // dateIn[0] is year, dateIn[1] is month, dateIn[2] is day
    const checkIn = new Date(dateIn[0], dateIn[1], dateIn[2]);
    const checkOut = new Date(dateOut[0], dateOut[1], dateOut[2]);

    // compare the dates, will return true or false.
    // console.log(checkIn < checkOut);
    return checkIn < checkOut;
  };

  rand() {
    return Math.round(Math.random() * 20) - 10;
  }

  convertDate(date) {
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    let month = months[date.getUTCMonth()];
    let year = date.getUTCFullYear();
    let day = date.getUTCDate();
    return month + " " + day + ", " + year;
  }

  multipleBookingCheck = (startDate, endDate) => {
    let isMultipleBooking = false;

    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    // console.log(startDateObj);
    // Go through each reservation to check if there is any conflict
    for (let reservation in this.state.reservations) {
      // console.log("YOOO", this.state.reservations[reservation]);
      if (!this.state.reservations[reservation].isCanceled) {
        if (
          startDateObj.getTime() <=
            this.state.reservations[reservation].endDate.toDate().getTime() &&
          endDateObj.getTime() >=
            this.state.reservations[reservation].startDate.toDate().getTime()
        ) {
          isMultipleBooking = true;
          break;
        } else {
          isMultipleBooking = false;
        }
      }
    }

    this.setState({ isMultipleBooking });
  };

  handleOpen = reservation => {
    this.setState({
      open: true,
      currRes: reservation
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
      editRefund: null,
      editCharge: null
    });
  };

  handleEditOpen = reservation => {
    this.setState({
      editOpen: true,
      currRes: reservation
    });
  };

  handleEditClose = () => {
    this.setState({
      editOpen: false,
      editRefund: null,
      editCharge: null
    });
  };

  datediff = (date1, date2) => {
    return Math.round((date2 - date1) / (1000 * 60 * 60 * 24));
  };

  async handleEditRes(reservationId) {
    const { firebase } = this.props;
    const obj = this;
    // console.log("RESERVATION ID: " + reservationId);
    // console.log("CHECKIN: " + this.state.checkin);
    // console.log("CHECKOUT: " + this.state.checkout);
    const checkin = this.state.checkin;
    const checkout = this.state.checkout;
    const currentRes = this.state.currRes;
    console.log(currentRes);
    if (this.dateCheck(checkin, checkout)) {
      this.setState({
        noDateConflict: true
      });
      // Split checkin and checkout dates to separate year, month, day
      // console.log(checkin);
      // console.log(checkout);
      const dateIn = checkin.split("-");
      const dateOut = checkout.split("-");

      // dateIn[0] is year, dateIn[1] is month, dateIn[2] is day
      const startDate = new Date(dateIn[0], dateIn[1] - 1, dateIn[2]);
      const endDate = new Date(dateOut[0], dateOut[1] - 1, dateOut[2]);

      // If there is multiple bookings during the same period
      // Return the function without making update
      await this.multipleBookingCheck(startDate, endDate);
      // console.log(this.state.isMultipleBooking);
      if (this.state.isMultipleBooking) {
        return;
      }
      // console.log(this.state.isMultipleBooking);

      let numOfNights = this.datediff(startDate, endDate);

      let adjustedSubtotal = this.state.currRes.rate * numOfNights;
      let adjustedPrice = (adjustedSubtotal * 1.15).toFixed(2);
      // console.log(adjustedSubtotal);

      await firebase.auth().onAuthStateChanged(async function(user) {
        if (!user) {
          return;
        }

        let userRef = firebase
          .firestore()
          .collection("users")
          .doc(user.uid);
        await userRef.get().then(async doc => {
          if (doc.exists) {
            let userRewards = doc.data().reward;
            let resRef = firebase
              .firestore()
              .collection("reservations")
              .doc(reservationId);

            await resRef.get().then(doc2 => {
              let resOldRewards = doc2.data().reward;
              let resOldPrice = doc2.data().totalPrice;
              let finalReward = 0;

              // console.log("User Rewards: ", userRewards)
              // console.log("Res Old Rewards: ", resOldRewards);

              if (userRewards >= resOldRewards) {
                finalReward = userRewards - resOldRewards;
              }

              let resNewReward = currentRes.rate * numOfNights * 10;
              //console.log("Final Reward: ", finalReward);
              //console.log("NEW Total: ", finalReward + resNewReward);
              finalReward = finalReward + resNewReward;
              //console.log("Final: ", finalReward)

              if (adjustedPrice < resOldPrice) {
                // obj.state.editRefund = resOldPrice - adjustedPrice;
                // console.log(
                //   "You will be charged more: " + obj.state.editCharge
                // );
                obj.setState({
                  editRefund: resOldPrice - adjustedPrice
                });
              } else if (adjustedPrice > resOldPrice) {
                // obj.state.editCharge = adjustedPrice - resOldPrice;
                // console.log(
                //   "You will be charged more: " + obj.state.editCharge
                // );
                obj.setState({
                  editCharge: adjustedPrice - resOldPrice
                });
              } else {
                obj.setState({
                  editRefund: 0,
                  editCharge: 0
                });
              }
              // console.log("Ready to Save? ", obj.state.saveEdit);
              if (obj.state.saveEdit) {
                resRef
                  .update({
                    startDate: startDate,
                    endDate: endDate,
                    subtotal: adjustedSubtotal,
                    totalPrice: adjustedPrice,
                    reward: resNewReward,
                    numOfNight: numOfNights
                  })
                  .then(function() {
                    userRef
                      .update({
                        reward: finalReward
                      })
                      .then(function() {
                        window.location.reload();
                      })
                      .catch(function(error) {
                        console.log(error);
                      });
                  });
              }
            });
          }
        });
      });
    } else {
      this.setState({
        noDateConflict: false
      });
    }
  }

  handleCancel(reservationId, refund) {
    // console.log(index);
    // console.log("You click:" + this.state.reservations[index].reservationId);
    const { firebase } = this.props;
    // Check if auth changes after initializes
    firebase.auth().onAuthStateChanged(function(user) {
      // if user does not log in
      if (!user) {
        return;
      }
      firebase
        .firestore()
        .collection("reservations")
        .doc(reservationId)
        .update({
          isCanceled: true,
          refund: refund
        })
        .then(function() {
          let userRef = firebase
            .firestore()
            .collection("users")
            .doc(user.uid);
          userRef.get().then(doc => {
            if (doc.exists) {
              let userRewards = doc.data().reward;
              let resRef = firebase
                .firestore()
                .collection("reservations")
                .doc(reservationId);
              resRef.get().then(doc2 => {
                let resRewards = doc2.data().reward;
                let finalReward = 0;
                if (userRewards >= resRewards) {
                  finalReward = userRewards - resRewards;
                }
                userRef
                  .update({
                    reward: finalReward
                  })
                  .then(function() {
                    window.location.reload();
                  });
              });
            }
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    });
  }

  // async getHotel(HID)
  // {
  //   const { auth, firebase, classes } = this.props;
  //   var docRef = firebase
  //   .firestore()
  //   .collection("testingHotels")
  //   .doc(HID);
  // docRef.get().then(doc => {
  //   if (doc.exists) {
  //     console.log("hotel data", doc.data());
  //     this.setState({
  //       currHotel: doc.data(),
  //     })
  //   } else {
  //     // doc.data() will be undefined in this case
  //     console.log("No such document!");
  //   }
  // });
  // }

  render() {
    // make a list that contains all reservations user made
    const { auth, classes, firebase, error } = this.props;
    const noDateConflict = this.state.noDateConflict;
    const isMultipleBooking = this.state.isMultipleBooking;
    const editCharge = this.state.editCharge;
    const editRefund = this.state.editRefund;
    const today = new Date();

    if (this.state.reservations) {
      this.sortWithoutCancel(this.state.reservations);
    }

    // sorting checkin date and map the reservations to show
    const resList =
      this.state.reservations &&
      // this.sortWithoutCancel(this.state.reservations) &&
      this.state.reservations.map(res => {
        // convert timestamps to date objects first
        // console.log(res);
        // const bookDate = res.bookDate.toDate();
        const bookDate = this.convertDate(res.bookDate.toDate());
        const startDate = this.convertDate(res.startDate.toDate());
        // console.log(startDate);
        const endDate = this.convertDate(res.endDate.toDate());
        return (
          <div key={res.reservationId}>
            {/* Only show reservation that the user has instead of all*/}
            {auth.uid === res.userId && !res.isCanceled && (
              <div>
                <Grid
                  container
                  className={classes.root}
                  xs={12}
                  md={12}
                  lg={12}
                >
                  <Grid item xs={11} md={11} lg={11}>
                    <Paper className={classes.mainpaper}>
                      <Grid container key={res.HID}>
                        <Grid
                          container
                          xs={7}
                          md={7}
                          lg={7}
                          className={classes.reservationDetails}
                        >
                          <Grid item xs>
                            <Grid xs={12} md={12} lg={12}>
                              <a
                                href={
                                  "https://www.google.com/maps/place/" +
                                  res.hotelAddress
                                }
                                target="_blank"
                                style={{
                                  textDecoration: "none"
                                }}
                              >
                                <LocationIcon color="primary" />
                                <Typography
                                  variant="title"
                                  className={classes.hotelTitle}
                                >
                                  {res.hotelName}
                                </Typography>
                                <Divider className={classes.divider} />
                              </a>
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              md={12}
                              lg={12}
                              className={classes.hotelInfo}
                            >
                              <h3>Book Date: {bookDate.toString()}</h3>
                              <Divider className={classes.divider} />
                              <h3>Check-in Date: {startDate.toString()}</h3>
                              <h3>Check-out Date: {endDate.toString()}</h3>
                              <Divider className={classes.divider} />
                              <h3>Total Price: ${res.totalPrice}</h3>
                              <h3>Address: {res.hotelAddress}</h3>
                            </Grid>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            md={12}
                            lg={12}
                            container
                            direction="column"
                          >
                            <Grid item xs />
                            <Grid item>
                              <Button
                                className={classes.customButton}
                                style={{
                                  color: "#ffffff"
                                }}
                                component={renderButton}
                                onClick={() => {
                                  this.handleEditOpen(res);
                                }}
                              >
                                Edit
                              </Button>
                              <Button
                                className={classes.customButton}
                                component={warningButton}
                                onClick={() => {
                                  // this.handleCancel(res.reservationId);
                                  this.handleOpen(res);
                                }}
                              >
                                Cancel
                              </Button>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid
                          xs={5}
                          md={5}
                          lg={5}
                          className={classes.photoContainer}
                        >
                          <img
                            src={res.photoURL}
                            className={classes.photo}
                            alt="hotel pic"
                          />
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                  <Grid item xs={1} md={1} lg={1} />
                </Grid>
                {/* <h3>Hotel PhotoURL: {this.state.currHotel.photoURL}</h3> */}
                {/* <img
                    src={res.photoURL}
                    alt=""
                    style={{
                      width: 400,
                      height: 200
                    }}
                  /> */}
                {/* <h3>PhotoURL: {res.photoURL}</h3>
                  <h3>Reservation ID: {res.reservationId}</h3>
                  <h3>Hotel ID: {res.HID}</h3> */}
                {/* <h3>Hotel Name: {res.hotelName}</h3>
                  <h3>Book Date: {res.bookDate}</h3>
                  <h3>Check-in Date: {res.checkinDate}</h3>
                  <h3>Check-out Date: {res.checkoutDate}</h3>
                  <h3>Total Price: ${res.totalPrice}</h3> */}
                {/* <h3>isCanceled: {String(res.isCanceled)}</h3> */}

                {/* CANCEL MODAL */}
                <Modal
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                  open={this.state.open}
                  onClose={this.handleClose}
                  style={{ paddingTop: 50, zIndex: 1, overflow: "auto" }}
                >
                  {/* The cross sign for closing the modal */}
                  <div style={modalStyle}>
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
                    {/* cancel description */}
                    <div style={{ marginBottom: 10 }}>
                      <Typography style={regTextStyle}>
                        Do you want to cancel this reservation? <br />
                        Cancelling this reservation will be charged 10%
                        cancellation fee: <br />
                        <br />
                        Reservation Price: $
                        {this.state.currRes && this.state.currRes.totalPrice}
                        <br />
                      </Typography>
                      <Typography style={highlightTextStyle}>
                        Cancellation Fee: -$
                        {this.state.currRes &&
                          (this.state.currRes.totalPrice * 0.1).toFixed(2)}
                        <br />
                      </Typography>
                      <Typography style={regTextStyle}>
                        Refund: $
                        {this.state.currRes &&
                          (this.state.currRes.totalPrice * 0.9).toFixed(2)}
                        <br />
                      </Typography>
                    </div>

                    {/* card that the refund will go to */}

                    {this.state.userCard && (
                      <Grid>
                        <Divider />
                        <Typography style={regTextStyle}>
                          The refund will be returned to the following card:
                        </Typography>
                        <Typography style={regTextStyle}>
                          Card Number: ****{" "}
                          {this.state.userCard.cardNumber.substring(12, 16)}
                        </Typography>
                      </Grid>
                    )}

                    {/* cancel choice */}
                    <div style={{ padding: 15 }}>
                      <Button
                        className={classes.customButton}
                        style={{
                          color: "#ffffff"
                        }}
                        component={renderButton}
                        onClick={() => {
                          this.state.currRes &&
                            this.handleCancel(
                              this.state.currRes.reservationId,
                              this.state.currRes.totalPrice * 0.9
                            );
                        }}
                      >
                        Yes
                      </Button>
                      <Button
                        className={classes.customButton}
                        component={warningButton}
                        onClick={() => {
                          this.handleClose();
                        }}
                      >
                        No
                      </Button>
                    </div>
                  </div>
                </Modal>

                {/* EDIT MODAL */}
                <Modal
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                  open={this.state.editOpen}
                  onClose={this.handleEditClose}
                  style={{ paddingTop: 50, zIndex: 1, overflow: "auto" }}
                >
                  <div style={editModalStyle}>
                    {/* Adding cross icon for users to close modal */}
                    <div style={{ textAlign: "right" }}>
                      <button
                        style={{
                          border: "none",
                          background: "transparent",
                          cursor: "pointer",
                          outline: "none"
                        }}
                        onClick={() => {
                          this.handleEditClose();
                        }}
                      >
                        <CloseIcon className={classes.iconHover} />
                      </button>
                    </div>

                    {/* dispaly date pickers to users to choose editted dates */}
                    <div sytle={{ display: "inline-block" }}>
                      {/* <Typography style={regTextStyle}>
                        Select a new checkin and checkout date for your
                        reservation.
                      </Typography> */}
                      <br />
                      <DateRangePicker
                        startDateId="startDate"
                        endDateId="endDate"
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        openDirection="up"
                        calendarInfoPosition="top"
                        renderCalendarInfo={() => (
                          <div
                            style={{
                              textAlign: "center",
                              fontSize: 20,
                              margin: 5
                            }}
                          >
                            Select a new checkin and checkout date for your
                            reservation.
                          </div>
                        )}
                        onDatesChange={({ startDate, endDate }) => {
                          this.setState({ startDate, endDate });
                          this.handleDatesChange({ startDate, endDate });
                        }}
                        focusedInput={this.state.focusedInput}
                        onFocusChange={focusedInput => {
                          if (!focusedInput) return; // doesn't update the focusedInput if it is trying to close the DRP
                          this.setState({ focusedInput });
                        }}
                        style={{
                          zIndex: "0"
                        }}
                      />
                    </div>
                    <Grid padding={20} spacing={24}>
                      <div>
                        {!noDateConflict && (
                          <Typography color="error">
                            The checkin date must be before the checkout date.
                          </Typography>
                        )}
                        {isMultipleBooking && (
                          <Typography color="error">
                            You have conflicting reservation date
                          </Typography>
                        )}

                        {/* The user will be charged more */}
                        {editCharge && editCharge !== 0 ? (
                          <div>
                            <Typography style={regTextStyle}>
                              Do you want to make the change?
                            </Typography>
                            <Typography style={regTextStyle}>
                              ${editCharge.toFixed(2)} more will be charged on
                              the following card :
                            </Typography>
                            <Typography style={regTextStyle}>
                              Card Number: ****{" "}
                              {this.state.userCard.cardNumber.substring(12, 16)}
                            </Typography>
                          </div>
                        ) : (
                          <div />
                        )}

                        {/* The user selects the same date period
                            no refund or additional charge */}
                        {editCharge === 0 && editRefund === 0 ? (
                          <div>
                            <Typography style={regTextStyle}>
                              There will not be extra charges and refunds.
                              <br />
                              The price will stay the same.
                            </Typography>
                          </div>
                        ) : (
                          <div />
                        )}

                        {/* the user will be refunded */}
                        {editRefund && editRefund !== 0 ? (
                          <div>
                            <Typography style={regTextStyle}>
                              Do you want to make this change?
                            </Typography>
                            <Typography style={regTextStyle}>
                              {/* ${editRefund.toFixed(2)} will be refunded to the following */}
                              card:
                            </Typography>
                            <Typography style={regTextStyle}>
                              Card Number: ****{" "}
                              {this.state.userCard.cardNumber.substring(12, 16)}
                            </Typography>
                          </div>
                        ) : (
                          <div />
                        )}
                      </div>

                      {/* display YES and NO if users enter valid date
                          to calculate the refund or charge */}
                      {editRefund !== null || editCharge !== null ? (
                        <div style={{ padding: 15 }}>
                          <Button
                            className={classes.customButton}
                            style={{
                              color: "#ffffff"
                            }}
                            component={renderButton}
                            onClick={() => {
                              this.setState({
                                saveEdit: true
                              });
                              this.handleEditRes(
                                this.state.currRes.reservationId
                              );
                            }}
                            sytle={{ padding: "20px" }}
                          >
                            Yes
                          </Button>
                          <Button
                            className={classes.customButton}
                            component={warningButton}
                            onClick={() => {
                              this.handleEditClose();
                            }}
                          >
                            No
                          </Button>
                        </div>
                      ) : (
                        <div />
                      )}

                      {/* display confirm and cancel if the user has not entered dates yet */}
                      {editRefund === null && editCharge === null ? (
                        <div style={{ padding: 15 }}>
                          <Button
                            className={classes.customButton}
                            style={{
                              color: "#ffffff"
                            }}
                            component={renderButton}
                            onClick={() => {
                              this.state.currRes &&
                                this.handleEditRes(
                                  this.state.currRes.reservationId
                                );
                            }}
                          >
                            Confirm
                          </Button>
                          <Button
                            className={classes.customButton}
                            component={warningButton}
                            onClick={() => {
                              this.handleEditClose();
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <div />
                      )}
                    </Grid>
                  </div>
                </Modal>
              </div>
            )}

            {/* Show the reservation that has been cancelled */}
            {auth.uid === res.userId && res.isCanceled ? (
              <div style={{ opacity: 0.6 }}>
                <Grid item xs={11}>
                  <Paper className={classes.mainpaper}>
                    <Grid
                      container
                      className={classes.root}
                      xs={12}
                      md={12}
                      lg={12}
                    >
                      <Grid item xs={12} md={12} lg={12}>
                        <Grid container key={res.HID}>
                          <Grid
                            container
                            xs={7}
                            md={7}
                            lg={7}
                            className={classes.reservationDetails}
                          >
                            <Grid item xs>
                              <Grid xs={12} md={12} lg={12}>
                                <s>
                                  <Typography
                                    variant="title"
                                    style={{ fontSize: 32 }}
                                  >
                                    {res.hotelName}
                                  </Typography>
                                </s>
                                <Divider className={classes.divider} />
                              </Grid>
                              <Grid
                                item
                                xs={12}
                                md={12}
                                lg={12}
                                className={classes.hotelInfo}
                              >
                                <s>
                                  <h3>Book Date: {bookDate.toString()}</h3>
                                  <Divider className={classes.divider} />
                                  <h3>Check-in Date: {startDate.toString()}</h3>
                                  <h3>Check-out Date: {endDate.toString()}</h3>
                                  <Divider className={classes.divider} />
                                  <h3>Total Price: ${res.totalPrice}</h3>
                                  <h3>Address: {res.hotelAddress}</h3>
                                </s>
                              </Grid>
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              md={12}
                              lg={12}
                              container
                              direction="column"
                            >
                              <Grid item xs />
                            </Grid>
                          </Grid>
                          <h3
                            style={{
                              position: "absolute",
                              backgroundColor: "red",
                              color: "white",
                              fontWeight: "bold",
                              padding: "8px",
                              right: "5%"
                            }}
                          >
                            CANCELLED
                          </h3>
                          <Grid
                            xs={5}
                            md={5}
                            lg={5}
                            className={classes.photoContainer}
                          >
                            <img
                              src={res.photoURL}
                              className={classes.photo}
                              alt="hotel pic"
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={1} md={1} lg={1} />
                    </Grid>
                  </Paper>
                </Grid>
              </div>
            ) : (
              <div />
            )}
          </div>
        );
      });

    return (
      <div>
        {resList && (
          <div>
            <h1 style={{textAlign: "center"}}>MyBooking</h1>
            {resList}
          </div>
        )}
        {!resList && (
          <div>
            <CircularProgress />
          </div>
        )}
      </div>
    );
    // }
    // else
    // {
    //   return <CircularProgress/>
    // }
  }
}

export default withStyles(styles)(
  withFirestore(
    connect(
      mapState,
      actions
    )(myBooking)
  )
);
