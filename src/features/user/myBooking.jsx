import React, { Component } from "react";
import { connect } from "react-redux";
import { withFirestore } from "react-redux-firebase";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

const styles = () => ({
  dateContainer: {
    display: "flex",
    flexWrap: "wrap",
    marginLeft: "15px",
    marginRight: "15px",
    marginBottom: "15px"
  }
})

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
  <Button
    variant="contained"
    justify="right"
    type="submit"
    color="tertiary_lightblue"
    {...custom}
  />
);

const modalStyle = {
  backgroundColor: "white",
  padding: 50,
  textAlign: "center",
  borderRadius: 10,
  marginLeft: 450,
  marginRight: 450
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
      checkout: null
    };
  }

    // convertDate = date => {;
    //   console.log(date);
    //   // const month = date.getUTCMonth() + 1;
    //   // const day = date.getUTCDate();
    //   // const year = date.getUTCFullYear();
    //   // const dateConversion = year + "-" + month + "-" + day;
    //   // return dateConversion
    // };
  
    _handleCheckinDate = e => {
      console.log("CHECKIN MAH MAN")
      //const date = this.convertDate(e.target.value);
      const date = e.target.value;
      console.log(date);
      this.setState({
        checkin: date
      })
    };
  
    _handleCheckoutDate = e => {
      console.log("CHECKOUT MAH MAN")
      //const date = this.convertDate(e.target.value);
      const date = e.target.value;
      console.log(date);
      this.setState({
        checkout: e.target.value
      })
    };

  async componentDidMount() {
    const { firebase } = this.props;
    const obj = this;

    // Check if auth changes after initializes
    firebase.auth().onAuthStateChanged(function (user) {
      // if user does not log in
      if (!user) {
        return;
      }
      const db = firebase.firestore();

      //populate population in reservation
      db.collection("reservations")
        .get()
        .then(collection => {
          const reservations = [];

          //add all reservations in the array
          collection.forEach(doc => {
            // doc.data() is never undefined for query doc snapshots
            // add reservation information
            reservations.push({
              HID: doc.data().HID,
              reservationId: doc.id,
              displayName: doc.data().displayName,
              checkinDate: doc.data().checkinDate,
              checkoutDate: doc.data().checkoutDate,
              bookDate: doc.data().bookDate,
              totalPrice: doc.data().totalPrice,
              userId: doc.data().userId,
              isCanceled: doc.data().isCanceled
            });
          });
          obj.setState({ reservations });
          // console.log(reservations)
        });
    });
  }

  rand() {
    return Math.round(Math.random() * 20) - 10;
  }

  handleOpen = reservation => {
    this.setState({
      open: true,
      currRes: reservation
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleEditOpen = reservation => {
    this.setState({
      editOpen: true,
      currRes: reservation
    });
  }

  handleEditClose = () => {
    this.setState({
      editOpen: false
    });
  }

  handleEditRes(reservationId) {
    const { firebase } = this.props;
    console.log("RESERVATION ID: " + reservationId);
    console.log("CHECKIN: " + this.state.checkin);
    console.log("CHECKOUT: " + this.state.checkout);
    const checkin = this.state.checkin;
    const checkout = this.state.checkout;
    firebase.auth().onAuthStateChanged(function (user) {
      if (!user) {
        return;
      }
      firebase
      .firestore()
      .collection("reservations")
      .doc(reservationId)
      .update({
        checkinDate: checkin,
        checkoutDate: checkout
      })
      .then(function () {
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
    })
  }

  handleCancel(reservationId) {
    // console.log(index);
    // console.log("You click:" + this.state.reservations[index].reservationId);
    const { firebase } = this.props;
    // Check if auth changes after initializes
    firebase.auth().onAuthStateChanged(function (user) {
      // if user does not log in
      if (!user) {
        return;
      }
      firebase
        .firestore()
        .collection("reservations")
        .doc(reservationId)
        .update({
          isCanceled: true
        })
        .then(function () {
          window.location.reload();
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  }



  render() {
    // make a list that contains all reservations user made
    const { auth, firebase, classes } = this.props;
    console.log(this.props);
    // var thisRes = null;
    const resList =
      this.state.reservations &&
      this.state.reservations.map(res => {

        var docRef = firebase
          .firestore()
          .collection("users")
          .doc(res.HID);
        docRef.get().then(doc => {
          if (doc.exists) {
            console.log("hotel data", doc.data());
            this.setState({
              currHotel: doc.data(),
            })
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        });


        return (
          <div key={res.reservationId}>
            {/* Only show reservation that the user has instead of all*/}
            {auth.uid === res.userId &&
              !res.isCanceled && (
                <div>
                  <h3>Reservation ID: {res.reservationId}</h3>
                  <h3>Hotel ID: {res.HID}</h3>
                  <h3>Book Date: {res.bookDate}</h3>
                  <h3>Check-in Date: {res.checkinDate}</h3>
                  <h3>Check-out Date: {res.checkoutDate}</h3>
                  <h3>Total Price: ${res.totalPrice}</h3>
                  <h3>isCanceled: {String(res.isCanceled)}</h3>
                  <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                    style={{ paddingTop: 50, zIndex: 1, overflow: "auto" }}
                  >
                    <div style={modalStyle}>
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
                          this.state.currRes.totalPrice * 0.1}
                        <br />
                      </Typography>
                      <Typography style={regTextStyle}>
                        Refund: $
                        {this.state.currRes &&
                          this.state.currRes.totalPrice * 0.9}
                        <br />
                      </Typography>
                      <Button
                        component={renderButton}
                        onClick={() => {
                          this.state.currRes &&
                            this.handleCancel(this.state.currRes.reservationId);
                        }}
                      >
                        Yes
                      </Button>
                      <Button
                        component={warningButton}
                        onClick={() => {
                          this.handleClose();
                        }}
                      >
                        No
                      </Button>
                    </div>
                  </Modal>

                  <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.editOpen}
                    onClose={this.handleEditClose}
                    style={{ paddingTop: 50, zIndex: 1, overflow: "auto" }}
                  >
                    <div style={modalStyle}>
                      <Typography style={regTextStyle}>Select a new check-in and check-out date for your reservation</Typography>
                      <Grid item xs={6} md={2} lg={1}>
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
                      <Grid item xs={6} md={2} lg={1}>
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
                      <Grid padding={20}>
                        <Button
                          component={renderButton}
                          onClick={() => {
                            this.state.currRes &&
                              this.handleEditRes(this.state.currRes.reservationId);
                          }}
                        >
                          Confirm
                        </Button>
                        <Button component={warningButton}
                          onClick={() => {
                            this.handleEditClose();
                          }}
                        >
                          Cancel
                        </Button>
                      </Grid>
                    </div>
                  </Modal>

                  <Button
                    component={renderButton}
                    onClick={() => {
                      this.handleEditOpen(res);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    component={warningButton}
                    onClick={() => {
                      // this.handleCancel(res.reservationId);
                      this.handleOpen(res);
                    }}
                  >
                    Cancel
                  </Button>
                  <hr />
                </div>
              )}

            {/* Show the reservation that has been cancelled */}
            {auth.uid === res.userId &&
              res.isCanceled && (
                <div>
                  <h1>This Reservation has been Cancelled</h1>
                  <s>
                    <h3>Reservation ID: {res.reservationId}</h3>
                    <h3>Hotel ID: {res.HID}</h3>
                    <h3>Check-in Date: {res.checkinDate}</h3>
                    <h3>Check-out Date: {res.checkoutDate}</h3>
                    <h3>Total Price: ${res.totalPrice}</h3>
                    <h3>isCanceled: {String(res.isCanceled)}</h3>
                  </s>
                  <hr />
                </div>
              )}
          </div>
        );
      });

    return (
      <div>
        <h1>MyBooking</h1>
        {resList}
        {/* <Button
          onClick={() => {
            this.handleOpen();
          }}
        >
          Show Modal
        </Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
          style={{paddingTop: 50, zIndex: 1, overflow: "auto", }}
        >
          <div style={modalStyle}>
            {console.log(classes)}
            <Typography style={textStyle}>Text in a modal</Typography>
          </div>
        </Modal>
        <hr /> */}
      </div>
    );
  }
}


export default withStyles(styles)(withFirestore(
  connect(
    mapState,
    actions
  )(myBooking)
));
