import { connect } from "react-redux";

//var stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

//const token = request.body.stripeToken; // Using Express

//const charge = stripe.charges.create({
//  amount: 999,
//  currency: 'usd',
//  description: 'Example charge',
//  source: token,
//});


export const inputCard = (card) => {
  return async (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore()
    const firebase = getFirebase()

    //await firebase.auth().signInWithEmailAndPassword(creds.email, creds.password);
    //firebase.firestore().collection("card",{
      //let userRef = firebase.firestore().collection("users").doc(user.uid);
      //console.log(userRef)
      const user = firebase.auth().currentUser.uid;
      
      firestore.update(`users/${user}`, {
        card: card

    }).then(() =>{
      dispatch({ type:'INPUT_CARD', card});
      window.location.href = `/profile/${user}`
    }).catch((error) => {
      dispatch({type: 'INPUT_CARD_ERROR', error});
    })
    
  }
};
//connect(mapState)(PaymentBackend)
     /* cardname: card.cardname,
      cardnumber: card.cardnumber,
      cvc: card.cvc,
      expirymonth: card.expirymonth,
      expiryyear: card.expiryyear
      */