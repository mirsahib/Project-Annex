// var ctx = $("#SchoolChart");
// var chart = new Chart(ctx, {});

$("#semSubmit").click(function() {
  var strYear = $("#strYear_sem option:selected").text();
  var endYear = $("#endYear_sem option:selected").text();
  strYear = Number(strYear);
  endYear = Number(endYear);
  console.log(strYear + " " + endYear);
  var data = { str: strYear, end: endYear };
  $.ajax({
    type: "GET",
    data: data,
    url: "/admin/semester",
    dataType: "json", // <-- add this
    success: function(data) {
      console.log(data);
      processSemData(strYear, endYear, data);
      //localStorage.setItem("semester", JSON.stringify(data));
    },
    error: function(data) {
      //console.log("error");
      console.log(data);
    }
  });
});

$("#schoolSubmit").click(function() {
  var strYear = $("#strYear_school option:selected").text();
  var endYear = $("#endYear_school option:selected").text();
  strYear = Number(strYear);
  endYear = Number(endYear);
  console.log(strYear + " " + endYear);
  var data = { str: strYear, end: endYear };
  $.ajax({
    type: "GET",
    data: data,
    url: "/admin/school",
    dataType: "json", // <-- add this
    success: function(data) {
      console.log(data);
      processSchoolData(strYear, endYear, data);
      //localStorage.setItem("school", JSON.stringify(data));
    },
    error: function(data) {
      //console.log("error");
      console.log(data);
    }
  });
  //processSchoolData(strYear, endYear);
});

$("#majorSubmit").click(function() {
  let strYear = $("#strYear_major option:selected").text();
  let endYear = $("#endYear_major option:selected").text();
  let school = $("#slt_school option:selected").text();
  strYear = Number(strYear);
  endYear = Number(endYear);
  console.log(strYear + " " + endYear + " " + school);
  let data = { str: strYear, end: endYear, school: school };
  $.ajax({
    type: "GET",
    data: data,
    url: "/admin/major",
    dataType: "json", // <-- add this
    success: function(data) {
      console.log(data);
      processMajorData(strYear, endYear, data);
    },
    error: function(data) {
      //console.log("error");
      console.log(data);
    }
  });
});

function processSemData(strYear, endYear, data) {
  var arr = data.message;
  var semester = {
    Autumn: [],
    Spring: [],
    Summer: []
  };
  var yearList = [];
  for (let i = endYear; i >= strYear; i--) {
    yearList.push(i);
  }

  for (let i = 0; i < arr.length; i = i + 2) {
    let total = arr[i].total + arr[i + 1].total;
    let sem = arr[i]._id.Semester.split(" ")[0];
    semester[sem].push(total);
  }
  var graphData = [];
  const semList = Object.keys(semester);
  for (let i = 0; i < 3; i++) {
    let color =
      "#" +
      Math.random()
        .toString(16)
        .substr(-6);

    container = {
      label: semList[i],
      backgroundColor: color,
      borderColor: color,
      borderWidth: 1,
      data: semester[semList[i]]
    };
    graphData.push(container);
  }
  showGraph(yearList, graphData, "Semester Wise Chart", "#yearChart");
}

function processSchoolData(strYear, endYear, data) {
  data = data.message;
  //school name
  let schoolList = [];
  data.forEach(element => {
    if (schoolList.indexOf(element._id.School) == -1) {
      schoolList.push(element._id.School);
    }
  });
  let yearList = [];
  for (let i = endYear; i >= strYear; i--) {
    yearList.push(i);
  }
  let dataset = {};
  for (let i = 0; i < schoolList.length; i++) {
    dataset[schoolList[i]] = [];
  }
  data.forEach(element => {
    let total = element.total;
    let school = element._id.School;
    dataset[school].push(total);
  });
  let len = schoolList.length;
  let graphData = [];

  for (let i = 0; i < len; i++) {
    let color =
      "#" +
      Math.random()
        .toString(16)
        .substr(-6);

    container = {
      label: schoolList[i],
      backgroundColor: color,
      borderColor: color,
      borderWidth: 1,
      data: dataset[schoolList[i]]
    };
    graphData.push(container);
  }
  showGraph(yearList, graphData, "School Wise Chart", "#SchoolChart");
}

function processMajorData(strYear, endYear, data) {
  data = data.message;
  //major list
  let majorList = [];
  data.forEach(element => {
    if (majorList.indexOf(element._id.School) == -1) {
      majorList.push(element._id.Major);
    }
  });
  let yearList = [];
  for (let i = endYear; i >= strYear; i--) {
    yearList.push(i);
  }

  let dataset = {};
  for (let i = 0; i < majorList.length; i++) {
    dataset[majorList[i]] = [];
  }

  data.forEach(element => {
    let total = element.total;
    let major = element._id.Major;
    dataset[major].push(total);
  });
  let len = majorList.length;
  let graphData = [];

  for (let i = 0; i < len; i++) {
    let color =
      "#" +
      Math.random()
        .toString(16)
        .substr(-6);

    container = {
      label: majorList[i],
      backgroundColor: color,
      borderColor: color,
      borderWidth: 1,
      data: dataset[majorList[i]]
    };
    graphData.push(container);
  }
  showGraph(yearList, graphData, "Major Wise Chart", "#majorChart");
}

function showGraph(year, data, label, graphID) {
  var ctx1 = $(graphID);

  var barChartData = {
    labels: year,
    datasets: data
  };

  var options = {
    responsive: true,
    legend: {
      position: "top"
    },
    title: {
      display: true,
      text: label
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };
  // if (chart) {
  //   chart.destroy();
  // }
  chart = new Chart(ctx1, {
    type: "bar",
    data: barChartData,
    options: options
  });
}
