const reservationReducer = (state = {
    startdate: new Date(),
    enddate: new Date(),
    rooms: 1,
    roomtype: 1
}, action) => {
    switch (action.type) {
        case "SET_STARTDATE":
            state = {
                ...state,
                startdate: action.payload
            };
            break;
        case "SET_ENDDATE":
            state = {
                ...state,
                enddate: action.payload
            };
            break;
        case "SET_ROOMTYPE":
            state = {
                ...state,
                roomtype: action.payload
            };
            break;
        case "SET_ROOMS":
            state = {
                ...state,
                rooms: action.payload
            }
            break;
    }
    return state;
};

export default reservationReducer;

// ***** payment summary properties ********
// hotelname,
// location,
// startdate,
// enddate,
// roomtype,
// rate,
// nights, // Not a prop
// rooms,
// subtotal, // Not a prop
// tax, // Not a prop
// fees, // Not a prop
// total // Not 
