// import 'firebase/auth'
import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyAvtlMkqdRmBmQqwUM7kTGcyccNengMkZ8",
    authDomain: "zen-month.firebaseapp.com",
    databaseURL: "https://zen-month.firebaseio.com",
    projectId: "zen-month",
    storageBucket: "zen-month.appspot.com",
    messagingSenderId: "762767679819"
  };
  firebase.initializeApp(config);

export default firebase;