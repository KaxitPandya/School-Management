/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

function SaveRecordNo2LS(jsonObj){
    var lcData = JSON.parse(jsonObj.data);
    localStorage.setItem("recno",lcData.rec_no);
}

function getEmpIdAsJsonObj(){
    var rollno = $("#rollno").val();
    var jsonStr = {
        //
        id: rollno
    };
    return JSON.stringify(jsonStr);
}

function fillData(jsonObj){
    SaveRecordNo2LS(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    $("#studentName").val(record.studentName);
    $("#clas").val(record.clas);
    $("#birthdate").val(record.birthdate);
    $("#address").val(record.address);
    $("#enrdate").val(record.enrdate);

}


function validateData(){
    var rollno,studentName,clas,birthdate,address,enrdate ;
    rollno =  $("#rollno").val();
    studentName =  $("#studentName").val();
    clas =  $("#clas").val();
    birthdate =  $("#birthdate").val();
    address =  $("#address").val();
    enrdate =  $("#enrdate").val();

    if(rollno===""){
        alert("Roll No. is missing");
        $("#rollno").focus();
        return "";
    }
    if(studentName===""){
        alert("Student Name is missing");
        $("#studentName").focus();
        return "";
    }
    if(clas===""){
        alert("Class is missing");
        $("#clas").focus();
        return "";
    }
    if(birthdate===""){
        alert("Birth Date is missing");
        $("#birthdate").focus();
        return "";
    }
    if(address===""){
        alert("Address is missing");
        $("#address").focus();
        return "";
    }
    if(enrdate===""){
        alert("Enrollment Date is missing");
        $("#enrdate").focus();
        return "";
    }
    
    var jsonStrObj ={
        rollno:rollno,
        studentName:studentName,
        clas:clas,
        birthdate:birthdate,
        address:address,
        enrdate:enrdate
    };
    return JSON.stringify(jsonStrObj);
}

function getRoll(){
    var empIdJsonObj = getEmpIdAsJsonObj();
    var getRequest = createGET_BY_KEYRequest("90938343|-31949273617594860|90952248","SCHOOL-DB", "STUDENT-TABLE",empIdJsonObj );
             
    jQuery.ajaxSetup({async: false});
    var resultJsonObj = executeCommandAtGivenBaseUrl(getRequest,"http://api.login2explore.com:5577","/api/irl");
    jQuery.ajaxSetup({async: true});
    
    if(resultJsonObj.status === 400){
        $("#save").prop("disableed", false);
        $("#reset").prop("disableed", false);
        $("#rollno").focus();
    }
    else if(resultJsonObj.status === 200){
        $("#rollno").prop("disableed", true);
        fillData(resultJsonObj);
        $("#update").prop("disableed", false);
        $("#reset").prop("disableed", false);
        $("#rollno").focus();
    }
}

function resetForm() {
    $("#rollno").val("");
    $("#studentName").val("");
    $("#clas").val("");
    $("#birthdate").val("");
    $("#address").val("");
    $("#enrdate").val("");
    $("#rollno").prop("disableed", false);
    $("#save").prop("disableed", true);
    $("#update").prop("disableed", true);
    $("#reset").prop("disableed", true);
    $("#rollno").focus();
}

function saveData() {
    //
    var jsonStrObj = validateData();
    if (jsonStrObj === "") {
        return "";
    }
    
    // edit
    var putReqStr = createPUTRequest("90938343|-31949273617594860|90952248",
            jsonStrObj, "SCHOOL-DB", "STUDENT-TABLE");
            
//  alert(putReqStr);
    jQuery.ajaxSetup({async: false});
    // edit
    var resultJsonObj = executeCommandAtGivenBaseUrl(putReqStr, "http://api.login2explore.com:5577", "/api/iml");
    alert(JSON.stringify(resultJsonObj));
    jQuery.ajaxSetup({async: true});
    resetForm();
    $("#rollno").focus();
}

function updateData(){
    $("#update").prop("disableed", true);
    jsonChg = validateData();
    var updateRequest = createUPDATERecordRequest("90938343|-31949273617594860|90952248",
            jsonChg, "SCHOOL-DB", "STUDENT-TABLE", localStorage.getItem("recno"));
            
    jQuery.ajaxSetup({async: false});
    var resultJsonObj = executeCommandAtGivenBaseUrl(updateRequest, "http://api.login2explore.com:5577", "/api/iml");
    jQuery.ajaxSetup({async: true});
    console.log(resultJsonObj);
    resetForm();
    $("#rollno").focus();
}
