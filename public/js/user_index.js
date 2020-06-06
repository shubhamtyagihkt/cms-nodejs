
window.onload = function () {
	getAllPosts();
};
var category = [];
var posts = [];
var postindex=0;
function showPosts(category){
	var postContainer = document.getElementById("posts");

	var postlist="";

		var post = posts[postindex++];

			var currentDate = new Date(post.created_on);

			var date = currentDate.getDate();
			var month = currentDate.getMonth(); //Be careful! January is 0 not 1
			var year = currentDate.getFullYear();

			const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
								  "Jul", "Aug", "Sep", "Octr", "Nov", "Dec"
								];
			var dateString = (monthNames[month]) +" " +date + ", " + year;
			
			postlist+=
			`
			<li>
			<div class="col-md-12">
				<div class="blog-entry ftco-animate d-md-flex">
					<a href="single" class="img img-2" style="background-image: url(`+post.image_url+`);"></a>
						<div class="text text-2 pl-md-4">
							<h3 class="mb-2">`+post.title+`</h3>
								<div class="meta-wrap">
									<p class="meta">
									<span><i class="icon-calendar mr-2"></i>`+dateString+`</span>
									<span><a href="single.html"><i class="icon-folder-o mr-2"></i>`+category+`</a></span>
									<span><i class="icon-comment2 mr-2"></i>5 Comment</span>
									</p>
								</div>
							<p class="mb-4">`+post.description+`</p>
							<p><a href="/single?post_id=`+post.post_id+`" class="btn-custom" >Read More <span class="ion-ios-arrow-forward"></span></a></p>
						</div>
				</div>
			</div>
			</li>
			`;
	
	postContainer.innerHTML += postlist;	
}

function getAllPosts() {
	$.ajax({
		type: "POST",
		contentType: "application/json",
		data: JSON.stringify({}),
		url: "/user_api_call/getAllPosts",
		success: function(response) {
			if(response.status == "success") {
				posts = response.items;
				getCategory();
				
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

function getCategory() {

	for(var i=0;i<posts.length;i++){
		var currpostid = posts[i].post_id;
			$.ajax({
			type: "POST",
			contentType: "application/json",
			data: JSON.stringify({"id":currpostid}),
			url: "/user_api_call/getCategory",
			success: function(response) {
				if(response.status == "success") {
					showPosts(response.items[0].name);

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

	
}