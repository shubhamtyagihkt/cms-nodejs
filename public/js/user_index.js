
window.onload = function () {
	getAllPosts();
};

function showPosts(posts){
	var allPosts =  posts;
	//console.log(allPosts);
	var postContainer = document.getElementById("posts");

	var postlist="";

	for(var i=0;i<allPosts.length;i++){
		var post = allPosts[i];
		//console.log(post);

			
			postlist+=
			`
			<li>
			<div class="col-md-12">
				<div class="blog-entry ftco-animate d-md-flex">
					<a href="single.html" class="img img-2" style="background-image: url(`+post.image_url+`);"></a>
						<div class="text text-2 pl-md-4">
							<h3 class="mb-2"><a href="single.html">`+post.title+`</a></h3>
								<div class="meta-wrap">
									<p class="meta">
									<span><i class="icon-calendar mr-2"></i>`+post.created_on+`</span>
									<span><a href="single.html"><i class="icon-folder-o mr-2"></i>`+post.category_id+`</a></span>
									<span><i class="icon-comment2 mr-2"></i>5 Comment</span>
									</p>
								</div>
							<p class="mb-4">`+post.description+`</p>
							<p><a href="#" class="btn-custom">Read More <span class="ion-ios-arrow-forward"></span></a></p>
						</div>
				</div>
			</div>
			</li>
			`;
	}
	postContainer.innerHTML = postlist;
	
}


function getAllPosts() {
	$.ajax({
		type: "POST",
		contentType: "application/json",
		data: JSON.stringify({}),
		url: "http://localhost:3000/user_api_call/getAllPosts",
		success: function(response) {
			if(response.status == "success") {
				showPosts(response.items);
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