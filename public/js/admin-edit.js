window.onload = function () {

	var id = document.getElementById("post-id");
	getSinglePost(id.innerText);

};


function editPost(post){
	var postTitle = document.getElementById("post_title");
	var postDescription = document.getElementById("post_description");
	var postImage = document.getElementById("post_image");

	postTitle.value=post[0].title;
	postDescription.value=post[0].description;
	postImage.value=post[0].image_url;

}




function getSinglePost(post_id){
	$.ajax({
		type: "POST",
		contentType: "application/json",
		data: JSON.stringify({"id":post_id}),
		url: "/user_api_call/getSinglePost",
		success: function(response) {
			if(response.status == "success") {
				editPost(response.items);
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