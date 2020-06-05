window.onload = function () {

	var id = document.getElementById("post-id");
	getSinglePost(id.innerText);

};


function showSinglePost(post){
	var singlepost = document.getElementById("single-post");
	
	var postlist="";

			postlist+=`
							<h1 class="mb-3">`+post[0].title+`</h1>
							<p>`+post[0].description+`</p>
							<p>
								<img src="`+post[0].image_url+`" alt="" class="img-fluid">
							</p>
							<p>`+post[0].description+`</p>
			`;

	singlepost.innerHTML = postlist;	

}

function getSinglePost(post_id){
	$.ajax({
		type: "POST",
		contentType: "application/json",
		data: JSON.stringify({"id":post_id}),
		url: "/user_api_call/getSinglePost",
		success: function(response) {
			if(response.status == "success") {
				showSinglePost(response.items);
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