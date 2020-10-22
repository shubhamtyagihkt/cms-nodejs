function submitLoginForm() {
	var email = $("#email").val();
	var password = $("#password").val();

	if (email == "" || password == "") {
		alert("Please fill out the required fields!");
		return;
	}

	$.ajax({
		type: "POST",
		contentType: "application/json",
		data: JSON.stringify({email: email, password: password}),
		url: '/admin_api_call/' + 'login',
		success: function(response) {
			if(response.status == 'success') {
				//console.log("break here at 17 line");
				createCookie("token", response.data.token);
				//console.log("break here at 19 line");
				window.location = "/admin/index";
			}
			else {
				alert(response.message || "Error!");
			}
		},
		error: function(xhr, status, err) {
			console.log(err.toString());
		}
	});
}
