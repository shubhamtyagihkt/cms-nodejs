window.onload=function(){
	getAllPosts();
};

var posts=[];

	function showAllPosts(){
		var postContainer = document.getElementById("post_table");

		var postlist="";
		for(var i=0;i<posts.length;i++)
		{
			var post = posts[i];
			var currentDate = new Date(post.created_on);
			var updatedOn = new Date(post.updated_on);

			var date = currentDate.getDate();
			var month = currentDate.getMonth(); //Be careful! January is 0 not 1
			var year = currentDate.getFullYear();

			var u_date = updatedOn.getDate();
			var u_month = updatedOn.getMonth(); //Be careful! January is 0 not 1
			var u_year = updatedOn.getFullYear();




			const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
			"Jul", "Aug", "Sep", "Octr", "Nov", "Dec"
			];
			var dateString = (monthNames[month]) +" " +date + ", " + year;
			var updateString = (monthNames[u_month]) +" " +u_date + ", " + u_year;
			
			postlist+=

			`
			<tr>
                <td>`+post.title+`</td>
                <td>`+updateString+`</td>
                <td>`+dateString+`</td>
                <td><a class="btn btn-default" href="edit?post_id=`+post.post_id+`">Edit</a> <a class="btn btn-danger" href="#">Delete</a></td>
            </tr>
			
			`;
		}


		postContainer.innerHTML += postlist;	


		var postCount= document.getElementById("post_count");

		postCount.innerText=posts.length;
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
				showAllPosts();
				
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