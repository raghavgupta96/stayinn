import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import firebase from "../../../app/config/firebase";
import { connect } from "react-redux";
import { withRouter } from "react-router";


// Styles
//
const styles = theme => ({
  paymentForm: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '16px',
    boxShadow: '0 2px 10px -3px black'
  },
  traveler: {
    width: '100%'
  },
  textField: {
    width: '100%'
  },
  payment: {
    width: '100%'
  },
  name: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    width: '100%'
  },
  firstName: {
    flex: 'auto',
    marginRight: '8px'
  },
  lastName: {
    flex: 'auto',
    marginLeft: '8px'
  },
  cardDetails: {
    display: 'flex',
    flexFlow: 'column nowrap',
  },
  cardName: {
    flex: 'auto',
  },
  cardNumber: {
    flex: 'auto',
  },
  cardSecurity: {
    display: 'flex',
    flexFlow: 'row',
    alignItems: 'baseline',
    width: '100%'
  },
  cvc: {
    flex: 'auto'
  },
  expiryLabel: {
    margin: '0 8px'
  },
  month: {
    margin: '0 8px',
    minWidth: '80px'
  },
  year: {
    margin: '0 8px 0 0',
    minWidth: '80px'
  },
  controls: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    '& Button': {
      color: 'white',
      width: '30%'
    }
  }
});

const mapState = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
});

//
// end styles

// Init Select MenuItems
//
// Months MenuItems
//
const months = [
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
const selectMonths = months.map((month, i) => (
  <MenuItem
    value={month}
    key={month}
  >{month}</MenuItem> 
));
//
// Years MenuItems
//
const expiryYearSelectStart = 2018;
const expiryYearSelectEnd = 2030;
const selectYears= []
for (let i = expiryYearSelectStart; i <= expiryYearSelectEnd; i++) {
  selectYears.push(
    <MenuItem
      value={i}
      key={i}
    >{i}</MenuItem>
  )
}
//
// End init MenuItems

const addRewards = (rewardPoints) => {
  const db = firebase.firestore();
  const currentUser = firebase.auth().currentUser;
  console.log("REWARDS: " , rewardPoints)
  let docRef = firebase.firestore().collection("users").doc(currentUser.uid);

  docRef.get().then(doc => {
    let reward = doc.data().reward;
    console.log("User REWARDS: ", reward)
    console.log("New Rewards: ", reward + rewardPoints);
    if (doc.exists) {
      db.collection("users").doc(currentUser.uid).update({
        reward: reward + rewardPoints
      })
    }
  })

}

const paymentForm = props => {
  const {
    traveler,
    card,
    handlers,
    classes,
    hotel,
    reservation,
    auth,
    match
  } = props

  const datediff = (Date1, Date2) => {
    return Math.round((Date2-Date1)/(1000*60*60*24));
  }

  function reserve(hotel,reservation)
  {
    // console.log("match from Paymentform: ", match.params);
    // console.log("Paymentform Hotel: ", hotel);
    // console.log("Paymentform Reservation: ", reservation);
    const db = firebase.firestore();
    let hID = match.params.hotel_id;
    let numOfNight = datediff(reservation.startDate, reservation.endDate);
    
    // subtotal will be rate per night times number of night
    let subtotal = hotel.rate * datediff(reservation.startDate, reservation.endDate);
    
    // service fee and tax
    const taxRate = .1;
    const feesRate = .05;
    const tax = subtotal * taxRate;
    const fees = subtotal * feesRate;
    let totalPrice = subtotal + tax + fees;

    addRewards(subtotal * 10);

    db.collection("reservations").add({
      HID: hID,
      hotelName: hotel.hotelName,
      rate: hotel.rate,
      bookDate: new Date(),
      location: hotel.location,
      startDate: reservation.startDate,
      endDate: reservation.endDate,
      numOfNight: numOfNight,
      beds: reservation.roomType,
      isCanceled: false,
      refund: 0,
      subtotal: subtotal,
      totalPrice: totalPrice,
      userId: auth.uid,
      reward: subtotal * 10,
    })
    // console.log(firebase.firestore());
  }

  return (
    <form className={classes.paymentForm}>
      <section className={classes.traveler}>
        <h1>Traveler Information</h1>
        <p>* = Required</p>
        <div className={classes.name}>
          
          <TextField
            id="firstname"
            label="First Name"
            value={traveler.firstName}
            onChange={event => handlers.setTraveler({ ...traveler, firstName: event.target.value })}
            className={classes.firstName}
          />
          <TextField
            id="lastname"
            label="Last Name"
            value={traveler.lastName}
            onChange={event => handlers.setTraveler({ ...traveler, lastName: event.target.value })}
            className={classes.lastName}
          />
        </div>
        <TextField
          id="email"
          label="Email"
          value={traveler.email}
          onChange={event => handlers.setTraveler({ ...traveler, email: event.target.value })}
          className={classes.textField}
        />
        <TextField
          id="phonenumber"
          label="Phone Number"
          value={traveler.phoneNumber}
          onChange={event => handlers.setTraveler({ ...traveler, phoneNumber: event.target.value })}
          className={classes.textField}
        />
        <TextField
          id="specialrequest"
          label="Special Request"
          value={traveler.specialRequest}
          onChange={event => handlers.setTraveler({ ...traveler, specialRequest: event.target.value })}
          className={classes.textField}
        />
      </section>
      <section className={classes.payment}>
        <h1>Payment Information</h1>
        <div className={classes.cardDetails}>
          <TextField
            id="cardname"
            label="Cardholder's Name"
            value={card.cardName}
            onChange={event => handlers.setCard({ ...card, cardName: event.target.value })}
            className={classes.cardName}
          />
          <TextField
            id="cardnumber"
            label="Card Number"
            value={card.cardNumber}
            onChange={event => handlers.setCard({ ...card, cardNumber: event.target.value })}
            className={classes.cardNumber}
          />
        </div>
        <div className={classes.cardSecurity}>
          <TextField
            id="cvc"
            label="CVC Code"
            value={card.cvc}
            onChange={event => handlers.setCard({ ...card, cvc: event.target.value })}
            className={classes.cvc}
          />
          <span className={classes.expiryLabel}>Expiry Date: </span>
          <FormControl
            className={classes.month}
          >
            <InputLabel>Month</InputLabel>
            <Select
              value={card.expiryMonth}
              onChange={event => handlers.setCard({ ...card, expiryMonth: event.target.value })}
              inputProps={{ name: "expiryMonth" }}
            >
              {selectMonths}
            </Select>
          </FormControl>
          <FormControl
            className={classes.year}
          >
            <InputLabel>Year</InputLabel>
            <Select
              value={card.expiryYear}
              onChange={event => handlers.setCard({ ...card, expiryYear: event.target.value })}
              inputProps={{ name: "expiryYear" }}
            >
              {selectYears}
            </Select>
          </FormControl>
         </div>
      </section>reservation
      <p></p>
      <section className={classes.controls}>
        <Button variant="contained" color="primary" onClick={() => {handlers.checkout(card); reserve(hotel, reservation)}}>Submit</Button>
        <Button variant="contained" onClick={handlers.cancel}>Cancel</Button>
      </section>
    </form>
  )
};

export default withRouter(connect(mapState, null)(withStyles(styles)(paymentForm)));
