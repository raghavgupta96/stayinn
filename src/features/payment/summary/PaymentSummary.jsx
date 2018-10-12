import React from 'react';

import { withStyles } from '@material-ui/core/styles';

// Styles
//
const styles = theme => ({
  paymentSummary: {
    display: 'flex',
    flexFlow: 'column nowrap',
    margin: '16px',
    boxShadow: '0 2px 10px -3px black',
    '& h2': {
      margin: 0,
      fontSize: '1.25em'
    }
  },
  content: {
    margin: '16px',
    '& section': {
      margin: '32px 0',
    },
    '& section *': {
      margin: '4px 0'
    } 
  },
  calculation: {
    '& div': {
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: 'space-between'
    }
  },
  subtotal: { // TODO: Set color to correct palette color
    '& h2': {
      color: theme.palette.tertiary_orange.main
    }
  },
  total: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    padding: '16px',
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.tertiary_lightblue.main
  }
});

// paymentSummary Component
//
const paymentSummary = props => {
  const {
    hotelName,
    location,
    startDate,
    endDate,
    roomType,
    rate,
    nights, // Not a prop
    rooms,
    subtotal, // Not a prop
    tax, // Not a prop
    fees, // Not a prop
    total // Not a prop
  } = props.trip;

  const { classes } = props;

  // _dateToString(Date) : string
  // Convenience method to convert dates to format
  // specified in wireframe
  //
  const _dateToString = (date) => {
    const days = {
      0: 'Sun',
      1: 'Mon',
      2: 'Tue',
      3: 'Wed',
      4: 'Thu',
      5: 'Fri',
      6: 'Sat'
    };
    const months = {
      0: 'Jan',
      1: 'Feb',
      2: 'Mar',
      3: 'Apr',
      4: 'May',
      5: 'Jun',
      6: 'Jul',
      7: 'Aug',
      8: 'Sep',
      9: 'Nov',
      10: 'Oct',
      11: 'Nov',
      12: 'Dec'
    }
    const wd = date.getDay();
    const m = date.getMonth();
    const d = date.getDate();
    const y = date.getFullYear();

    return `${days[wd]}, ${months[m]} ${d}, ${y}`;
  }

  // Render
  //
  return (
    <div className={classes.paymentSummary}>
      <div className={classes.content}>
        <h1>Trip Summary</h1>
        <section>
          <h2>{hotelName}</h2>
          <p>{location}</p>
        </section>
        <section>
          <h2>Travel Dates</h2>
          <p>Check-in: {_dateToString(startDate)}</p>
          <p>Check-out: {_dateToString(endDate)}</p>
        </section>
        <section>
          <h2>Room Type</h2>
          <p>{roomType}</p>
        </section>
        <section className={classes.calculation}>
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
          <div className={classes.subtotal}>
            <h2>Subtotal:</h2>
            <h2>USD {subtotal}</h2>
          </div>
          <div>
            <h2>Tax + Service Fees</h2>
            <h2>USD {tax + fees}</h2>
          </div>
        </section>
      </div>
      <div className={classes.total}>
        <h2>StayInn total</h2>
        <h2>USD {total}</h2>
      </div>
    </div>
  )
};

export default withStyles(styles, { withTheme: true })(paymentSummary);