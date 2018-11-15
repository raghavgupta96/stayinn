import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  paymentForm: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '16px',
    boxShadow: '0 2px 10px -3px black',
    '& Button': {
      color: 'white'
    }
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
  points: {
    display: 'flex',
    flexFlow: 'column nowrap'
  },
  redeemPoints: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between'
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

// Init Select MenuItems
// Months MenuItems
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

// Years MenuItems
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

const PaymentForm = (props) => {
  const { classes, form, points, guestUser } = props;
  const { setForm, toggleRewards, checkout, cancel, validateName, validateNumber } = props.handlers;

  const isMissingFields = (
    form.firstName === ""
    || form.lastName === ""
    || form.email === ""
    || form.phoneNumber === ""
    || form.cardName === ""
    || form.cardNumber.toString().length !== 16
    || form.cvc.toString().length !== 3
    || form.expiryMonth === ""
    || form.expiryYear === ""
  );

  return (
    <form className={classes.paymentForm}>
      <section className={classes.traveler}>
        <h1>Traveler Information</h1>
        <p>* = Required</p>
        <div className={classes.name}>
          <TextField
            id="firstname"
            label="First Name"
            value={form.firstName}
            onChange={event => setForm({ ...form, firstName: event.target.value })}
            className={classes.firstName}
          />
          <TextField
            id="lastname"
            label="Last Name"
            value={form.lastName}
            onChange={event => setForm({ ...form, lastName: event.target.value })}
            className={classes.lastName}
          />
        </div>
        <TextField
          id="email"
          label="Email"
          value={form.email}
          onChange={event => setForm({ ...form, email: event.target.value })}
          className={classes.textField}
        />
        <TextField
          id="phonenumber"
          label="Phone Number"
          value={form.phoneNumber}
          onChange={event => setForm({ ...form, phoneNumber: event.target.value })}
          className={classes.textField}
        />
        <TextField
          id="specialrequest"
          label="Special Request"
          value={form.specialRequest}
          onChange={event => setForm({ ...form, specialRequest: event.target.value })}
          className={classes.textField}
        />
      </section>
      <section className={classes.payment}>
        <h1>Payment Information</h1>
        {!guestUser && (<div className={classes.points}>
          <h2>Redeem Points</h2>
          <div className={classes.redeemPoints}>
            <h2>Rewards Points: {`${points.userPoints}`}</h2>
            <Button
              variant="contained"
              color="primary"
              onClick={toggleRewards}
            >Apply Points</Button>
          </div>
        </div>)}
        <div className={classes.cardDetails}>
          <h2>Card Information</h2>
          <TextField
          required
            id="cardname"
            label="Cardholder's Name"
            value={form.cardName}
            type = "text"
            
            onChange={event => setForm({ cardName: event.target.value })}
            onInput = {(e) =>{
              var letters = /^[A-Za-z]+$/;
              var space = '&nbsp;'
              if(!(e.target.value).match(letters) && e.target.value !== space)
              {
                e.target.value = e.target.value.substring(0,e.target.value.length-1)
              }
              }} 
            className={classes.cardName}
          />
          <TextField
          required
            id="cardnumber"
            label="Card Number"
            type = "number"
            value={form.cardNumber}
            onChange={event => setForm({ cardNumber: event.target.value })}
            onInput={(e) =>{e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,16)}}
            className={classes.cardNumber}
          />
        </div>
        <div className={classes.cardSecurity}>
          <TextField
          required
          type = "number"
          onInput = {(e) =>{e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,3)}}
            id="cvc"
            label="CVC Code"
            value={form.cvc}
            onChange={event => setForm({ cvc: event.target.value })}
            className={classes.cvc}
          />
          <span className={classes.expiryLabel}>Expiry Date: </span>
          <FormControl
            className={classes.month}
          >
            <InputLabel>Month</InputLabel>
            <Select
            required
              value={form.expiryMonth}
              onChange={event => setForm({ expiryMonth: event.target.value })}
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
            required
              value={form.expiryYear}
              onChange={event => setForm({ expiryYear: event.target.value })}
              inputProps={{ name: "expiryYear" }}
            >
              {selectYears}
            </Select>
          </FormControl>
         </div>
      </section>
      <p></p>
      <section className={classes.controls}>
        <Button
          disabled={isMissingFields}
          variant="contained"
          color="primary"
          //onClick = {validate}
          onClick={checkout}
        > Submit
        </Button>
        <Button
          variant="contained"
          onClick={cancel}
        > Cancel
        </Button>
      </section>
    </form>
  )
};

export default withStyles(styles)(PaymentForm);
