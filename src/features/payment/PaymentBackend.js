export const inputCard = (card) => {
  return(dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore()
    firestore.set(`users/card`,{
      ...card,
      cardname: card.cardname,
      cardnumber: card.cardnumber,
      cvc: card.cvc,
      expirymonth: card.expirymonth,
      expiryyear: card.expiryyear
    }).then(() =>{
      dispatch({ type:'INPUT_CARD', card});
    }).catch((error) => {
      dispatch({type: 'INPUT_CARD_ERROR', error});
    })
    
  }
};