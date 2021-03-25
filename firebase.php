<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/8.2.10/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="https://www.gstatic.com/firebasejs/8.2.10/firebase-analytics.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.2.10/firebase-database.js"></script>
<script>
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyDmoUrjYrMEuIeqkp5WjG-slLHKwRkh7O0",
    authDomain: "deepblue-aqv.firebaseapp.com",
    projectId: "deepblue-aqv",
    storageBucket: "deepblue-aqv.appspot.com",
    messagingSenderId: "935017759812",
    appId: "1:935017759812:web:c758e09ce2ad5b7ef26811",
    measurementId: "G-3KVGE9ZKM8"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  firebase.database().ref('wards');
</script>