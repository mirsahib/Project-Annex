

var uni_name = [];
var dataYear = ['2017','2016','2015'];
var Student = {};
var Department = {};
var Faculty = {};
var Expense = {};

$(document).ready(function(){
  getUniName();//populating the university name combobox
  setYear();// populating the year combobox
  setDefault();
})
function showData(){
  var uName = $('#uniName').val();
  var year = $('#year').val();
  if(dataYear.includes(year) && uni_name.includes(uName)){
    var index = uni_name.indexOf(uName);
    getDepartmentDataByYear(year,index);// loading department variable
    //showStudentByDepartment(index);
    getFacultyDataByYear(year,index);
    //showFacultyData(index);
    getExpenseDataByYear(year,index);
  }else{
    alert("Choose correct University name and year");
  }
}

function setDefault(){
  $('#uniName').val("Choose");
  $('#year').val("select");
}
function getUniName(){
  var link = "http://localhost/public_html/Final_project/university_name.php";
  $.ajax({
    url: link ,
    method:"GET",
    success:function (data) {
      for (var i = 0; i < data.length; i++) {
        var temp = data[i];
        uni_name[i] = temp;
      }
      setUniName();
    }
  })//end ajax
}
function setUniName() {
  // body...
  var select = document.getElementById("uniName");
  var len = Object.keys(uni_name).length
  for(var i=0;i<len;i++) {
      select.options[select.options.length] = new Option(uni_name[i],uni_name[i]);
  }
}
function setYear() {
  // body...
  var select = document.getElementById("year");
  for(var i=0;i<dataYear.length;i++) {
      select.options[select.options.length] = new Option(dataYear[i],dataYear[i]);
  }
}
function getDepartmentDataByYear(year,index){
  var link = "http://localhost/public_html/Final_project/department_"+year+".php";
  $.ajax({
    url: link ,
    method:"GET",
    success:function (data) {
      var len = Object.keys(Department).length;
      if(len!=0){
        for (var key in Department) {
          delete Department[key];
        }
      }
      for (var i = 0; i < data.length; i++) {
        Department[i] = data[i];
      }
      showStudentByDepartment(index);
    }
  })//end ajax
}
function showStudentByDepartment(index){  
  var dep_wise_data=getDepartmentWiseStudent(index);
  var len = Object.keys(dep_wise_data).length;
  var color = generateColor(len);
  var department_name = getDepartmentName(dep_wise_data);
  var student_data = getStudentData(dep_wise_data);
  var normalise_data = getNormalise(student_data);
  var data1 = {
    labels: department_name,
    datasets: [{
      label:"",
      data: normalise_data,// insert data
      backgroundColor:color,
      borderColor:color,
    }]
  };//end data1
  //option
  var options = {
    responsive: true,
    title: {
      display: true,
      position: "top",
      text: "School wise Student %",
      fontSize: 18,
      fontColor: "#111"
    },
    legend: {
      display: true,
      position: "bottom",
      labels: {
        fontColor: "#333",
        fontSize: 16
      }
    },
  };//end option
  var ctx = $("#studentByDepartment");
  var chart= new Chart(ctx,{
    type:'pie',
    data:data1,
    options:options
  })
}
function getDepartmentWiseStudent(index){
  var dep_wise_data = [];
  if(Department[index].Arts!=0){
    var data = {};
    data.name = 'Arts';
    data.value = Department[index].Arts;
    dep_wise_data.push(data);
  }
  if(Department[index].Sociology!=0){
    var data = {};
    data.name = 'Sociology';
    data.value = Department[index].Sociology;
    dep_wise_data.push(data);
  }
  if(Department[index].Education!=0){
    var data = {};
    data.name = 'Education';
    data.value = Department[index].Education;
    dep_wise_data.push(data);
  }
  if(Department[index].Science!=0){
    var data = {};
    data.name = 'Science';
    data.value = Department[index].Science;
    dep_wise_data.push(data);
  }
  if(Department[index].Business!=0){
    var data = {};
    data.name = 'Business';
    data.value = Department[index].Business;
    dep_wise_data.push(data);
  }
  if(Department[index].Law!=0){
    var data = {};
    data.name = 'Law';
    data.value = Department[index].Law;
    dep_wise_data.push(data);
  }
  if(Department[index].Pharmacy!=0){
    var data = {};
    data.name = 'Pharmacy';
    data.value = Department[index].Pharmacy;
    dep_wise_data.push(data);
  }
  if(Department[index].Agriculture!=0){
    var data = {};
    data.name = 'Agriculture';
    data.value = Department[index].Agriculture;
    dep_wise_data.push(data);
  }
  if(Department[index].Engineering_and_Technical!=0){
    var data = {};
    data.name = 'Engineering_and_Technical';
    data.value = Department[index].Engineering_and_Technical;
    dep_wise_data.push(data);
  }
  if(Department[index].Economics!=0){
    var data = {};
    data.name = 'Economics';
    data.value = Department[index].Economics;
    dep_wise_data.push(data);
  }
  return dep_wise_data;
}
function generateColor(len){
  color = [];
  for(var i=0;i<len;i++){
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    color[i] = "rgb(" + r + "," + g + "," + b + ")";
  }

  return color;
}
function getDepartmentName(data){
  var len = Object.keys(data).length;
  var list = [];
  for(var i=0;i<len;i++){
    list[i] = data[i].name;
  }
  return list;
}
function getStudentData(data){
  var len = Object.keys(data).length;
  var list = [];
  for(var i=0;i<len;i++){
    list[i] = data[i].value;
  }
  return list;
}
function getNormalise(data){
  var total_student=0;
  var new_data = [];
  for(var i=0;i<data.length;i++){
    total_student+=parseInt(data[i],10);
  }
  for (var i = 0; i < data.length; i++) {
    var n = parseInt(data[i],10);
    var d = (n/total_student)*100;
    new_data[i] = d.toFixed(2);
  }
  return new_data;
}
//faculty start

