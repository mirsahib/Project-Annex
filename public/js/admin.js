//event function
$("#semSubmit").click(function() {
  let strYear = $("#strYear_sem option:selected").text();
  let endYear = $("#endYear_sem option:selected").text();
  strYear = Number(strYear);
  endYear = Number(endYear);
  let data = { str: strYear, end: endYear };
  if (validate(data)) {
    httpRequest(
      "/admin/semester",
      data,
      "Semester Wise Chart",
      "Semester",
      "#yearChart"
    );
  } else {
    alert("Please select correct year");
  }
});

$("#schoolSubmit").click(function() {
  let strYear = $("#strYear_school option:selected").text();
  let endYear = $("#endYear_school option:selected").text();
  strYear = Number(strYear);
  endYear = Number(endYear);
  console.log(strYear + " " + endYear);
  let data = { str: strYear, end: endYear };
  if (validate(data)) {
    httpRequest(
      "/admin/school",
      data,
      "School Wise Chart",
      "School",
      "#SchoolChart"
    );
  } else {
    alert("Please select correct year");
  }
});
$("#majorSubmit").click(function() {
  let strYear = $("#strYear_major option:selected").text();
  let endYear = $("#endYear_major option:selected").text();
  let school = $("#slt_school option:selected").text();
  strYear = Number(strYear);
  endYear = Number(endYear);
  console.log(strYear + " " + endYear + " " + school);
  let data = { str: strYear, end: endYear, school: school };
  if (validate(data)) {
    httpRequest(
      "/admin/major",
      data,
      "Major Wise Chart",
      "Major",
      "#majorChart"
    );
  } else {
    alert("Please select correct year and school");
  }
});
function httpRequest(url, data, label, group, chartName) {
  let strYear = data.str;
  let endYear = data.end;
  $.ajax({
    type: "GET",
    data: data,
    url: url,
    dataType: "json", // <-- add this
    success: function(data) {
      console.log(data);
      //processMajorData(strYear, endYear, data);
      processData(strYear, endYear, data, label, group, chartName);
    },
    error: function(data) {
      //console.log("error");
      console.log(data);
    }
  });
}
function processData(strYear, endYear, data, label, group, chartName) {
  data = data.message;
  let groupName = getGroup(data, group);
  let year = getYear(strYear, endYear);
  let dataset = getDataset(groupName);
  dataset = populateDataset(data, dataset, group);
  let graphData = getGraphData(groupName, dataset);
  showGraph(year, graphData, label, chartName);
}
function validate(data) {
  let key = Object.keys(data);
  let count = 0;
  for (let i = 0; i < key.length; i++) {
    if (!data[key[i]] || data[key[i]] == "Select School") {
      count++;
    }
  }
  return count == 0 && Number(data.str) < Number(data.end);
}

// utility function
function getGroup(data, prop) {
  let dataList = [];
  if (prop == "Semester") {
    data.forEach(element => {
      if (dataList.indexOf(element._id[prop].split(" ")[0]) == -1) {
        dataList.push(element._id[prop].split(" ")[0]);
      }
    });
  } else {
    data.forEach(element => {
      if (dataList.indexOf(element._id[prop]) == -1) {
        dataList.push(element._id[prop]);
      }
    });
  }
  return dataList;
}
function getYear(strYear, endYear) {
  let year = [];
  for (let i = endYear; i >= strYear; i--) {
    year.push(i);
  }
  return year;
}
function getDataset(dataList) {
  let dataset = {};
  let len = dataList.length;
  for (let i = 0; i < len; i++) {
    dataset[dataList[i]] = [];
  }
  return dataset;
}
function populateDataset(data, dataset, property) {
  if (property == "Semester") {
    data.forEach(element => {
      let total = element.total;
      let prop = element._id[property].split(" ")[0];
      dataset[prop].push(total);
    });
  } else {
    data.forEach(element => {
      let total = element.total;
      let prop = element._id[property];
      dataset[prop].push(total);
    });
  }
  return dataset;
}
function getGraphData(dataList, dataset) {
  let len = dataList.length;
  let graphData = [];

  for (let i = 0; i < len; i++) {
    let color =
      "#" +
      Math.random()
        .toString(16)
        .substr(-6);

    container = {
      label: dataList[i],
      backgroundColor: color,
      borderColor: color,
      borderWidth: 1,
      data: dataset[dataList[i]]
    };
    graphData.push(container);
  }
  return graphData;
}
//draw graph function
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
