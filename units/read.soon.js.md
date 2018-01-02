http://www.bluejava.com/4NS/Speed-up-your-Websites-with-a-Faster-setTimeout-using-soon
```
var soon = (function () {

	var fq = []; // function queue;
    //函数队列
	function callQueue() {
	    // 执行函数队列
		while (fq.length) // this approach allows new yields to pile on during the execution of these
		
		{
			var fe = fq[0];
			// 调用我们的函数并传入上下文环境 参数
			fe.fn.apply(fe.me, fe.args) // call our fn with the args and preserve context
			// 函数队列里下一个。
			fq.shift(); // remove element just processed... do this after processing so we don't go 0 and trigger soon again
		}
	}

	// yeild processing and execute this code later - i.e. setImmediate
	var fnYield = (function () {
        // 这是最快的一种方式了。使用MutationObserver
		// This is the fastest way browsers have to yield processing
		if (typeof MutationObserver !== "undefined") {
			// first, create a div not attached to DOM to "observe"
			// 创建一个div 用于做观察
			var dd = document.createElement("div");
			// iife返回一个函数
			return function (fn) {
				var mo = new MutationObserver(function () {
				    // 起监听器
					mo.disconnect();	// cleanup
					fn();
				});
				mo.observe(dd, { attributes: true });
				//起监听
				dd.setAttribute("a", 0); // trigger callback
				// 触发监听回调
			}
		}

		// if No MutationObserver - this is the next best thing - handles Node and MSIE
		if (typeof setImmediate !== "undefined")
			return setImmediate;
			// 这是第二个最合适的方式  使用setImmediate

		// final fallback - shouldn't be used for much except very old browsers
		return function (fn) { setTimeout(fn, 0) }
		// 这是最后一种选择了setTimeout
	})();

	// this is the function that will be assigned to soon
	// it takes the function to call and examines all arguments
	// 这个主要是iife返回一个初始化参数 检查参数的函数。主要还是调用以上的iife
	return function (fn) {

		// push the function and any remaining arguments along with context
		// 做一个参数 执行环境初始化吧。
		fq.push({ fn: fn, args: [].slice.apply(arguments).splice(1), me: this });
        
		if (fq.length == 1) // upon adding our first entry, kick off the callback
			fnYield(callQueue);
			// 增加之后启动回调调用咯。
	};

})();
```