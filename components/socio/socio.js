
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
document.getElementById("socioform").addEventListener("submit", addYearSocio);
document
  .getElementById("deletesocioform")
  .addEventListener("submit", deleteYearSocio);

function csvdownload(){
    let sociocsv = storageRef.child('socio_template.csv'); 
  sociocsv.getDownloadURL()
  .then((url) => {
    let csv = document.getElementById('csvtemplate');
    csv.setAttribute('href', url);
    console.log("success");
  })
  .catch((error) => {
   
    switch (error.code) {
      case 'storage/object-not-found':
       
        break;
      case 'storage/unauthorized':
       
        break;
      case 'storage/canceled':
      
        break;


      case 'storage/unknown':
      
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

function addYearSocio(e) {
  e.preventDefault();
  let year = document.getElementById("socioyear").value;
  jsonFile.map((obj) => {
    docRef = db
      .collection("wards").doc(obj["DocId"])
      .collection("data").doc("social_demo")
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
  

  
}


function csvJSON(csv){

  var lines=csv.split("\n");

  var result = [];

  
  var headers=lines[0].split(",");
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

function deleteYearSocio(e) {
    e.preventDefault();
    let year = document.getElementById("deletesocioyear").value;
    console.log(warddoc);
    let deletedocref;
    Object.keys(warddoc).map((key) => {
      deletedocref = db
        .collection("wards")
        .doc(warddoc[key]["DocId"])
        .collection("data")
        .doc("social_demo")
        .collection("year")
        .doc(year);
      
  
      deletedocref
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        })
        .catch((error) => {
          console.log(error);
        });
    });
    
  }
  


