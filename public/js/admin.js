var data = JSON.parse(localStorage.getItem("admission"));
var dataLength = data.length;
var schoolName;
//var majorName;
var span = {
  "Last 1 Year": [2019, 2018],
  "Last 2 Year": [2019, 2018, 2017],
  "Last 3 Year": [2019, 2018, 2017, 2018]
};
//initializing chart (global)
var majorChart;
var yearChart;
var schoolChart;
$(document).ready(function() {
  //load dataset
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
  }

  schoolName = getSchoolName();
  //majorName = getMajorName();
  //populate school name
  for (var i = 0; i < schoolName.length; i++) {
    $("#schoolName").append(
      '<option value="' + schoolName[i] + '">' + schoolName[i] + "</option>"
    );
    $("#majorName").append(
      '<option value="' + schoolName[i] + '">' + schoolName[i] + "</option>"
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

  //Schoolwise distribution event
  $("#schoolSubmit").click(function() {
    var school_name = $("#schoolName option:selected").text();
    var yearSpan = $("#yearSpan option:selected").text();

    if (school_name == "Select School Name" || yearSpan == "Select Year Span") {
      alert("Please select a valid year or semester");
    } else {
      generateSchoolGraph(span[yearSpan], school_name);
    }
  });
  //Majorwise distribution event
  $("#majorSubmit").click(function() {
    var major_name = $("#majorName option:selected").text();
    var majorYearSpan = $("#majorYearSpan option:selected").text();
    if (major_name == "Select School Name" || yearSpan == "Select Year Span") {
      alert("Please select a valid year or semester");
    } else {
      generateMajorGraph(span[majorYearSpan], major_name);
    }
  });
  //generate report event
  $("#generateReport").click(function() {
    // get size of report page
    var reportPageHeight = 2000;
    var reportPageWidth = window.innerWidth;

    // create a new canvas object that we will populate with all other canvas objects
    var pdfCanvas = $("<canvas />").attr({
      id: "canvaspdf",
      width: reportPageWidth,
      height: reportPageHeight
    });

    // keep track canvas position
    var pdfctx = $(pdfCanvas)[0].getContext("2d");
    var pdfctxX = 0;
    var pdfctxY = 0;
    var buffer = 100;

    // for each chart.js chart
    $("canvas").each(function(index) {
      // get the chart height/width
      var canvasHeight = $(this).innerHeight();
      var canvasWidth = $(this).innerWidth();
      // draw the chart into the new canvas
      pdfctx.drawImage($(this)[0], pdfctxX, pdfctxY, canvasWidth, canvasHeight);
      pdfctxY += canvasHeight;

      // our report page is in a grid pattern so replicate that in the new canvas
      //if (index % 2 === 1) {
      //  pdfctxX = 0;
      // pdfctxY += canvasHeight + buffer;
      //}
    });

    // create new pdf and add our new canvas as an image
    var pdf = new jsPDF("l", "pt", [reportPageWidth, reportPageHeight]);
    pdf.addImage($(pdfCanvas)[0], "PNG", reportPageWidth / 2, 0);

    var time = new Date();
    var date = time.getDate();
    var month = time.getMonth();
    var min = time.getMinutes();
    var hour = time.getHours();
    // download the pdf
    pdf.save(min + "_" + hour + "_" + date + "_" + month + ".pdf");
  });
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
//don't this function
function getMajorName() {
  var container = [];
  for (let i = 0; i < dataLength; i++) {
    if (data[i].Year == "2019") {
      container.push(data[i].Major);
    }
  }
  container = container.filter((item, i, ar) => ar.indexOf(item) === i);
  return container;
} //this function is irrelevant to the project

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
  showYearChart(result, schoolName, "pie", "% of Student"); //showChart(result,label,chartType,chartLegend)
}

function yearDistribution(data) {
  var array = Array.from(Array(schoolName.length), () => 0);
  var totalStudent = 0;
  for (let i = 0; i < schoolName.length; i++) {
    for (let j = 0; j < data.length; j++) {
      if (schoolName[i] == data[j].School) {
        array[i] += data[j].Students;
        totalStudent += data[j].Students;
      }
    }
  }
  for (var i = 0; i < schoolName.length; i++) {
    array[i] = ((array[i] / totalStudent) * 100).toFixed(2);
  }

  return array;
}
function generateSchoolGraph(yearList, name) {
  var container = [];
  for (let i = 0; i < yearList.length; i++) {
    var yearContainer = [];
    for (let j = 0; j < dataLength; j++) {
      if (data[j].Year == yearList[i] && data[j].School == name) {
        yearContainer.push(data[j]);
      }
    }
    container.push(yearContainer);
  }
  var result = semesterDistribution(container);
  showSchoolChart(yearList, result);
}

function semesterDistribution(yearList) {
  var yearSemDist = [];

  for (var i = 0; i < yearList.length; i++) {
    var semContainer = { Autumn: 0, Spring: 0, Summer: 0 };
    var totalStudent = 0;
    //year span
    for (var j = 0; j < yearList[i].length; j++) {
      //object in a year
      semesterName = yearList[i][j].Semester;
      semesterName = semesterName.split(" ");
      semesterName.pop();
      totalStudent += yearList[i][j].Students;
      if (semesterName == "Autumn") {
        semContainer["Autumn"] += yearList[i][j].Students;
      } else if (semesterName == "Spring") {
        semContainer["Spring"] += yearList[i][j].Students;
      } else {
        semContainer["Summer"] += yearList[i][j].Students;
      }
    }
    semContainer["Autumn"] = (
      (semContainer["Autumn"] / totalStudent) *
      100
    ).toFixed(2);
    semContainer["Spring"] = (
      (semContainer["Spring"] / totalStudent) *
      100
    ).toFixed(2);
    semContainer["Summer"] = (
      (semContainer["Summer"] / totalStudent) *
      100
    ).toFixed(2);
    yearSemDist.push(semContainer);
  }
  return yearSemDist;
}

function showYearChart(data, label, chartType, legend) {
  //get the chart canvas
  var ctx1 = $("#yearChart");
  //generate random color
  var colorList = [];
  for (let i = 0; i < data.length; i++) {
    colorList.push(
      "#" +
        Math.random()
          .toString(16)
          .substr(-6)
    );
  }

  //pie chart data
  var data1 = {
    labels: label,
    datasets: [
      {
        label: "Year Wise Student %",
        data: data,
        backgroundColor: colorList,
        borderColor: colorList,
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
      text: legend,
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
  yearChart = new Chart(ctx1, {
    type: chartType,
    data: data1,
    options: options
  });
}

function showSchoolChart(yearList, data) {
  var ctx1 = $("#SchoolChart");

  // catagorize data by semseter
  data = stripData(data);
  container = [];
  labelArr = ["Autumn", "Spring", "Summer"];
  for (var i = 0; i < data.length; i++) {
    color =
      "#" +
      Math.random()
        .toString(16)
        .substr(-6); //generate random color
    dataset = {};
    dataset.label = labelArr[i];
    dataset.data = data[i];
    dataset.backgroundColor = color;
    dataset.borderColor = color;
    dataset.borderWidth = [1, 1, 1, 1, 1];
    container.push(dataset);
  }

  //pie chart data
  var data1 = {
    labels: yearList,
    datasets: container
  };
  //options
  var options = {
    responsive: true,
    title: {
      display: true,
      position: "top",
      text: "% of Student",
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
  schoolChart = new Chart(ctx1, {
    type: "bar",
    data: data1,
    options: options
  });
}

function stripData(data) {
  var autumn = [];
  var spring = [];
  var summer = [];
  var container = [];
  for (let i = 0; i < data.length; i++) {
    value = Object.values(data[i]);
    autumn.push(value[0]);
    spring.push(value[1]);
    summer.push(value[2]);
  }
  container.push(autumn);
  container.push(spring);
  container.push(summer);
  return container;
}

function generateMajorGraph(yearList, major_name) {
  var newcontainer = [];
  var majorContainer = []; //store major name for specific school
  for (let i = 0; i < yearList.length; i++) {
    var yearContainer = []; //sperate object by each year
    for (let j = 0; j < dataLength; j++) {
      if (data[j].Year == yearList[i] && data[j].School == major_name) {
        yearContainer.push(data[j]);
        majorContainer.push(data[j].Major);
      }
    }
    newcontainer.push(yearContainer);
  }
  majorContainer = majorContainer.filter(
    (item, i, ar) => ar.indexOf(item) === i
  );
  var result = majorDistribution(newcontainer, majorContainer);
  showMajorChart(yearList, result, majorContainer);
}
function majorDistribution(majorList, majorName) {
  //create dictionary
  dict = createDict(majorName);

  yearContainer = [];
  for (let i = 0; i < majorList.length; i++) {
    for (let j = 0; j < dict.length; j++) {
      for (let k = 0; k < majorList[i].length; k++) {
        if (majorList[i][k].Major == dict[j].major) {
          dict[j].Student += majorList[i][k].Students;
        }
      }
    }
    yearContainer.push(dict);
    dict = createDict(majorName);
  }
  return yearContainer;
}

function createDict(name) {
  localDict = [];
  for (let i = 0; i < name.length; i++) {
    localDict.push({
      major: name[i],
      Student: 0
    });
  }
  return localDict;
}
function showMajorChart(year, data, name) {
  var ctx1 = $("#majorChart");

  data = convertToArray(data, name.length);
  container = [];
  for (var i = 0; i < data.length; i++) {
    color =
      "#" +
      Math.random()
        .toString(16)
        .substr(-6); //generate random color
    dataset = {};
    dataset.label = name[i];
    dataset.data = data[i];
    dataset.backgroundColor = color;
    dataset.borderColor = color;
    dataset.borderWidth = [1, 1, 1, 1, 1];
    container.push(dataset);
  }
  //pie chart
  var data1 = {
    labels: year,
    datasets: container
  };
  //options
  var options = {
    responsive: true,
    title: {
      display: true,
      position: "top",
      text: "No. of Student",
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
  majorChart = new Chart(ctx1, {
    type: "bar",
    data: data1,
    options: options
  });
}
function convertToArray(data, length) {
  //create array
  var container = [];
  for (let i = 0; i < length; i++) {
    var iContainer = [];
    container.push(iContainer);
  }

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      container[j].push(data[i][j].Student);
    }
  }
  return container;
}
//test2 branch
