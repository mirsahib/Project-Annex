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
    url: "/operator",
    datatype: "json"
  })
    .done(res => {
      console.log(res);
    })
    .fail(res => {
      console.log(res);
    });
});
