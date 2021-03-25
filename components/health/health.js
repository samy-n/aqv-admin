
let warddoc;
let apiUrl = "../../ward_doc_id.json";

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

function csvdownload(){
    let healthcsv = storageRef.child('pop_health_template.csv');

 
  healthcsv.getDownloadURL()
  .then((url) => {
    let csv = document.getElementById('csvtemplate');
    csv.setAttribute('href', url);
    console.log("success");
  })
  .catch((error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/object-not-found':
        // File doesn't exist
        break;
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;

      // ...

      case 'storage/unknown':
        // Unknown error occurred, inspect the server response
        break;
    }
  });
}
let jsonFile;
var fileInput = document.getElementById("files");

readFile = function () {
    var reader = new FileReader();
  reader.onload = function () {
    jsonFile = csvJSON(reader.result);
    console.log(jsonFile);
    };
    reader.readAsBinaryString(fileInput.files[0]);
};
fileInput.addEventListener('change', readFile);

function addYearHealth(e) {
  e.preventDefault();
  let year = document.getElementById("healthyear").value;
  jsonFile.map((obj) => {
    docRef = db
      .collection("wards").doc(obj["DocId"])
      .collection("data").doc("health")
      .collection("year").doc(year);
    delete obj["DocId"];
    Object.keys(obj).map((key) => {
      if (key === "ward")
        console.log("Ward:" + obj[key]);
      else {
        obj[key] = +obj[key];
      }
    });
    docRef.set(obj);
  });
  
  // let thisRef = storageRef.child(year+'_health');
 
  // thisRef.put(file).then(function(snapshot) {
  //    alert("Health data file for "+year+" uploaded successfully");     
  //    console.log('Uploaded a blob or file!');
  // });
  
}
// "H/E": "2q0Z3Lumg7zlyEIvj9kK",

function csvJSON(csv){

  var lines=csv.split("\n");

  var result = [];

  // NOTE: If your columns contain commas in their values, you'll need
  // to deal with those before doing the next step 
  // (you might convert them to &&& or something, then covert them back later)
  var headers=lines[0].split(",");

  for(var i=1;i<lines.length;i++){

      var obj = {};
      var currentline=lines[i].split(",");

      for(var j=0;j<headers.length;j++){
          obj[headers[j]] = currentline[j];
      }

      result.push(obj);

  }

  return result; //JSON
}

function deleteYearHealth(e) {
  e.preventDefault();
  let year = document.getElementById("deletehealthyear").value;
  console.log(warddoc);
  let deletedocref;
  Object.keys(warddoc).map((key) => {
    deletedocref = db
      .collection("wards")
      .doc(warddoc[key]["DocId"])
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
  //let deletedocref=db.collection("wards/9EQbcqNFCckM6k6m0T05/data/health/year").doc("2016");
  //let deletedocref=deletedocref=db.collection("wards").doc(warddoc["B"]).collection("data").doc("health").collection("year").doc(year);
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
