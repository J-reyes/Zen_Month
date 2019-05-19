// import 'firebase/auth'
import firebase from 'firebase';
import firestore from 'firebase/firestore';

const settings = {};

const config = {
    apiKey: "AIzaSyAvtlMkqdRmBmQqwUM7kTGcyccNengMkZ8",
    authDomain: "zen-month.firebaseapp.com",
    databaseURL: "https://zen-month.firebaseio.com",
    projectId: "zen-month",
    storageBucket: "zen-month.appspot.com",
    messagingSenderId: "762767679819"
};

firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;