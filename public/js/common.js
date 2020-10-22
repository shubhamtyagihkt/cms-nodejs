function createCookie(name, value) {
	document.cookie = name + "=" + value + "; path=/";
}


function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
} 


function deleteCookies() {
    document.cookie = "token=; path=/";
}


function logout() {
	deleteCookies();
    
	window.location = "/";
}


function checkLogin() {
    
    var token = getCookie("token");

    if(token == "") {
        logout();
    }

    return token;
}