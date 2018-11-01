export const populate = () => {
    return async (dispatch, getState, { getFirebase }) => {
      const firebase = getFirebase();
      const db = firebase.firestore();
      
    db.collection("testingHotels").add({

    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    };
};