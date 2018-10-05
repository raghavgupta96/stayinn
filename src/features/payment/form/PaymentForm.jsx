import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';


import './PaymentForm.css';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 260,   
  },
});

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
      <form className = "PaymentStyle" autoComplete="off">
        <section className="TravelerInformation">
          <h1>Traveler Information</h1>
          <p>Options with * mark must be filled!</p>

          <div className="TravelerNameField">
            <TextField
              id="firstName"
              label="First Name*"
              value={traveler.firstName}
              onChange={event => handlers.setTraveler({ ...traveler, firstName: event.target.value })}
            />
            <TextField
              id="lastname"
              label="Last Name*"
              value={traveler.lastname}
              onChange={event => handlers.setTraveler({ ...traveler, lastname: event.target.value })}
            />
          </div>

          <div className="TravelerInfoField">
          <TextField
            id="email"
            label="Email*"
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
          </div>
        </section>
        <section className="PaymentInformation">
          <h1>Payment Information</h1>

          <div className = "PaymentCardInfo">
          <TextField
            id="cardname"
            label="Cardholder's Name*"
            value={card.cardname}
            onChange={event => handlers.setCard({ ...card, cardname: event.target.value })}
          />
          <TextField
            id="cardnumber"
            label="Card Number*"
            value={card.cardnumber}
            onChange={event => handlers.setCard({ ...card, cardnumber: event.target.value })}
          />
          </div>
          <TextField
            id="cvc"
            label="CVC Code*"
            value={card.cvc}
            onChange={event => handlers.setCard({ ...card, cvc: event.target.value })}
          />
          <FormControl className={styles.formControl}>
            <InputLabel htmlFor="MonthLabel">Month*</InputLabel>
            <Select>

              value={card.expirymonth}
              onChange={event => handlers.setCard({ ...card, expiryMonth: event.target.value })}
              input={<Input id="MonthLabel" />}
            >
              {selectMonths}
            </Select>
          </FormControl>

          <FormControl className={styles.formControl}>
          <InputLabel htmlFor="YearLabel">Year*</InputLabel>
          <Select>
            value={card.expiryYear}
            onChange={event => handlers.setCard({ ...card, expiryMonth: event.target.value })}
            input={<Input id="YearLabel" />}
          >
            {selectYears}
          </Select>
          </FormControl>
        </section>
        <section className="PaymentFormControls">
          <Button variant="contained" color="primary" onClick={() => handlers.checkout(card)}>Checkout</Button>
          <Button variant="contained" onClick={handlers.cancel}>Cancel</Button>
        </section>

      </form>
    </div>
  )
};

export default withStyles(styles)(paymentForm);
