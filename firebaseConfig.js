var firebaseConfig = {
    apiKey: "AIzaSyDmoUrjYrMEuIeqkp5WjG-slLHKwRkh7O0",
    authDomain: "deepblue-aqv.firebaseapp.com",
    projectId: "deepblue-aqv",
    databaseURL: "https://deepblue-aqv.firebaseio.com",
    storageBucket: "deepblue-aqv.appspot.com",
    messagingSenderId: "935017759812",
    appId: "1:935017759812:web:c758e09ce2ad5b7ef26811",
    measurementId: "G-3KVGE9ZKM8",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const storageRef = firebase.storage().ref();