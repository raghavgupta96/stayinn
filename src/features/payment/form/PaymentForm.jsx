import React from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import './PaymentForm.css';
//import Stripe from 'stripe';
import connect from 'react-redux';
import firestoreConnect from 'react-redux-firebase';
//<script src="https://js.stripe.com/v3/"></script>

const expiryYearSelectStart = 2018;
const expiryYearSelectEnd = 2030;

const paymentForm = props => {
  const {
    traveler,
    card,
    handlers
  } = props

  // Select Months
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

  // Select Years
  const selectYears= [ ]
  for (let i = expiryYearSelectStart; i <= expiryYearSelectEnd; i++) {
    selectYears.push(
      <MenuItem
        value={i}
        key={i}
      >{i}
      </MenuItem>
    )
  }
 

  return (
    <div className="PaymentForm">
      <form>
        <section className="TravelerInformation">
          <h1>Traveler Information</h1>
          <TextField
            id="firstname"
            label="First Name"
            value={traveler.firstname}
            onChange={event => handlers.setTraveler({ ...traveler, firstname: event.target.value })}
          />
          <TextField
            id="lastname"
            label="Last Name"
            value={traveler.lastname}
            onChange={event => handlers.setTraveler({ ...traveler, lastname: event.target.value })}
          />
          <TextField
            id="email"
            label="Email"
            value={traveler.email}
            onChange={event => handlers.setTraveler({ ...traveler, email: event.target.value })}
          />
          <TextField
            id="phonenumber"
            label="Phone Number"
            value={traveler.phonenumber}
            onChange={event => handlers.setTraveler({ ...traveler, phonenumber: event.target.value })}
          />
          <TextField
            id="specialrequest"
            label="Special Request"
            value={traveler.specialrequest}
            onChange={event => handlers.setTraveler({ ...traveler, specialrequest: event.target.value })}
          />
        </section>
        <section className="PaymentInformation">
          <h1>Payment Information</h1>
          <TextField
            id="cardname"
            label="Cardholder's Name"
            value={card.cardname}
            onChange={event => handlers.setCard({ ...card, cardname: event.target.value })}
          />
          <TextField
            id="cardnumber"
            label="Card Number"
            value={card.cardnumber}
            onChange={event => handlers.setCard({ ...card, cardnumber: event.target.value })}
          />
          <TextField
            id="cvc"
            label="CVC Code"
            value={card.cvc}
            onChange={event => handlers.setCard({ ...card, cvc: event.target.value })}
          />
          <Select>
            value={card.expirymonth}
            onChange={event => handlers.setCard({ ...card, expiryMonth: event.target.value })}
          >
            {selectMonths}
          </Select>
          <Select>
            value={card.expiryYear}
            onChange={event => handlers.setCard({ ...card, expiryMonth: event.target.value })}
          >
            {selectYears}
          </Select>   

        </section>
        <section className="PaymentFormControls">
          <Button onClick={() => handlers.checkout(card)}>Checkout</Button>
          <Button onClick={handlers.cancel}>Cancel</Button>
        </section>

      </form>
    </div>
  )
};
export default paymentForm;//connect(firestoreConnect([{collection: 'users.card'}]))
