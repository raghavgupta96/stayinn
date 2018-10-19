import React, { Component } from "react";
import { connect } from "react-redux";
import { withFirestore } from "react-redux-firebase";
import Button from "@material-ui/core/Button";

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

class myBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservations: null,
      currRes: null
    };
  }

  async componentDidMount() {
    const { firebase } = this.props;
    const obj = this;
    var currentUser;

    // Check if auth changes after initializes
    firebase.auth().onAuthStateChanged(function(user) {
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

  handleCancel(reservationId) {
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
          isCanceled: true
        })
        .then(function() {
          window.location.reload();
        })
        .catch(function(error) {
          console.log(error);
        });
    });
  }

  render() {
    // make a list that contains all reservations user made
    const { auth } = this.props;
    // var thisRes = null;
    const resList =
      this.state.reservations &&
      this.state.reservations.map((res) => {
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
                  <Button component={renderButton}>Edit</Button>
                  <Button
                    component={renderButton}
                    onClick={() => {
                      this.handleCancel(res.reservationId);
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
      </div>
    );
  }
}

export default withFirestore(
  connect(
    mapState,
    actions
  )(myBooking)
);
