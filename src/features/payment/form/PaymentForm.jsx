import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

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

const paymentForm = props => {
  const {
    traveler,
    card,
    handlers,
    classes
  } = props

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
      </section>
      <p></p>
      <section className={classes.controls}>
        <Button variant="contained" color="primary" onClick={() => handlers.checkout(card)}>Submit</Button>
        <Button variant="contained" onClick={handlers.cancel}>Cancel</Button>
      </section>
    </form>
  )
};

export default withStyles(styles)(paymentForm);
