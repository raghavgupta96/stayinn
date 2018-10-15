import React, { Component } from "react";
import { connect } from "react-redux";
import { withFirestore } from "react-redux-firebase";

const actions = {};

const mapState = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile
});

class myBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservations: null
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
      currentUser = user;

      console.log(currentUser);

      var userId = currentUser.uid;

      var userRef = firebase
        .firestore()
        .collection("users")
        .doc(userId);

      userRef.get().then(doc => {
        if (doc.exists) {
          console.log("Reservation Array: " + doc.data().reservations);

          // got the reservation data from firestore
          obj.setState({
            reservations: doc.data().reservations
          });
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      });
    });
  }

  render() {
    // make a list that contains all reservations user made
    const resList =
      this.state.reservations &&
      this.state.reservations.map(res => {
        return (
          <div key={res.reservationId}>
            <h3>HID: {res.HID}</h3>
            <h3>Beds: {res.beds}</h3>
            <h3>Check-in Date: {res.checkinDate}</h3>
            <h3>Check-out Date: {res.checkoutDate}</h3>
            <h3>Total Price: ${res.totalPrice}</h3>
            <hr />
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
