import React from "react";
import { Link }from 'react-router-dom';

const SearchResult = ({ hotels }) => {
  //check if the search result is empty
  const hotelList = hotels.length ? (
    hotels.map(hotel => {
      //filter goes here
      return hotel.room_cap >= 2 ? (
        // this is for for an individual hotel card below
          <div key={hotel.id}>
              <img src={hotel.photoUrl} alt="hotel phote" height="50" width="80"/>
              <Link to={'/hotel/' + hotel.hID}>
                <div>Hotel name: {hotel.name}</div>
              </Link>
              <div>Hotel ID: {hotel.hID}</div>
              <div>Hotel room max capacity: {hotel.room_cap}</div>
              <div>________________</div>
              
          </div>
      ) : null;
    })

  ) : (
    <p> There is no hotel match your searching.</p>
  )
  
  return (
    <div>
      {hotelList}
    </div>
  )
}

export default SearchResult;
