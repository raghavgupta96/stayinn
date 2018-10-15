import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import PaymentSummary from './summary/PaymentSummary';
import PaymentForm from './form/PaymentForm';

// Styles
//
const styles = {
  paymentLayout: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: '8px',
    margin: '8px'
  }
};

// PaymentLayout Component
//
class PaymentLayout extends Component {
  state = {
    // Traveler Info
    //
    traveler: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      specialRequest: ""
    },
    // Card Info
    //
    card: {
      // address: "", // Does stripe need this?
      cardName: "",
      cardNumber: "",
      cvc: "",
      expiryMonth: "",
      expiryYear: "",
    },
    // Transaction Info
    //
    transaction: {
      hotelId: "",
      userId: "",
      total: 0
    },
    // Default Trip
    // If no props are passed, this object is used
    //
    defaulttrip: { 
      hotelName: "hotelname",
      location: "location",
      startDate: new Date(),
      endDate: new Date(),
      roomType: "roomtype",
      rate: 100.00,
      nights: 4,
      rooms: 1,
      subtotal: 420,
      tax: 70.32,
      fees: 15.00,
      total: 490.32
    }
  };

  // handlers
  // Pass these down to children so they can modify this component's state
  //
  handlers = {
    setTraveler: traveler => this.setState({ traveler }),
    setCard: card => this.setState({ card }),
    checkout: (card) => window.alert(JSON.stringify(card)), // For Chad :)
    cancel: () => this.props.history.goBack()
  }

  render() {
    // PaymentSummary props
    // 
    const trip = this.props.trip
      ? this.props.trip
      : this.state.defaulttrip;

    // PaymentForm props
    //
    const {
      traveler,
      card
    } = this.state;
    // PaymentForm handlers
    //
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
          trip={trip}
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

export default withStyles(styles)(withRouter(PaymentLayout));