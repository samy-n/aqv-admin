let warddoc ;
let apiUrl = "../../warddoc.json"

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
let wards=db.collection('wards');

document.getElementById('socioform').addEventListener('submit',addYearSocio);


function addYearSocio(e){
    e.preventDefault();
    var year=document.getElementById('socioyear').value;
    var ward=document.getElementById('ward').value;
    var literacy=getInputVal('literacy');
    var literacy_male=getInputVal('literacy_male');
    var literacy_female=getInputVal('literacy_female');
    var population=getInputVal('population');
    var scheduled_caste=getInputVal('scheduled_caste');
    var sex_ratio=getInputVal('sex_ratio');
    var work_participation_male=getInputVal('work_participation_male');
    var work_participation_female=getInputVal('work_participation_female');

    console.log(year,ward,literacy);
    var socioref=db.collection('wards').doc(`${warddoc[ward]}`+'/data/social_demo/').collection('year/');
    socioref.doc(`${year}`).set(
        {
            literacy_male:literacy_male,
            literacy:literacy,
            literacy_female:literacy_female,
            population:population,
            scheduled_caste:scheduled_caste,
            sex_ratio:sex_ratio,
            ward:ward,
            work_participation_male:work_participation_male,
            work_participation_female:work_participation_female
        }
    )
    h4=document.createElement("h4");
    h4.innerHTML=year+" socio data for Ward "+ward+" added successfully!";
    var a = document.createElement('a');
    a.href = './socio.html';
    a.innerText = 'Fill form for next ward';
    document.getElementById('addyear').appendChild(h4);
    document.getElementById('addyear').appendChild(a);
}


function getInputVal(id){
    return Number(document.getElementById(id).value);
  }
/*
db.collection('wards').get().then(querySnapshot => {
    querySnapshot.forEach(doc => {console.log(doc.data());
    })
})*/