import React, { Component } from "react";
import PaymentSummary from "./summary/PaymentSummary";
import PaymentForm from "./form/PaymentForm";
import Grid from "@material-ui/core/Grid";
import { inputCard } from "./PaymentBackend";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import firebase from "../../app/config/firebase";
import { toastr } from "react-redux-toastr";

const styles = {
  paymentLayout: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: "8px",
    margin: "8px"
  }
};

const defaults = {
  reservation: {
    startDate: new Date(),
    endDate: new Date(),
    rooms: 1
  },
  hID: "lELnUhZ2MHPUTYutXDoy"
};

// returns the number of days between dates
const dateDifference = (Date1, Date2) => {
  return Math.round((Date2 - Date1) / (1000 * 60 * 60 * 24));
};

class PaymentLayout extends Component {
  state = {
    summary: {
      hotelName: "",
      location: "",
      checkIn: this.props.reservation.startDate,
      checkOut: this.props.reservation.endDate,
      nights: dateDifference(
        this.props.reservation.startDate,
        this.props.reservation.endDate
      ),
      rate: 0,
      rooms: this.props.reservation.rooms,
      taxRate: 0.1, // Just keep these constants here for now in case they're fetched elsewhere
      feesRate: 0.05
    },
    form: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      specialRequest: "",
      cardName: "",
      cardNumber: "",
      cvc: "",
      expiryMonth: "",
      expiryYear: ""
    },
    points: {
      usePoints: false,
      userPoints: 0
    },
    guestUser: false
  };

  handlers = {
    setForm: form =>
      this.setState(prevState => ({
        ...prevState,
        form: {
          ...prevState.form,
          ...form
        }
      })),
    checkout: () => this.checkout(),
    cancel: () => this.props.history.goBack(),
    toggleRewards: () =>
      this.setState(prevState => ({
        ...prevState,
        points: {
          ...prevState.points,
          usePoints: !prevState.points.usePoints
        }
      }))
  };

  componentDidMount() {
    // Populate hotel information
    const id = this.props.match.params.hotel_id;
    const db = firebase.firestore();
    const hotelRef = db.collection("testingHotels").doc(id);
    hotelRef.get().then(snapShot => {
      const hotel = snapShot.data();
      const summary = {
        hotelName: hotel.name,
        location: `${hotel.street}, ${hotel.city}, ${hotel.state} ${hotel.zip}`,
        rate: hotel.price
      };
      this.setState(prevState => ({
        ...prevState,
        summary: {
          ...prevState.summary,
          ...summary
        }
      }));
    });

    // Get rewards
    if (this.props.auth.uid) {
      const userRef = firebase
        .firestore()
        .collection("users")
        .doc(this.props.auth.uid);
      userRef.get().then(doc => {
        if (doc.exists) {
          let userPoints = doc.data().reward;
          this.setState(prevState => ({
            ...prevState,
            points: {
              ...prevState.points,
              userPoints
            }
          }));
        }
      });
    } else {
      this.setState({
        guestUser: true
      });
    }
  }

  render() {
    // PaymentSummary
    const { calculateTransaction } = this;
    const { summary, form, points, guestUser } = this.state;
    const { reservation } = this.props.reservation ? this.props : defaults;

    // PaymentForm handlers
    const { toggleRewards, setForm, checkout, cancel } = this.handlers;
    const paymentFormHandlers = {
      toggleRewards,
      setForm,
      checkout,
      cancel
    };

    return (
      <Grid container className={this.props.classes.paymentLayout} xs={12} md={12} lg={12}>
        <Grid container className={this.props.classes.paymentLayout} xs={12} md={5} lg={5}>
        <PaymentSummary
          summary={summary}
          points={points} // This needs to be passed so that it re renders
          transaction={calculateTransaction}
          reservation={reservation}
        />
        </Grid>
        <Grid container className={this.props.classes.paymentLayout} xs={12} md={5} lg={5}>
        <PaymentForm
          form={form}
          points={points}
          guestUser={guestUser}
          handlers={paymentFormHandlers}
        />
        </Grid>
      </Grid>
    );
  }

  calculateTransaction = () => {
    const { summary, points } = this.state;

    // Apply rewards
    let rewardsSavings = 0;
    let usedPoints = 0;
    if (points.usePoints) {
      rewardsSavings = points.userPoints * 0.01;
      rewardsSavings =
        rewardsSavings > summary.subtotal ? summary.subtotal : rewardsSavings;
    }
    usedPoints = Math.floor(rewardsSavings * 100);

    // Calc service fee and tax
    // Make some change to subtract rewards savings
    let subtotal = summary.nights * summary.rate - rewardsSavings;
    const tax = subtotal * summary.taxRate;
    const fees = subtotal * summary.feesRate;
    // let total = subtotal + tax + fees - rewardsSavings;
    let total = parseFloat((subtotal + tax + fees).toFixed(2));

    // Calc earned points
    const earnedPoints = points.usePoints ? 0 : Math.floor(subtotal) * 10;

    return {
      summary: {
        rewardsSavings,
        earnedPoints,
        total,
        subtotal,
        tax,
        fees
      },
      points: {
        usedPoints
      }
    };
  };
  // validateName = () =>{
  //   const{form} = this.state;
  //   const card = {
  //     cardName: form.cardName,
  //     cardNumber: form.cardNumber,
  //     cvc: form.cvc,
  //     expiryMonth: form.expiryMonth,
  //     expiryYear: form.expiryYear
  //   };
  //   return (!/[^a-zA-Z]/.test(card.cardName))
  // }
  // validateNumber = () =>{
  //   const{form} = this.state;
  //   const card = {
  //     cardName: form.cardName,
  //     cardNumber: form.cardNumber,
  //     cvc: form.cvc,
  //     expiryMonth: form.expiryMonth,
  //     expiryYear: form.expiryYear
  //   };
  //   return ((/[^a-zA-Z]/.test(card.cardNumber)))
  // }
  checkout = () => {
    const transaction = this.calculateTransaction();
    const { form, points } = this.state;

    const card = {
      cardName: form.cardName,
      cardNumber: form.cardNumber,
      cvc: form.cvc,
      expiryMonth: form.expiryMonth,
      expiryYear: form.expiryYear
    };
    this.props.inputCard(card);

    // await this.addReservation();

    // if (!this.state.guestUser) {
    //   if (points.usePoints) {
    //     this.addRewardsToCurrentUser(-transaction.points.usedPoints);
    //   } else {
    //     this.addRewardsToCurrentUser(transaction.summary.earnedPoints);
    //   }
    // }

    // if (!this.state.guestUser) {
    //   window.location.href = `/profile/${firebase.auth().currentUser.uid}`;
    // } else {
    //   this.props.history.push("/");
    //   toastr.success("Reservation Book!", "Your booking has been reserved.");
    // }

    // Re-format this part to make reward point display after the redirection in reservation
    this.addReservation().then(async () => {
      // checking if it is a guest user
      if (!this.state.guestUser) {
        if (points.usePoints) {
          await this.addRewardsToCurrentUser(-transaction.points.usedPoints);
        } else {
          await this.addRewardsToCurrentUser(transaction.summary.earnedPoints);
        }
        window.location.href = `/profile/${firebase.auth().currentUser.uid}`;
      } else {
        this.props.history.push("/");
        toastr.success("Reservation Book!", "Your booking has been reserved.");
      }
    });
    // .finally(() => {
    //   this.props.history.push(`/profile/${firebase.auth().currentUser.uid}`);
    //   // Richard
    //   // if (this.state.guestUser) {
    //   //   this.props.history.push("/");
    //   //   toastr.success(
    //   //     "Reservation Book!",
    //   //     "Your booking has been reserved."
    //   //   );
    //   // } else {
    //   //   window.location.href = `/profile/${firebase.auth().currentUser.uid}`;
    //   // }
    // });
  };

  // Helpers
  // Updates users reward points
  // Re-format it to make sure correct user reward points after redirection
  // after the login
  async addRewardsToCurrentUser(rewardPoints) {
    const db = firebase.firestore();
    const { uid } = firebase.auth().currentUser;
    if (uid) {
      console.log("WE ARE IN");
      let docRef = firebase
        .firestore()
        .collection("users")
        .doc(uid);
      await docRef.get().then(doc => {
        let { reward } = doc.data();
        if (doc.exists) {
          db.collection("users")
            .doc(uid)
            .update({
              reward: reward + rewardPoints
            });
        }
      });
      console.log("DONE UPDATING");
    } else {
      this.setState({
        guestUser: true
      });
    }
  }
  // Adds a reservation doc to the reservations collection and optionally updates users rewards points
  // returns a promise
  addReservation = () => {
    const db = firebase.firestore();
    let uid = "";

    if (firebase.auth().currentUser) {
      uid = firebase.auth().currentUser.uid;
    }

    const hID = this.props.match.params.hotel_id;

    const transaction = this.calculateTransaction();
    const { summary } = this.state;

    console.log("uid before saved: ", uid);
    // Update firestore with new reservation
    return db.collection("reservations").add({
      // user
      userId: uid,
      // hotel
      HID: hID,
      hotelName: summary.hotelName,
      location: summary.location,
      rate: summary.rate,
      // reservation
      bookDate: new Date(),
      startDate: summary.checkIn,
      endDate: summary.checkOut,
      numOfNight: summary.nights,
      subtotal: transaction.summary.subtotal,
      totalPrice: transaction.summary.total,
      // store reward points for calculation in editting and cancelling the hotel
      reward: transaction.summary.subtotal * 10,
      redeemedPoints: transaction.points.usedPoints,
      isCanceled: false,
      refund: 0
    });
  };
}

const mapStateToProps = state => ({
  cardstate: state.card.cardstate,
  reservation: state.reservation,
  auth: state.firebase.auth
});
const mapDispatchToProps = dispatch => ({
  inputCard: card => dispatch(inputCard(card))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withRouter(PaymentLayout)));
