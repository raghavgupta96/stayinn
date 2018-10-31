const filterReducer = (state = {
    hotelType: "nonspecific",
    minPrice: 100000,
    maxPrice: 100000,
    gymChecked: "",
    barChecked: "",
    swimmingPoolChecked: "",
    sortOrder: "",
}, action) => {
    switch (action.type) {
        case "SET_HOTELTYPE":
            state = {
                ...state,
                hotelType: action.payload
            };
            break;
        case "SET_MINPRICE":
            state = {
                ...state,
                minPrice: action.payload
            };
            break;
        case "SET_MAXPRICE":
            state = {
                ...state,
                maxPrice: action.payload
            };
            break;
        case "SET_GYMCHECKED":
            state = {
                ...state,
                gymChecked: action.payload
            }
            break;
        case "SET_BARCHECKED":
            state = {
                ...state,
                barChecked: action.payload
            }
        break;
        case "SET_SWIMMINGPOOLCHECKED":
            state = {
                ...state,
                swimmingPoolChecked: action.payload
            }
        break;
        case "SET_SORTORDER":
        state = {
                ...state,
                sortOrder: action.payload
            }
        break;
        default:
            break;
    }
    return state;
};

export default filterReducer;
