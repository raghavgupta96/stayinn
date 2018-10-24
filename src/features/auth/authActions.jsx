import { SIGN_OUT_USER } from "./authConstants";
import { SubmissionError } from "redux-form";

export const login = creds => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const db = firebase.firestore();
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(creds.email, creds.password)
        .then(function(creds) {
          const user = firebase.auth().currentUser;
          const verified = user.emailVerified;
          // Check if the user's email address is verified before login completion
          if (verified) {
            db.collection("users").doc(user.uid).get().then(doc => {
              const docRef = doc.data();
              console.log("First Login: " + docRef.firstLogin);
              // If it is the first time the user is logging in, route to profile setup.
              // If not, go to the homepage.
              if(docRef.firstLogin) {
                window.location.href = "/profileSetup"
              } else {
                window.location.href = "/";
              }
            });         
          } else {
            console.log("Email not verified homie!");
            firebase.logout();
          }
        });
    } catch (error) {
      console.log(error);
      throw new SubmissionError({
        _error: error.message
      });
    }
  };
};

export const logout = () => {
  return {
    type: SIGN_OUT_USER
  };
};

export const registerUser = user => async (
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

    // Send email verification to user email provided
    await createdUser
      .sendEmailVerification()
      .then(function() {
        // Email sent.
      })
      .catch(function(error) {
        // An error happened.
      });

    // create a new profile in firestore
    let newUser = {
      createdAt: firestore.FieldValue.serverTimestamp(),
      email: user.email,
      firstLogin: true,
      reward: 0
    };

    await firestore.set(`users/${createdUser.uid}`, { ...newUser });
    window.location.href = "/";
    firebase.logout();
  } catch (error) {
    console.log(error);
    throw new SubmissionError({
      _error: error.message
    });
  }
};

export const updateUser = user => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const db = firebase.firestore();
  // const firestore = getFirestore();
  try {
    const currentUser = firebase.auth().currentUser;

    // Check if user updates the name
    // if it does, update the info stored both in authentication
    // and firestore

    if (user.displayName) {
      await currentUser.updateProfile({
        displayName: user.displayName
      });
      await firebase
        .firestore()
        .collection("users")
        .doc(currentUser.uid)
        .update({
          displayName: user.displayName
        })
        .then(function() {
          //window.location.href = `/profile/${currentUser.uid}`;
          console.log("DISPLAY Name")
        })
        .catch(function(error) {
          console.log(error);
        });
        window.location.href = `/profile/${currentUser.uid}`;
    }

    // Check if user updates the phone number
    // if it does, update the info stored both in authentication
    // and firestore
    if (user.phoneNumber) {
      await firebase
        .firestore()
        .collection("users")
        .doc(currentUser.uid)
        .update({
          phoneNumber: user.phoneNumber
        })
        .then(function() {
          //window.location.href = `/profile/${currentUser.uid}`;
          console.log("Phone Number")
        })
        .catch(function(error) {
          console.log(error);
        });
        window.location.href = `/profile/${currentUser.uid}`;
    }

    // Check if user updates the profile image
    // if it does, update the info stored both in authentication
    // and firestore
    console.log("Upload: " + user.photoFile);
      if (user.photoFile) {
      // file uploaded from user will be named
      // after its userId
      var storageRef = await firebase
        .storage()
        .ref()
        .child(currentUser.uid);
      await storageRef.put(user.photoFile[0]).then(function(snapshot) {
        console.log("Uploaded a blob or file!");
      });

      // upload the local profile picture to firebase storage
      var uploadTask = storageRef.put(user.photoFile[0]);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        function(snapshot) {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log("Upload is paused");
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log("Upload is running");
              break;
            default:
              console.log("continue....");
          }
        },
        function(error) {
          console.log("Your upload is not successful.");
        },
        function() {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log("File available at", downloadURL);
            currentUser.updateProfile({
              photoURL: downloadURL
            });
            firebase
              .firestore()
              .collection("users")
              .doc(currentUser.uid)
              .update({
                photoURL: downloadURL
              })
              .then(function() {
                console.log("upload pic");
                window.location.href = `/profile/${currentUser.uid}`;
              })
              .catch(function(error) {
                console.log(error);
              });
          });
        }
      );
    } 

    // If first login is true, set to false if at profile setup page.
    // Profile setup page should only show once.
    console.log("You logged in man? " + currentUser.firstLogin);
    await db.collection("users").doc(currentUser.uid).get().then(doc => {
      const docRef = doc.data();
      console.log(docRef.firstLogin);
      if(docRef.firstLogin){
        console.log("first login INSIDE")
        firebase
        .firestore()
        .collection("users")
        .doc(currentUser.uid)
        .update({
          firstLogin: false
        }).then(function () {
            window.location.href = `/profile/${currentUser.uid}`;
        });
      } 
    });
  } catch (error) {
    console.log(error);
    throw new SubmissionError({
      _error: error.message
    });
  }
};