$("#submit").click(() => {
  var email = $("#inputEmail").val();
  var password = $("#inputPassword").val();
  var type = $("#type option:selected").text();
  $.ajax({
    method: "POST",
    data: { email: email, password: password, type: type },
    url: "/",
    datatype: "json"
  })
    .done(res => {
      if (res == "Admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/operator";
      }
    })
    .fail(res => {
      console.log(res);
    });
});
