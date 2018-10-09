import React from 'react'

const SearchResult = ({hotels}) => {
  const hotelList = hotels.map(hotel => {
    return (
        <div key={hotel.id}>
            <img src={hotel.photoUrl} alt="hotel phote" height="50" width="80"/>
            <div>Hotel name: {hotel.name}</div>
            <div>Hotel name: {hotel.hID}</div>
            <div>Hotel room max capacity: {hotel.room_cap}</div>
            <div>________________</div>
            
        </div>
    )
  })
  
  return (
    <div>
      {hotelList}
    </div>
  )
}

export default SearchResult