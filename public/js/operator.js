$(document).ready(function() {
  if (localStorage.length == 0) {
    $.ajax({
      type: "GET",
      //data: { get_param: "value" },
      url: "/operator/data",
      dataType: "json", // <-- add this
      success: function(data) {
        localStorage.setItem("admission", JSON.stringify(data));
        console.log("database stored in local storage");
      },
      error: function(data) {
        //console.log("error");
        console.log(data);
      }
    });
  } else {
    var items = JSON.parse(localStorage.getItem("admission"));
    var table = document.getElementById("table");
    generateTableHead(table, items);
    generateTable(table, items);
  }

  $("#submit").click(() => {
    var year = $("#inputYear").val();
    var semester = $("#inputSemester option:selected").text();
    var school = $("#inputSchool option:selected").text();
    var department = $("#inputDepartment option:selected").text();
    var student = $("#inputStudent").val();

    $.ajax({
      method: "POST",
      data: {
        year: year,
        semester: semester,
        school: school,
        department: department,
        student: student
      },
      url: "/operator/add",
      datatype: "json"
    })
      .done(res => {
        console.log(res);
      })
      .fail(res => {
        console.log(res);
      });
  });
});

function generateTableHead(table, data) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  key = Object.keys(data[0]);
  key.shift();
  for (var i = 0; i < key.length; i++) {
    let th = document.createElement("th");
    let text = document.createTextNode(key[i]);
    th.appendChild(text);
    row.appendChild(th);
  }
}
function generateTable(table, data) {
  len = data.length;
  for (let i = len - 1; i > len - 21; i--) {
    let element = data[i];
    let key = Object.keys(element);
    key.shift();
    let row = table.insertRow();
    for (let j = 0; j < key.length; j++) {
      let cell = row.insertCell();
      let text = document.createTextNode(element[key[j]]);
      cell.appendChild(text);
    }
  }
}
//test branch
