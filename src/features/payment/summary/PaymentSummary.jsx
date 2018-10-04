import React from 'react';

import './PaymentSummary.css'

const paymentSummary = props => {
  const {
    hotelname,
    location,
    startdate,
    enddate,
    roomtype,
    rate,
    nights, // Not a prop
    rooms,
    subtotal, // Not a prop
    tax, // Not a prop
    fees, // Not a prop
    total // Not a prop
  } = props.trip;

  return (
    <div className="PaymentSummary">
      <div className="PaymentSummaryContent">
        <h1>Trip Summary</h1>
        <section>
          <h2>{hotelname}</h2>
          <p>{location}</p>
        </section>
        <section>
          <h2>Travel Dates</h2>
          <p>Check-in: {startdate.toString()}</p>
          <p>Check-out: {enddate.toString()}</p>
        </section>
        <section>
          <h2>Room Type</h2>
          <p>{roomtype}</p>
        </section>
        <section className="PaymentSummaryCalculation">
          <div>
            <h2>Rate per night:</h2>
            <h2>USD {rate}</h2>
          </div>
          <div>
            <h2>Nights:</h2>
            <h2>{nights}</h2>
          </div>
          <div>
            <h2>Rooms:</h2>
            <h2>{rooms}</h2>
          </div>
          <div>
            <h2>Subtotal:</h2>
            <h2>USD {subtotal}</h2>
          </div>
          <div>
            <h2>Tax + Service Fees</h2>
            <h2>USD {tax + fees}</h2>
          </div>
        </section>
      </div>
      <div className="PaymentSummaryTotal">
        <h2>StayInn total</h2>
        <h2>USD {total}</h2>
      </div>
    </div>
  )
};

export default paymentSummary;
