var throttle = function(fn,delaytime){
	var wait = false;
	return function(){
		var that = this , args = arguments;
		if(!wait){
			wait = true;
			setTimeout(function(){
				fn.apply(that,args);
				wait = false;
			},delaytime);
		}
	}
}
var debounce = function(fn,delaytime){
	console.log('123');
	var tags ;
	return function(){
		var that = this,args = arguments;
		if(tags) clearTimeout(tags);
		tags = setTimeout(function(){
			fn.apply(that,args);
		},delaytime);
	}
}
module.exports = {throttle,debounce}