function getFacultyDataByYear(year,index){
  var link = "http://localhost/public_html/Final_project/faculty_"+year+".php";
  $.ajax({
    url: link ,
    method:"GET",
    success:function (data) {
      var len = Object.keys(Faculty).length;
      if(len!=0){
        for (var key in Faculty) {
          delete Faculty[key];
        }
      }
      for (var i = 0; i < data.length; i++) {
        Faculty[i] = data[i];
      }
      showFacultyData(index)
    }
  })//end ajax
}
function showFacultyData(index) {
  // body...
  var male = parseInt(Faculty[index].teacher) - parseInt(Faculty[index].female_teacher);
  var female =parseInt(Faculty[index].female_teacher);
  var adj = parseInt(Faculty[index].adjunct);
  var prof= parseInt(Faculty[index].professor);
  var ac_prof= parseInt(Faculty[index].assoc_prof);
  var at_prof= parseInt(Faculty[index].assist_prof);
  var lt =parseInt(Faculty[index].lecturer); 
  var datapoint = [male,female,adj,prof,ac_prof,at_prof,lt];
  var color = generateColor(7);

  var data1 = {
    labels: ['Male','Female','Adjunct','Professor','Associate Professor',
              'Assistant Professor','Lecture'],
    datasets: [{
      label:"",
      data: datapoint,// insert data
      backgroundColor:color,
      borderColor:color,
    }]
  };//end data1
  //option
  var options = {
    responsive: true,
    title: {
      display: true,
      position: "top",
      text: "Faculty Distribution",
      fontSize: 18,
      fontColor: "#111"
    },
    legend: {
      display: true,
      position: "bottom",
      labels: {
        fontColor: "#333",
        fontSize: 16
      }
    },
  };//end option
  var ctx = $("#facultyByYear");

  var chart= new Chart(ctx,{
    type:'pie',
    data:data1,
    options:options
  })

}
//expense start

function getExpenseDataByYear(year,index){
    var link = "http://localhost/public_html/Final_project/expense_"+year+".php";
  $.ajax({
    url: link ,
    method:"GET",
    success:function (data) {
      var len = Object.keys(Expense).length;
      if(len!=0){
        for (var key in Expense) {
          delete Expense[key];
        }
      }
      for (var i = 0; i < data.length; i++) {
        Expense[i] = data[i];
      }
      showExpenseData(index);
    }
  })//end ajax
}
function showExpenseData(index){
  total_expense = getTotatExpense(index);
  normalise_data = getNormaliseExpense(index);
}
function getTotatExpense(index){
  var total = parseFloat(Expense[index].Exp_per_student)+
              parseFloat(Expense[index].Exp_Education)+
              parseFloat(Expense[index].Exp_Research)+
              parseFloat(Expense[index].Exp_Salary)+
              parseFloat(Expense[index].Exp_Scholarship)+
              parseFloat(Expense[index].Exp_Transport)+
              parseFloat(Expense[index].Exp_Electricity)+
              parseFloat(Expense[index].Exp_Infrastructure)+
              parseFloat(Expense[index].Exp_Medical)+
              parseFloat(Expense[index].Exp_Misc);
  return total;
}
function getNormaliseExpense(index){
  var data =[];
}