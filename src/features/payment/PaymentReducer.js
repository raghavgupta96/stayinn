
const initState = {
    cardstate: {cardnumber: '10', cardname: 'chad', cardcvc: '100', expirymonth: '01', expiryyear: '2019'}
}
const PaymentReducer = (state = initState, action) => {
    switch(action.type){
        case 'INPUT_CARD':
            console.log('card input', action.card);
            return state;
        case 'INPUT_CARD_ERROR':
            console.log('input card error', action.error);
            return state;
        default:
            return state;
}
}


export default PaymentReducer