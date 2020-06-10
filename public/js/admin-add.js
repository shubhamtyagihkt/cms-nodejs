window.onload = function () {

};

function createPost(title,description,image_url,category,user_id){
	$.ajax({
		type: "POST",
		contentType: "application/json",
		data: JSON.stringify({"title":title,"description":description,"image_url":image_url,"category":category,"user_id":user_id}),
		url: "/admin_api_call/createPost",
		success: function(response) {
			if(response.status == "success") {
				//editPost(response.items);
				console.log(response.items);
			}
			else {
				console.log(response);
			}
		},
		error: function(xhr, status, err) {
			console.log(err.toString());
		}
	});
}