
var user = {};
$(document).ready(function(){
	getUserData();
})

function showData() {
	// body...
	var userName = $('#inputEmail').val();
	var passWord  = $('#inputPassword').val();
	var type = $('#type').val();
	//console.log(userName+" "+passWord+" "+type);
	window.location = "http://localhost/public_html/Final_project/admin.php";
	
}

function getUserData(){
  var link = "http://localhost/public_html/Final_project/user.php";
  $.ajax({
    url: link ,
    method:"GET",
    success:function (data) {
      for (var i = 0; i < data.length; i++) {
        var temp = data[i];
       	user[i] = temp;
      }
    }
  })//end ajax
}