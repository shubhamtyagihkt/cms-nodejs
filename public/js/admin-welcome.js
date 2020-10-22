$(document).ready(function () {
	welcome();
});




function welcome() {
	var token = checkLogin();

	$.ajax({
		type: "POST",
		contentType: "application/json",
		data: JSON.stringify({"token": token}),
		url: '/admin_api_call/' + 'welcome',
		success: function(response) {
			if(response.status == 'success') {
				$("#name").html(response.data.name);
			}
			else {
				logout();
				alert(response.message || "Error!");
			}
		},
		error: function(xhr, status, err) {
			console.log(err.toString());
		}
	});
}
