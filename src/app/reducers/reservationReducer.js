const reservationReducer = (state = {
    startDate: new Date(),
    endDate: new Date((new Date()).setTime( (new Date()).getTime() + 86400000 )),
    rooms: 1,
    roomType: 1,
    place: null,
}, action) => {
    switch (action.type) {
        case "SET_STARTDATE":
            state = {
                ...state,
                startDate: action.payload
            };
            break;
        case "SET_ENDDATE":
            state = {
                ...state,
                endDate: action.payload
            };
            break;
        case "SET_ROOMTYPE":
            state = {
                ...state,
                roomType: action.payload
            };
            break;
        case "SET_ROOMS":
            state = {
                ...state,
                rooms: action.payload
            }
            break;
        case "SET_PLACE":
            state = {
                ...state,
                place: action.payload
            }
            break;
        default:
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
