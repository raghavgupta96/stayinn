import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
apiKey: "AIzaSyDqKHxoNkSr-Vur7EOH1UYBwwfFnzG8sR0",
authDomain: "stay-inn-3b7f7.firebaseapp.com",
databaseURL: "https://stay-inn-3b7f7.firebaseio.com",
projectId: "stay-inn-3b7f7",
storageBucket: "stay-inn-3b7f7.appspot.com",
messagingSenderId: "857121485597"
}

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;