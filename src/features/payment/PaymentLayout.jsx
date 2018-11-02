import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import PaymentSummary from './summary/PaymentSummary';
import PaymentForm from './form/PaymentForm';
import { connect } from 'react-redux'
import {inputCard} from './PaymentBackend'

import firebase from "../../app/config/firebase";

// Styles
const styles = {
  paymentLayout: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: '8px',
    margin: '8px'
  }
};

// Some defaults for when data is not available
const defaults = {
  hotelSummary: { 
    hotelName: "hotelName",
    location: "location",
    rate: 100.00,
    nights: 4, // user picks
    subtotal: 420, // calc
    tax: 70.32, // calc
    fees: 15.00, // constant?
    total: 490.32 // calc
  },
  reservation: {
    startDate: new Date(),
    endDate: new Date(),
    rooms: 1,
    roomType: 1
  },
  hID: "lELnUhZ2MHPUTYutXDoy" 
}

// PaymentLayout Component
//
class PaymentLayout extends Component {
  state = {
    hotelSummary: undefined, // populated in componentDidMount,
    traveler: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      specialRequest: ""
    },
    card: {
      cardName: "",
      cardNumber: "",
      cvc: "",
      expiryMonth: "",
      expiryYear: "",
    },
    transaction: {
      hotelId: "",
      userId: "",
      total: 0
    },
  };

  componentDidMount() {
    // Populate hotel information
    const id = this.props.match.params.hotel_id;
    const db = firebase.firestore();
    const hotelRef = db.collection("testingHotels").doc(id);
    hotelRef
      .get()
      .then((snapShot) => {
        const h = snapShot.data();
        const hotel = {
          hotelName: h.name,
          location: `${h.street}, ${h.city}, ${h.state} ${h.zip}`,
          // according to Vivian, only need number of rooms but no room type
          rate: h.price,
        };
        this.setState({ hotelSummary: hotel })
      });
    
  }

  handlers = {
    setTraveler: traveler => this.setState({ traveler }),
    setCard: card => this.setState({ card }),
    checkout: card => this.props.inputCard(card),
    cancel: () => this.props.history.goBack()
  }

  render() {
    // PaymentSummary
    const { hotelSummary } = this.state.hotelSummary
      ? this.state
      : defaults
    const { reservation } = this.props.reservation
      ? this.props
      : defaults

    // PaymentForm props
    const {
      traveler,
      card
    } = this.state;
    // PaymentForm handlers
    const {
      setTraveler,
      setCard,
      checkout,
      cancel
    } = this.handlers;
    const paymentFormHandlers = {
      setCard,
      setTraveler,
      checkout,
      cancel
    };

    return (
      <div className={this.props.classes.paymentLayout}>
        <PaymentSummary
          hotel={hotelSummary}
          reservation={reservation}
        />
        <PaymentForm
          traveler={traveler}
          card={card}
          handlers={paymentFormHandlers}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cardstate: state.card.cardstate,
  reservation: state.reservation
});
const mapDispatchToProps = dispatch => ({
  inputCard: (card) => dispatch(inputCard(card))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(PaymentLayout)));
