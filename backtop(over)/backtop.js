window.onload=function(){
	var topbtn = document.getElementById("btn");
	var timer = null;
	var pageheight = document.documentElement.clientHeight;
	var pageweight = document.documentElement.clientWidth;

	window.onscroll=function(){
		var backtop = document.body.scrollTop;
		if (
			backtop >= pageheight) {
			topbtn.style.display = "block";
			topbtn.style.marginLeft=(parseInt(pageweight/3)+"px")
		}else{
			topbtn.style.display = "none";
		}

	}


	topbtn.onclick=function(){
		// alert("hello");

		
		timer=setInterval(function(){
			var backtop = document.body.scrollTop;
			var speedtop = backtop/13;
			document.body.scrollTop = backtop - speedtop;
			if (backtop == 0) {
				clearInterval(timer);
			}
		},30);
	}
}