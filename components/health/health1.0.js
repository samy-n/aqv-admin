/*
$(document).ready(function(){
    $.getJSON("warddoc.json", function(data){
        console.log('successful') ;// Prints: 14
    }).fail(function(){
        console.log("An error has occurred.");
    });
});
import * as data from '../../warddoc.json';
console.log(data);*/
let warddoc;
let apiUrl = "../../warddoc.json";
async function getJson(url) {
  let response = await fetch(url);
  let data = await response.json();

  return data;
}
async function main() {
  warddoc = await getJson(apiUrl);
}

main();
let wards = db.collection("wards");
document.getElementById("healthform").addEventListener("submit", addYearHealth);
document
  .getElementById("deletehealthform")
  .addEventListener("submit", deleteYearHealth);


function addYearHealth(e) {
  e.preventDefault();  
  var year = document.getElementById("healthyear").value;
  var ward = document.getElementById("ward").value;
  var diabetes = getInputVal("diabetes");
  var dengue = getInputVal("dengue");
  var diarrhoea = getInputVal("diarrhoea");
  var hypertension = getInputVal("hypertension");
  var malaria = getInputVal("malaria");
  var tuberculosis = getInputVal("tuberculosis");
  console.log(year, ward, diabetes);
  var healthref = db
    .collection("wards")
    .doc(`${warddoc[ward]}` + "/data/health/")
    .collection("year/");
  healthref.doc(`${year}`).set({
    dengue: dengue,
    diabetes: diabetes,
    diarrhoea: diarrhoea,
    hypertension: hypertension,
    malaria: malaria,
    tuberculosis: tuberculosis,
    ward: ward,
  });
  h4 = document.createElement("h4");
  h4.innerHTML =
    year + " health data for Ward " + ward + " added successfully!";
  var a = document.createElement("a");
  a.href = "./health.html";
  a.innerText = "Fill form for next ward";
  document.getElementById("addyear").appendChild(h4);
  document.getElementById("addyear").appendChild(a);
}
// "H/E": "2q0Z3Lumg7zlyEIvj9kK",

function deleteYearHealth(e) {
  e.preventDefault();
  let year = document.getElementById("deletehealthyear").value;
  console.log(warddoc);
  let deletedocref;
  Object.keys(warddoc).map((key) => {
    deletedocref = db
      .collection("wards")
      .doc(warddoc[key])
      .collection("data")
      .doc("health")
      .collection("year")
      .doc(year);
    // console.log(deletedocref);
    // deletedocref.get().then(function (documentSnapshot) {
    //   // if (documentSnapshot.exists) {
    //   //     deletedocref.delete().then(() => {
    //   //         console.log("Document successfully deleted!");
    //   //     }).catch((error) => {
    //   //         console.error("Error removing document: ", error);
    //   //     });
    //   //   }
    //   console.log(documentSnapshot.da);

    deletedocref
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.log(error);
      });
  });
  //var deletedocref=db.collection("wards/9EQbcqNFCckM6k6m0T05/data/health/year").doc("2016");
  //var deletedocref=deletedocref=db.collection("wards").doc(warddoc["B"]).collection("data").doc("health").collection("year").doc(year);
  /*
     const snapshot = await firebase.firestore()
        .collection('users')
        .doc(authenticatedUsersUid)
        .collection('calendar_events')
        .where("client_id", "==", clientID)
        .get();
    
    await Promise.all(snapshot.docs.map(doc => doc.ref.delete()));
    for (let key of Object.keys(warddoc)) {
        const snapshot = await firebase.firestore()
        .collection('users')
        .doc(authenticatedUsersUid)
        .collection('calendar_events')
        .where("client_id", "==", clientID)
        .get();
    }

    for (let key of Object.keys(warddoc)) {
        //console.log(key, warddoc[key]);
        deletedocref=db.collection("wards").doc(warddoc[key]).collection("data").doc("health").collection("year").doc(year);            
        deletedocref.get().then(function(documentSnapshot) {
            if (documentSnapshot.exists) {
                deletedocref.delete().then(() => {
                    console.log("Document successfully deleted!");
                }).catch((error) => {
                    console.error("Error removing document: ", error);
                });
              } 
          });
          
           
    };

    
    Object.keys(warddoc).forEach(function(key) {
        deletedocref=db.collection("wards").doc(warddoc[key]).collection("data").doc("health").collection("year").doc(year);
        setTimeout(() => { console.log("World!"); }, 2000);
        deletedocref.get().then(function(documentSnapshot) {
            if (documentSnapshot.exists) {
                deletedocref.delete().then(() => {
                    console.log("Document successfully deleted!");
                }).catch((error) => {
                    console.error("Error removing document: ", error);
                });
              } 
          });
          setTimeout(() => { console.log("World!"); }, 2000);
    });*/
}

function getInputVal(id) {
  return Number(document.getElementById(id).value);
}
/*
db.collection('wards').get().then(querySnapshot => {
    querySnapshot.forEach(doc => {console.log(doc.data());
    })
})*/
