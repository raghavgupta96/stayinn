export const inputCard = (card) => {
  return(dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore()
    firestore.set(`users/card`,{
      ...card,
      cardname: 'chad',
      cardnumber: '100',
      cvc: '100',
      expirymonth: '1',
      expiryyear: '2019'
    }).then(() =>{
      dispatch({ type:'INPUT_CARD', card});
    }).catch((error) => {
      dispatch({type: 'INPUT_CARD_ERROR', error});
    })
    
  }
};