import React, { Component } from "react";
import Button from "@material-ui/core/Button";

import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import { connect } from "react-redux";
import { withFirestore } from "react-redux-firebase";

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
    style={{
      backgroundColor: "#e60000"
    }}
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

class CancelModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   reservations: null,
      open: false
      //   currRes: null,
      //   currHotel: null
    };
  }

//   async componentDidMount() {
//     const { firebase } = this.props;
//     const obj = this;

//     // Check if auth changes after initializes
//     // if user does not log in

//     const db = firebase.firestore();

//     //populate population in reservation
//     db.collection("reservations")
//       .get()
//       .then(collection => {
//         const reservations = [];

//         //add all reservations in the array
//         collection.forEach(doc => {
//           // doc.data() is never undefined for query doc snapshots
//           // add reservation information
//           reservations.push({
//             HID: doc.data().HID,
//             reservationId: doc.id,
//             displayName: doc.data().displayName,
//             checkinDate: doc.data().checkinDate,
//             checkoutDate: doc.data().checkoutDate,
//             bookDate: doc.data().bookDate,
//             totalPrice: doc.data().totalPrice,
//             userId: doc.data().userId,
//             isCanceled: doc.data().isCanceled
//           });
//         });
//         obj.setState({ reservations });
//         // console.log(reservations)
//       });
//   }

//   rand() {
//     return Math.round(Math.random() * 20) - 10;
//   }

  handleOpen = reservation => {
    this.setState({
      open: true,
      currRes: reservation
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

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

  //   getHotel(hotelId) {
  //     const {firebase} = this.props;
  //     var docRef = firebase
  //       .firestore()
  //       .collection("testingHotels")
  //       .doc(hotelId);
  //     docRef.get().then(doc => {
  //       if (doc.exists) {
  //         console.log("hotel data", doc.data());
  //         this.setState({
  //           currHotel: doc.data()
  //         });
  //       } else {
  //         // doc.data() will be undefined in this case
  //         console.log("No such document!");
  //       }
  //     });
  //   }

  render() {
    // make a list that contains all reservations user made
    const { auth, firebase, reservationId } = this.props;
    // const obj = this;
    // var thisRes = null;
    // this.getHotel(res.HID);
    return (
        <div>
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
                Cancelling this reservation will be charged 10% cancellation
                fee: <br />
                <br />
                Reservation Price: $
                {this.state.currRes && this.state.currRes.totalPrice}
                <br />
              </Typography>
              <Typography style={highlightTextStyle}>
                Cancellation Fee: -$
                {this.state.currRes && this.state.currRes.totalPrice * 0.1}
                <br />
              </Typography>
              <Typography style={regTextStyle}>
                Refund: $
                {this.state.currRes && this.state.currRes.totalPrice * 0.9}
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
          <Button component={renderButton}>Edit</Button>
          <Button
            component={warningButton}
            onClick={() => {
              // this.handleCancel(res.reservationId);
              this.handleOpen(reservationId);
            }}
          >
            Cancel
          </Button>
          </div>
        )
        }
    }

export default withFirestore(
    connect(
      mapState,
      actions
    )(CancelModal)
  );
