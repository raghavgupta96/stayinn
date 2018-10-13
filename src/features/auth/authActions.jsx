import { SIGN_OUT_USER } from "./authConstants";
import { SubmissionError } from "redux-form";

export const login = creds => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(creds.email, creds.password)
        .then(function(creds) {
          const user = firebase.auth().currentUser;
          const verified = user.emailVerified;
          console.log(user);
          if (verified) {
            window.location.href = "/";
            console.log("You're in!");
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
<<<<<<< HEAD

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
      email: user.email
    };

    await firestore.set(`users/${createdUser.uid}`, { ...newUser });
    window.location.href = "/";
=======
    // update the auth profile
    await createdUser.sendEmailVerification().then(function() {
      // Email sent.
    }).catch(function(error) {
      // An error happened.
    });
    await createdUser.updateProfile({
        displayName: user.displayName,
        phoneNumber: user.phoneNumber,
    })

    var storageRef = firebase.storage().ref().child(createdUser.uid);
    // await storageRef.put(user.photoFile[0]).then(function(snapshot) {
    //   console.log('Uploaded a blob or file!');
    // });

    var uploadTask = storageRef.put(user.photoFile[0]);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed', function(snapshot){
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) 
      {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
        default:
          console.log('continue....')
      }
    }, function(error) {
      // Handle unsuccessful uploads
    }, function() {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        console.log('File available at', downloadURL);
        createdUser.updateProfile({
          photoURL: downloadURL
      })
      });
    });


    // create a new profile in firestore
    let newUser = {
        displayName: user.displayName,
        createdAt: firestore.FieldValue.serverTimestamp(),
        //address: user.address,
        phoneNumber: user.phoneNumber,
    };


    
    await firestore.set(`users/${createdUser.uid}`, {...newUser});
    // window.location.href = "/";
>>>>>>> 0285a46e86185c49686832cbd36e24e2fd230f74
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
      firebase
        .firestore()
        .collection("users")
        .doc(currentUser.uid)
        .update({
          displayName: user.displayName
        })
        .then(function() {
          window.location.href = "/profile";
        })
        .catch(function(error) {
          console.log(error);
        });
    }

    // Check if user updates the phone number
    // if it does, update the info stored both in authentication
    // and firestore
    if (user.phoneNumber) {
      firebase
        .firestore()
        .collection("users")
        .doc(currentUser.uid)
        .update({
          phoneNumber: user.phoneNumber
        })
        .then(function() {
          window.location.href = "/profile";
        })
        .catch(function(error) {
          console.log(error);
        });
    }

    // Check if user updates the profile image
    // if it does, update the info stored both in authentication
    // and firestore
    if (user.photoFile) {
      // file uploaded from user will be named
      // after its userId
      var storageRef = firebase
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
                window.location.href = "/profile";
              })
              .catch(function(error) {
                console.log(error);
              });
          });
        }
      );
    }
  } catch (error) {
    console.log(error);
    throw new SubmissionError({
      _error: error.message
    });
  }
};
