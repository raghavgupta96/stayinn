import { SubmissionError } from 'redux-form'

export const paydata = card => {
  return async (dispatch, add, { getFirebase }) => {
    const firebase = getFirebase();
      firebase.collection('card').add({ 
        billingaddress: 'home',
        cardname: 'chad',
        cardnumber: '10101010101010',
        cvc: '100',
        expirymonth: 'jan',
        expiryyear: '2020'
        
      }).catch((error) => {
      console.log(error);
      throw new SubmissionError({
      _error: error.message
      })
    }
      )}
};

// export const reserve = (hotel, reservation) => {
//   return async (dispatch, add, { getFirebase,getFirestore }) => {
//     console.log("From Payment Backend: ", hotel)
//     // const firestore = getFirestore();
//     // firestore.collection('reservations').add({
//     //   checkinDate: 
//     // })
//   }
// }