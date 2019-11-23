var data = JSON.parse(localStorage.getItem("admission"));
var dataLength = data.length;
var schoolName;
var majorName;
$(document).ready(function() {
  schoolName = getSchoolName();
  majorName = getMajorName();
  //populate school name
  for (var i = 0; i < schoolName.length; i++) {
    $("#schoolName").append(
      '<option value="' + schoolName[i] + '">' + schoolName[i] + "</option>"
    );
  }
  //populate major name
  for (var i = 0; i < majorName.length; i++) {
    $("#majorName").append(
      '<option value="' + majorName[i] + '">' + majorName[i] + "</option>"
    );
  }

  //year wise distribution event
  $("#yearSubmit").click(function() {
    var year = $("#yearSelect option:selected").text();
    var semester = $("#semesterSelect option:selected").text();

    if (year == "Select Year" || semester == "Select Semester") {
      alert("Please select a valid year or semester");
    } else {
      generateYearGraph(year, semester);
    }
  });

  //Semesterwise ditribution event
});
function getSchoolName() {
  var container = [];
  for (let i = 0; i < dataLength; i++) {
    if (data[i].Year == "2019") {
      container.push(data[i].School);
    }
  }
  container = container.filter((item, i, ar) => ar.indexOf(item) === i);
  return container;
}
function getMajorName() {
  var container = [];
  for (let i = 0; i < dataLength; i++) {
    if (data[i].Year == "2019") {
      container.push(data[i].Major);
    }
  }
  container = container.filter((item, i, ar) => ar.indexOf(item) === i);
  return container;
}

function generateYearGraph(year, semester) {
  //console.log("generate graph");
  var container = [];
  for (let i = 0; i < dataLength; i++) {
    Year = data[i].Year;
    Semester = data[i].Semester;
    Semester = Semester.split(" ");
    if (Year == year && Semester[0] == semester) {
      container.push(data[i]);
    }
  }
  var result = yearDistribution(container);
  showChart(result);
}
function yearDistribution(data) {
  var array = Array.from(Array(schoolName.length), () => 0);
  for (let i = 0; i < schoolName.length; i++) {
    for (let j = 0; j < data.length; j++) {
      if (schoolName[i] == data[j].School) {
        array[i] += data[j].Students;
      }
    }
  }
  return array;
}

function showChart(data) {
  //get the pie chart canvas
  var ctx1 = $("#yearChart");

  //pie chart data
  var data1 = {
    labels: schoolName,
    datasets: [
      {
        label: "Year Wise Student No",
        data: data,
        backgroundColor: [
          "#DEB887",
          "#A9A9A9",
          "#DC143C",
          "#F4A460",
          "#2E8B57"
        ],
        borderColor: ["#CDA776", "#989898", "#CB252B", "#E39371", "#1D7A46"],
        borderWidth: [1, 1, 1, 1, 1]
      }
    ]
  };
  //options
  var options = {
    responsive: true,
    title: {
      display: true,
      position: "top",
      text: "No of Student",
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
  };
  //create Chart class object
  var chart1 = new Chart(ctx1, {
    type: "bar",
    data: data1,
    options: options
  });
}
