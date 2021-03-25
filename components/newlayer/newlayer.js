
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

document.getElementById("layerform").addEventListener("submit", addYearLayer);
document
  .getElementById("deletelayerform")
  .addEventListener("submit", deleteYearLayer);

function csvdownload(){
  let layercsv = storageRef.child('new_layer_template.csv'); 
  layercsv.getDownloadURL()
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

function addYearLayer(e) {
  e.preventDefault();
  var layerName = document.getElementById("newlayer").value;
  console.log(layerName);
  jsonFile.map((obj) => {
    docRef = db
      .collection("wards").doc(obj["DocId"])
      .collection("data").doc(layerName);
    delete obj["DocId"];
    Object.keys(obj).map((key) => {
      if (key === "ward")
        console.log("Ward:" + obj[key]);
      else 
        obj[key] = +obj[key];
    });
    docRef.set(obj);
  });
}
// "H/E": "2q0Z3Lumg7zlyEIvj9kK",

function csvJSON(csv){

  var lines=csv.split("\n");

  var result = [];

  // NOTE: If your columns contain commas in their values, you'll need
  // to deal with those before doing the next step 
  // (you might convert them to &&& or something, then covert them back later)
  var headers = lines[0].split(",");
  headers[headers.length - 1] = headers[headers.length - 1].trim();
  
  for(var i=1;i<lines.length;i++){

      var obj = {};
      var currentline=lines[i].split(",");
      headers[headers.length - 1] = headers[headers.length - 1].trim();

      for(var j=0;j<headers.length;j++){
          obj[headers[j]] = currentline[j];
      }

      result.push(obj);

  }

  return result; //JSON
}

function deleteYearLayer(e) {
  e.preventDefault();
  let layer = document.getElementById("deletelayername").value;
  console.log(layer);
  Object.keys(warddoc).map((key) => {
    var deleteDocRef = db
      .collection("wards")
      .doc(warddoc[key]["DocId"])
      .collection("data")
      .doc(layer);

    deleteDocRef
      .delete()
      .then(() => {
        console.log("Ward: " + key + " " + "Document successfully deleted!");
      })
      .catch((error) => {
        console.log(error);
      });
  

  });
}
