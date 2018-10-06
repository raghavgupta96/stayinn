import { SIGN_OUT_USER } from "./authConstants";
import { SubmissionError } from 'redux-form'

export const login = creds => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    try {
        await firebase.auth().signInWithEmailAndPassword(creds.email, creds.password).then(function (creds) {
          const user = firebase.auth().currentUser;
          const verified = user.emailVerified;
          console.log(user);
          if (verified) {
            window.location.href = "/";
            console.log("You're in!");
          } else {
            console.log("Email not verified homie!");
          }
        });
        // const user = firebase.auth().currentUser;
        // const verified = user.emailVerified;
        // firebase.auth().signInWithEmailAndPassword(creds.email, creds.password);
        //   console.log(user);
        //   if (verified) {
        //     console.log("You're in!");
        //   } else {
        //     console.log("Email not verified homie!");
        //   }
    
    } catch (error) {
      console.log(error);
      throw new SubmissionError({
        _error: error.message
      })
    }
  }
};

export const logout = () => {
  return {
    type: SIGN_OUT_USER
  };
};

export const registerUser = (user) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  try {
    // create user in atuh
    let createdUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password);
    console.log(createdUser);
    // update the auth profile
    await createdUser.sendEmailVerification().then(function() {
      // Email sent.
    }).catch(function(error) {
      // An error happened.
    });
    await createdUser.updateProfile({
        displayName: user.displayName,
        phoneNumber: user.phoneNumber,
        //photoURL: user.photoUrl
    })
    // create a new profile in firestore
    let newUser = {
        displayName: user.displayName,
        createdAt: firestore.FieldValue.serverTimestamp(),
        //address: user.address,
        phoneNumber: user.phoneNumber
        //photoURL: user.photoUrl
    };
    await firestore.set(`users/${createdUser.uid}`, {...newUser});
    window.location.href = "/";
    firebase.logout();
  } catch (error) {
    console.log(error);
    throw new SubmissionError({
      _error: error.message
    });
  }
};