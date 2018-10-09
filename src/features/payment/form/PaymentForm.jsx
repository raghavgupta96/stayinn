import React from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import DropDownMenu from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import './PaymentForm.css';
//import Stripe from 'stripe';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import {inputCard} from '../PaymentBackend'
import {connect} from 'react-redux'
import PaymentLayout from '../PaymentLayout';
const expiryYearSelectStart = 2018;
const expiryYearSelectEnd = 2030;



const paymentForm = props => {
  const {
    traveler,
    card,
    handlers
  } = props

  

  // Select Years
  const selectYears= [ ]
  for (let i = expiryYearSelectStart; i <= expiryYearSelectEnd; i++) {
    selectYears.push(
      <MenuItem value={i} key={i}>
      {i}
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
        {/*</form>*/}

        {/*possible multiple forms on this page*/}

        {/*<form>*/}
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
          <Select onChange={event => 
              handlers.setCard({ ...card, expirymonth: event.target.value })} 
              value={card.expirymonth}
              >
            <MenuItem value={1}>Jan</MenuItem>
            <MenuItem value={2}>Feb</MenuItem>
            <MenuItem value={3}>Mar</MenuItem>
            <MenuItem value={4}>Apr</MenuItem>
            <MenuItem value={5}>May</MenuItem>
            <MenuItem value={6}>Jun</MenuItem>
            <MenuItem value={7}>Jul</MenuItem>
            <MenuItem value={8}>Aug</MenuItem>
            <MenuItem value={9}>Sep</MenuItem>
            <MenuItem value={10}>Oct</MenuItem>
            <MenuItem value={11}>Nov</MenuItem>
            <MenuItem value={12}>Dec</MenuItem>
          </Select>
          <Select onChange={event => handlers.setCard({ ...card, expiryyear: event.target.value })} 
            value={card.expiryyear}>  
            {selectYears}
          </Select>   

        </section>
        <section className="PaymentFormControls">
          <Button onClick={() => handlers.checkout(card)}>Checkout</Button>
          <Button onClick={handlers.cancel}>Cancel</Button>
        </section>

      </form>
    </div>
  )}

  
export default (paymentForm);
