import React, { Component } from "react";
import firebase from "../../app/config/firebase";

class Hotel extends Component {
  state = {
    hID: null,
    name: null,
    room_cap: null,
    photoUrl: null,
    type: null
  };

  //get the hotel id from the link
  componentDidMount() {
    const id = this.props.match.params.hotel_id;

    const db = firebase.firestore();

    //uery the hotel data from firestore
    db.collection("testingHotels")
      .doc(id)
      .get()
      .then(doc => {
        console.log(doc.id, " => ", doc.data());

        var ref = doc.data();

        this.setState({
          name: ref.name,
          hID: doc.id,
          maxCap: ref.maxBeds,
          photoUrl: ref.photoURL,
          type: ref.type,
          street: ref.street,
          city: ref.city,
          state: ref.state,
          zip: ref.zip,
          bar: ref.bar,
          gym: ref.gym,
          price: ref.price,
          swimmingPool: ref.swimmingPool,
          searchKey: ref.searchKey
        });
      });
  }

  render() {
    // check if the hotel exists
    const hotel = this.state.hID ? (
      <div>
        <p>Hotel ID: {this.state.hID}</p>
        <p>Hotel Name: {this.state.name}</p>
        <p>Maximum beds capacity: {this.state.room_cap}</p>
      </div>
    ) : (
      // <div> Hotel is not existed</div>
      <div>Loading...</div>
    );

    return <div>{hotel}</div>;
  }
}

export default Hotel;
