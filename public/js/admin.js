//event function
$("#semSubmit").click(function() {
  //user input
  let strYear = $("#strYear_sem option:selected").text();
  let endYear = $("#endYear_sem option:selected").text();
  //convert to number
  strYear = Number(strYear);
  endYear = Number(endYear);
  let data = { str: strYear, end: endYear };
  //validate user input,check if an input is empty or strYear is greater than endYear
  if (validate(data)) {
    //validation true fetch data from server
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
  //user input
  let strYear = $("#strYear_school option:selected").text();
  let endYear = $("#endYear_school option:selected").text();
  //convert user input to number
  strYear = Number(strYear);
  endYear = Number(endYear);
  console.log(strYear + " " + endYear);
  let data = { str: strYear, end: endYear };
  //validate user input,check if an input is empty or strYear is greater than endYear
  if (validate(data)) {
    //validation true fetch data from server
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
  //user input
  let strYear = $("#strYear_major option:selected").text();
  let endYear = $("#endYear_major option:selected").text();
  let school = $("#slt_school option:selected").text();
  //convert user input to number
  strYear = Number(strYear);
  endYear = Number(endYear);
  let data = { str: strYear, end: endYear, school: school };
  //validate user input,check if an input is empty or strYear is greater than endYear
  if (validate(data)) {
    //validation true fetch data from server
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
  //send an ajax request to the server to fetch the data
  $.ajax({
    type: "GET",
    data: data,
    url: url,
    dataType: "json",
    success: function(data) {
      //processData parameter description
      //strYear,endYear: user input
      //data: receive from server
      //label:pass from eventlisetener funtion eg: "Semester wise chart"
      //group:pass from eventlisetener funtion eg: "Semester","School","Major"
      //chartName: pass from eventlisetener funtion eg: "#yearChart"
      processData(strYear, endYear, data, label, group, chartName); //processdata for given parameter
    },
    error: function(data) {
      console.log(data);
    }
  });
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
function processData(strYear, endYear, data, label, group, chartName) {
  //see httpRequest funtion for parameter description
  data = data.message;
  let groupName = getGroup(data, group); //get all semester or school or major name
  let year = getYear(strYear, endYear); //get year list eg: year = [2013,2014,2015]
  let dataset = getDataset(groupName); //create dictionary with each semester or school or major name as its key,it is an associative array
  dataset = populateDataset(data, dataset, group); //populate the dictionary with value for corresponding key
  let graphData = getGraphData(groupName, dataset); //create a graph datastructure for chart js
  showGraph(year, graphData, label, chartName); //displat chart
}

// utility function
function getGroup(data, prop) {
  let dataList = [];
  //condition is used because for each semester there are 2 admission session
  //therefore semester name if eg: summer 01,summer 02
  if (prop == "Semester") {
    data.forEach(element => {
      //trim the session from semester and then insert it to datalist
      if (dataList.indexOf(element._id[prop].split(" ")[0]) == -1) {
        dataList.push(element._id[prop].split(" ")[0]);
      }
    });
  } else {
    //for every other group(school,semester) name just insert the name
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
//see chart js documentation for more detail
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
