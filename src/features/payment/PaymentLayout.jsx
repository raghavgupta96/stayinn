import React, { Component } from "react";

import { withRouter } from "react-router-dom";

import PaymentSummary from "./summary/PaymentSummary";
import PaymentForm from "./form/PaymentForm";

import "./PaymentLayout.css";

class PaymentLayout extends Component {
  state = {
    traveler: {
      firstname: "",
      lastname: "",
      email: "",
      phonenumber: "",
      specialrequest: ""
    },
    card: {
      // address: "", // Does stripe need this?
      cardname: "",
      cardnumber: "",
      cvc: "",
      expirymonth: "",
      expiryyear: ""
    },
    transaction: {
      hotelId: "",
      userId: "",
      total: 0
    },
    // defaults
    defaulttrip: {
      hotelname: "hotelname",
      location: "location",
      startdate: new Date(),
      enddate: new Date(),
      roomtype: "roomtype",
      rate: 100.0,
      nights: 4,
      rooms: 1,
      subtotal: 420,
      tax: 70.32,
      fees: 15.0,
      total: 490.32
    }
  };

  handlers = {
    setTraveler: traveler => this.setState({ traveler }),
    setCard: card => this.setState({ card }),
    checkout: card => window.alert(card.cardnumber), // For Chad :)
    cancel: () => this.props.history.goBack()
  };

  render() {
    // PaymentSummary
    const trip = this.props.trip ? this.props.trip : this.state.defaulttrip;

    // PaymentForm props
    const { traveler, card } = this.state;
    // PaymentForm handlers
    const { setTraveler, setCard, checkout, cancel } = this.handlers;
    const paymentFormHandlers = {
      setCard,
      setTraveler,
      checkout,
      cancel
    };

    return (
      <div className="PaymentLayout">
        <PaymentSummary trip={trip} />
        <PaymentForm
          traveler={traveler}
          card={card}
          handlers={paymentFormHandlers}
        />
      </div>
    );
  }
}

export default withRouter(PaymentLayout);
