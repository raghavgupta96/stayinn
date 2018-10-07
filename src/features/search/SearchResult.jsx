import React from "react";

const SearchResult = ({ hotels }) => {
  const hotelList = hotels.map(hotel => {
<<<<<<< HEAD
    return hotel.room_cap >= 2 ? (
        <div key={hotel.id}>
            <img src={hotel.photoUrl} alt="hotel phote" height="50" width="80"/>
            <div>Hotel name: {hotel.name}</div>
            <div>Hotel ID: {hotel.hID}</div>
            <div>Hotel room max capacity: {hotel.room_cap}</div>
            <div>________________</div>
            
        </div>
    ) : null;
  })
  
  return (
    <div>
      {hotelList}
    </div>
  )
}
=======
    return (
      <div key={hotel.id}>
        <img src={hotel.photoUrl} alt="hotel phote" height="50" width="80" />
        <div>Hotel name: {hotel.name}</div>
        <div>Hotel name: {hotel.hID}</div>
        <div>Hotel room max capacity: {hotel.room_cap}</div>
        <div>________________</div>
      </div>
    );
  });
>>>>>>> e52209bd0ebd81092ee2c460b198c4a2daa9ca22

  return <div>{hotelList}</div>;
};

export default SearchResult;
