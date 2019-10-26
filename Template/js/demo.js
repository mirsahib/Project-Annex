
var Student_2017={};
var Student_2016={};
var Student_2015={};

var department_name = ["Arts","Sociology","Education",
                      "Science","Business","Law", 
                      "Pharmacy","Agriculture","Engineering and Technical",
                       "Economics"];
var Department_2017={};
var Department_2016={};
var Department_2015={};

$(document).ready(function(){
  var select = document.getElementById("uniName");
  for(var i=0;i<uni_name.length;i++) {
      select.options[select.options.length] = new Option(uni_name[i],uni_name[i]);
  }

  setDefault();
})

function setDefault(){
  $('#uniName').val("Choose");
  $('#year').val("select");
}


function showData() {
  // body...
  //selecting text    var uName = $('#uniName :selected').text();
  var uName = $('#uniName').val();
  var year = $('#year').val();
  //load data
  var yearflag=0;
  if(year=='2017' || year=='2016' || year=='2015'){
    getStudentDataByYear(year);
    getDepartmentDataByYear(year);
    yearflag=1;
  }
  var index=10;

  for(var i=0;i<uni_name.length;i++){
    if(uName == uni_name[i]){//you should edit this
      index=i;
    }
  }
  if(index==10 || yearflag==0){
    alert("Choose University name or Select year");
  }else{
    showMaleVsFemale(index);
    showGradvsUnderGrad(index);
    showStudentByDepartment(index);
    index=10;
    yearflag=0;
  }
  
}
function getStudentDataByYear(year){
  var link = "http://localhost/public_html/Final_project/student_"+year+".php";
  $.ajax({
    url: link ,
    method:"GET",
    success:function (data) {
      for (var i = 0; i < data.length; i++) {
        Student_2017[i] = data[i];
      }
    }
  })//end ajax
}

function showMaleVsFemale(index){
  var color = generateColor(2);
  var male = Student_2017[index].student- Student_2017[index].female;
  var female_st = Student_2017[index].female;
    var data1 = {
    labels: ['Graduate','Undergraduate'],
    datasets: [{
      label:"",
      data:[male,female_st],
      backgroundColor:color,
      borderColor:[
        "#CDA776",
        "#989898",
      ]
    }]
  };//end data1
  //option
  var options = {
    responsive: true,
    title: {
      display: true,
      position: "top",
      text: "Male vs Female",
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
    }
  };//end option
  var ctx = $("#maleVsFemale");
  var chart = new Chart(ctx,{
    type:'bar',
    data:data1,
    options:options
  })
}

function showGradvsUnderGrad(index){
    var data1 = {
    labels: ['Graduate','Undergraduate'],
    datasets: [{
      label:"",
      data:[Student_2017[index].grad,Student_2017[index].undergrad],
      backgroundColor:[
        "#15c418",
        "#167c7b",
      ],
      borderColor:[
        "#CDA776",
        "#989898",
      ]
    }]
  };//end data1
  //option
  var options = {
    responsive: true,
    title: {
      display: true,
      position: "top",
      text: "Graduate Vs Undergraduate",
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
    }
  };//end option
  var ctx = $("#gradVsundergrad");
  var chart = new Chart(ctx,{
    type:'bar',
    data:data1,
    options:options
  })

}//end showGradvsUnderGrad

// department function start
function getDepartmentDataByYear(year){
  var link = "http://localhost/public_html/Final_project/department_"+year+".php";
  $.ajax({
    url: link ,
    method:"GET",
    success:function (data) {
      for (var i = 0; i < data.length; i++) {
        Department_2017[i] = data[i];
      }
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
  var chart = new Chart(ctx,{
    type:'pie',
    data:data1,
    options:options
  })
}
function getDepartmentWiseStudent(index){
  var dep_wise_data = [];
  if(Department_2017[index].Arts!=0){
    var data = {};
    data.name = 'Arts';
    data.value = Department_2017[index].Arts;
    dep_wise_data.push(data);
  }
  if(Department_2017[index].Sociology!=0){
    var data = {};
    data.name = 'Sociology';
    data.value = Department_2017[index].Sociology;
    dep_wise_data.push(data);
  }
  if(Department_2017[index].Education!=0){
    var data = {};
    data.name = 'Education';
    data.value = Department_2017[index].Education;
    dep_wise_data.push(data);
  }
  if(Department_2017[index].Science!=0){
    var data = {};
    data.name = 'Science';
    data.value = Department_2017[index].Science;
    dep_wise_data.push(data);
  }
  if(Department_2017[index].Business!=0){
    var data = {};
    data.name = 'Business';
    data.value = Department_2017[index].Business;
    dep_wise_data.push(data);
  }
  if(Department_2017[index].Law!=0){
    var data = {};
    data.name = 'Law';
    data.value = Department_2017[index].Law;
    dep_wise_data.push(data);
  }
  if(Department_2017[index].Pharmacy!=0){
    var data = {};
    data.name = 'Pharmacy';
    data.value = Department_2017[index].Pharmacy;
    dep_wise_data.push(data);
  }
  if(Department_2017[index].Agriculture!=0){
    var data = {};
    data.name = 'Agriculture';
    data.value = Department_2017[index].Agriculture;
    dep_wise_data.push(data);
  }
  if(Department_2017[index].Engineering_and_Technical!=0){
    var data = {};
    data.name = 'Engineering_and_Technical';
    data.value = Department_2017[index].Engineering_and_Technical;
    dep_wise_data.push(data);
  }
  if(Department_2017[index].Economics!=0){
    var data = {};
    data.name = 'Economics';
    data.value = Department_2017[index].Economics;
    dep_wise_data.push(data);
  }
  return dep_wise_data;
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
//department end 

// test branch
