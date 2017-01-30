;(function(w,undefined){
	// 'use strict';
	var WebPerf = {};
	WebPerf.navigator=new Array();
	
	WebPerf.navigator={
		'userAgent':navigator.appVersion||'',
		'appVersion':navigator.appVersion||'',
		'appName':navigator.appName||'',
		'language':navigator.language||'',
		'platform':navigator.platform||'',

	}
	var perf = window.performance||window.msPerformance||window.webkitperformance;
	var t = perf.timing;
	var nav = perf.navigation;
	WebPerf.type = {
		type : nav.type||0,
		redirectCount:nav.redirectCount||0
	}
	WebPerf.timing={
		
		
		//文档在加载的时候有多个部分。
		//dns请求 http请求 https请求 资源请求 dom文档渲染等等
		//其中要了解readyState的四个状态
		//未加载   加载中 已经加载(文档可以交互)  compete 载入完成
		//在载入完成之后要请求资源
		//再来计算这个性能。
		//其实我算的并不是很好，因为很多数据都难进行对比测试。 

		pageloadtime : t.loadEventStart - t.navigationStart,
		//页面加载时间

		dns : t.domainLookupEnd - t.domainLookupStart,
		//域名解析时间
		tcp : t.connectEnd - t.connectStart,
		//tcp连接时间


		// ttfb : t.responseStart - t.navigationStart,
		//内容加载完成时间

		InterResource : t.domContentLoadedEventEnd - t.domContentLoadedEventStart,
		//获得网络资源
		//也就是获得资源占用时间
		//读取页面第一个字节之前的耗时

		// domReady : t.domComplete - t.responseEnd ;
		aaaaa:t.domInteractive,
		domInteractive : t.domInteractive-t.domLoading,
		domCompletes : t.domComplete-t.domLoading,

		//解析dom结构时间

		whitepage : t.responseStart - t.navigationStart,
		//白屏时间
		
		request : t.responseEnd - t.responseStart ,
		//http相应请求 完成时间 包括本地读取缓存

		loadEvent : t.loadEventEnd - t.loadEventStart ,
		//执行onload回调函数的时间
		loadEventTime : t.loadEventEnd-t.navigationStart,
		//
		unloadEvent : t.unloadEventEnd - t.unloadEventStart ,
		//卸载页面时间

		

	}
	console.log(JSON.stringify(WebPerf));
	// var img = new Image();
	// img.src = JSON.stringify(WebPerf);
	// img.onerror=function(){
	// 	console.log('over');
	// }



})(window)


