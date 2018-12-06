import { connect } from "react-redux";

export const inputCard = card => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    if (firebase.auth().currentUser) {
      const user = firebase.auth().currentUser.uid;

      firestore
        .update(`users/${user}`, { card })
        .then(() => {
          dispatch({ type: "INPUT_CARD", card });
        })
        .catch(error => {
          dispatch({ type: "INPUT_CARD_ERROR", error });
        });
    }
  };
};
