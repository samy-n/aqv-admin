let warddoc ;
let apiUrl = "../../ward_doc_id.json"

async function getJson(url) {
    let response = await fetch(url);
    let data = await response.json()

    return data;
}
async function main() {
   
    warddoc = await getJson(apiUrl)
    //console.log(warddoc);
}
main();

//document.getElementById('aqv-update').addEventListener('submit',updateAQV);
document.getElementById("addaqvparamform").addEventListener("submit", addAQVParam);
document
  .getElementById("deleteaqvparamform")
  .addEventListener("submit", deleteAQVParam);

function csvdownload(){
    let layercsv = storageRef.child('aqv_new_parameter_template.csv'); 
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

function addAQVParam(e) {
  e.preventDefault();
  // Object.keys(warddoc).map((ward) => {
  //   var docRef = db
  //     .collection("wards")
  //     .doc(warddoc[ward]["DocId"])
  //     .collection("data")
  //     .doc("air_quality");
  //   docRef.update({"new": 0}).then(() => {
  //     console.log("update document Ward " + ward);
  //   });
  // });
  jsonFile.map((obj) => {
    let docRef = db
      .collection("wards").doc(obj["DocId"])
      .collection("data").doc("air_quality");
    delete obj["DocId"];
    delete obj["ward"];
    Object.keys(obj).map((key) => {
      obj[key] = +obj[key];
    })
    // console.log(obj);
    docRef.update(obj).then(() => {
      console.log("updated");
    }).catch((e) => {
      console.log(e);
    });
  });
}


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

      for(var j=0;j<headers.length;j++){
          obj[headers[j]] = currentline[j];
      }

      result.push(obj);

  }

  return result; //JSON
}

function deleteAQVParam(e) {
  e.preventDefault();
  let paramName = document.getElementById("deleteparam").value;
  console.log(paramName);
  Object.keys(warddoc).map((key) => {
    var docRef = db
      .collection("wards")
      .doc(warddoc[key]["DocId"])
      .collection("data")
      .doc("air_quality");
  
    docRef.update({
      [paramName]: firebase.firestore.FieldValue.delete()
    }).then(() => {
      console.log("updated Ward: " + key);
    });
  });
}


function updateAQV(e){
    e.preventDefault();
    var ward=document.getElementById('ward').value;
    var AQI=getInputVal('AQI');
    var NO2=getInputVal('NO2');
    var O3=getInputVal('O3');
    var PM25=getInputVal('PM2.5');
    var PM10=getInputVal('PM10');
    var O3=getInputVal('O3');
    var SO2=getInputVal('SO2');
    //console.log(warddoc[ward]);
   wards.doc(`${warddoc[ward]["DocId"]}`+'/data/air_quality').update({
        AQI: AQI,
        NO2:NO2,
        O3:O3,
        PM10:PM10,
        PM25:PM25,
        SO2:SO2

    });
}



function getInputVal(id){
    return Number(document.getElementById(id).value);
  }
/*Object.keys(warddoc).map((key)=>{
      let docRef=db.collection("wards").doc(warddoc[key]['DocId']).collection('data').doc('air_quality');
      docRef.update({'ward':key});
    });*/