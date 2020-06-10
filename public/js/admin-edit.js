window.onload = function () {
	var status = getParameterByName("status");
	var id = document.getElementById("post-id");
	console.log(id);
	getSinglePost(id.innerText);
	if(status=="success"){
		var alert = document.getElementById("alert");
		alert.style.display = "block";
		setTimeout(function(){
			alert.style.display="none";
		}, 3000)
	}
	
};


function editPost(post){
	var postTitle = document.getElementById("post_title");
	var postDescription = document.getElementById("post_description");
	var postImage = document.getElementById("post_image");

	postTitle.value=post[0].title;
	postDescription.value=post[0].description;
	postImage.value=post[0].image_url;

}
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
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