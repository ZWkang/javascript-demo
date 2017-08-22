(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(function () {
			return factory(root);
		});
	} else if (typeof exports === 'object') {
		module.exports = factory;
	} else {
		root.kanglazyload = factory(root);
	}
})(this, function (root) {
	if(root.kanglazyload){
		root.prekanglazyload = root.kanglazyload
	}
	// 存储全局变量减少引用查找
	let doc = document,
		win = root,
		_body = document.body,
		_documentElement = doc.documentElement;
	//是否支持srcset 是否支持getBoundingClientRect
	//view则是每次·视图·的一些信息
	//foreach减少引用
	//debounceFun  resize跟scroll的回调函数
	//flag
	let supporSrcset = 'srcset' in doc.createElement('img'),
		supportBCR = 'getBoundingClientRect' in doc.createElement('div'),
		view,
		foreach = Array.prototype.forEach,
		object = {},
		debounceFun,
		flag;
	//默认配置
	let Settings = {
		background: true,//是否背景图片
		backgroundTag: 'data-background',//对应的data属性
		imgSrc: true,//是否img标签src
		imgTag: 'data-src',//默认的data-src为img替换属性
		parent: null,//是否置顶范围内。默认是全局document
		srcset: false,
		srcsetTag: 'data-srcset',
		delayTime: 250,//debounce函数演示时间
		callback: function () { },//每一次更改图片之后的回调
		rendered: function () { },//执行render渲染函数后的回调
		deleleData: true,//是否删除data-*标签
		firstLoad: false,//第一次是否默认render加载
		error_picture: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAABONJREFUWIXlls2LHEUYxn9VNd2ZzM5u1sSgEsgiOIPgx8HN5pCAHyfFmBDjSbwGPAT8K7yIxEMkJOxu/gQvYqIH40nBZFn1JAMDIZewbHR7szuzM/1VVR66q7d7Zzbuyt4sKLqb7nqfp573eatf+L8PUX5YXFw8qpS6Zq29oLWePEggpVRPCPGt1vqzy5cvByMErl+/3mw0Gp25ubnnWq1Wzff9g8QnjmO63W66tLS0OhgMXr5y5UofoOY+mJiYuDo7O3u81WrVgiAgSZKMoRCVa8F8xzOAtXbss7UW3/dptVo1a+3x5eXlq8CnFQLGmI/b7bYfBAFxFCG1xqQpGAPWZtMY9zE2i1xmlF2lLK5WCBACqxSxMQRBQLvd9peWlj4eIaC1nvR9nzRNIQyxxiCNwWqNcCSMQbiduVkmIARCiIyclNm9lEilsFqTKoXv+5T9VWPHEEIg4hi0zgCNyXZeUkJYi7W2kobiuTylREiZqSIlcmpqJG27ErBaV3evNeTAWJu5t6RAsfMyAaWyFEgJSo31zVgCNooy4FwFB17xww4ChQdKu3ckxH4JiCTBpilojbQWqzXes8fwZmaw4ZDwzw42DCvrZKNB49Qb2FQTP3yI/nsNKwRCKYwjMoaA3E0B4jhLRRRhowhv5iTC95BTU9Rffy0LFkUQRQghOPTqK1nOfQ9/5iQ2DIu1Io6zeHslIOIY8sUugOn1S7s9TP3UbPatENRPzSIbh4v3+slGsc7FcET3lAIbx5CnQOSlGC3/Rv3sGeREIyMx0aB+9kxx74bpbxH//kcGLiVCqaeacEQBIJM2l61QYH2d4d2fqkpMNKrgvT7DH+9injzBhmGhgIs1boz3wA7pinyurzO48z2mvzUSyPT6DG/fwQTBdvrCsJrKvaYAl4I0xboDyZ0LUlbLrzSs846TXqmsHJWCWm0fVRDHxaRkSOF5NM5/gJxsjgaabNK4cB7heRX1KMXauwcccDkVnkfj0ofI6SPFZ2ZjE7OxuR1s+giNjy4hfR9TKsN9e2CEQBhSf/utKniwztbCIv35BUywvh3wmWnq771b8Q77OQcAbJJg4xjjDBTH1F54vniv1wJ6N26iV1cxjx/Tv3ETvVY0OahjR4t1NoqyOPs5iCr5zz3g3G/jmK2FxQx8OMQMh6QrK/SufU364AGm12fw3e2KB5wPxo2RKgAgV4AkwSYJJAnRr/cIf/5luxpKf0aEwKyssPHFl4X7Ra22XUE7e4d/I1CAl695WZq8NEW5QwJs3gGJMniJ6Kj4T1MgTTFO/lwBUyKB1pj8Fy2g6APc7h24tLZo3Szj+8jxBDwPtrYy+eO4SIN19zlA0aCUej+UQngewloMZEoBqjl6dkDJhEqpXpqmKKVonjuH8P3sJHTApZq2YYgJQ/RggB4O0YNBVvdhWDk7HGF56BCTFy8ipSRNU6SUfeBwRYE0Tb/pdruftNttT8zNUZ+dReaN5dNm4YFcjd2mEIJ6vU632002Nzd/AI4Bf7n14vTp0y/eunVrtdPppEmS2IMeSZLYTqej5+fn106cOPEO8BLQdArY+/fvrwsh3u/1ep83m803rbXb/9kDGFLKwdra2r2FhYWvHj16FAAhMNxpyyYwDdQBH3atnv8yNFnBxMA6sAmY3QAkoA4QnBzc5LMY/wBIAADusUmsIwAAAABJRU5ErkJggg==',
		loading_picture: 'data:image/gif;base64,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'
	};

	/*lazyload对象 cache对象存储所有应操作的对象*/
	var lazyload = {
		cache: []
	};
	//原生方法获取绝对left值
	lazyload.getPositionLeft = (ele) => {
		var actLeft = ele.offsetLeft;
		var currentLeft = ele.offsetParent;
		while (currentLeft !== null) {
			actLeft += currentLeft.offsetLeft;
			currentLeft = currentLeft.offsetParent;
		}
		return actLeft - view.scrollLeft;
	};
	//原生方法获取绝对最上值
	lazyload.getPositionTop = (ele) => {
		var actTop = ele.offsetTop;
		var currentTop = ele.offsetParent;
		while (currentTop !== null) {
			actTop += currentTop.offsetTop;
			currentTop = currentTop.offsetParent;
		}
		return actTop - view.scrollTop;
	};
	//初始化配置
	//绑定监听
	lazyload.init = function (opt) {
		option = lazyload.option = opt || Settings;
		let SettingKeys = Object.keys(Settings);
		for (let key of SettingKeys) {
			Settings[key] = option[key] || Settings[key];
		}
		let nodes;
		if (Settings.parent) {
			nodes = Settings.parent.querySelectorAll('[' + Settings.imgTag + '],' + '[' + Settings.sersetTag + '],' + '[' + Settings.backgroundTag + ']');
		} else {
			nodes = doc.querySelectorAll('[' + Settings.imgTag + '],' + '[' + Settings.srcsetTag + '],' + '[' + Settings.backgroundTag + ']');
		}
		this.cache = []
		foreach.call(nodes, (val) => {
			this.cache.push(val);
		})
		if(!!Settings.firstLoad){
			lazyload.render();
			Settings.rendered(view);
		}

		debounceFun = debounce(Settings.rendered, Settings.delayTime);

		if (document.addEventListener) {
			root.addEventListener('resize', debounceFun, false);
			root.addEventListener('scroll', debounceFun, false);
			// root.addEventListener('load', debounceFun, false);
		} else {
			root.attachEvent('onresize', debounceFun);
			root.attachEvent('onscroll', debounceFun);
			// root.attachEvent('onload', debounceFun);
		}
	}
	//render判断是否在视口内。做替换url src之类的操作
	lazyload.render = function (context) {
		view = {
			Left: 0,
			Top: 0,
			scrollTop: win.pageYoffset || doc.documentElement.scrollTop || doc.body.scrollTop,
			scrollLeft: win.pageXoffset || doc.documentElement.scrollLeft || doc.body.scrollLeft,
			lookHeight: win.innerHeight || doc.documentElement.clientHeight || doc.body.clientHeight,
			lookWidth: win.innerWidth || doc.documentElement.clientWidth || doc.body.clientWidth
		};
		if (this.cache.length <= 0) { return; }
		let len = this.cache.length;
		//两种方式 做兼容性处理
		if (!supportBCR) {
			for (var i = len - 1; i >= 0; i--) {
				let value = this.cache[i];
				if (isHtml(value)&& !isHidden(value)) {
					if (inViewWay2(value)) {
						srcChange(value);
						this.cache.splice(i, 1);
						Settings.callbackcallback(value, 'loaded');
					}
				}
			}
		} else {
			for (var i = len - 1; i >= 0; i--) {
				let value = this.cache[i];
				if (isHtml(value) && !isHidden(value)) {
					if (inViewWay1(value)) {
						srcChange(value);
						this.cache.splice(i, 1);
						Settings.callback(value, 'loaded');
					}
				}
			}
		}

		if (!this.cache.length) {
			lazyload.detach();
		}
	}
	//移除监听器
	lazyload.detach = () => {
		if (document.removeEventListener) {
			root.removeEventListener('resize', debounceFun);
			root.removeEventListener('scroll', debounceFun);
		} else {
			root.detachEvent('onresize', debounceFun);
			root.detachEvent('onscroll', debounceFun);
		}
		clearTimeout(flag);
	};
	//判断是不是hidden了
	function isHidden(ele) {
		return ele.offsetParent === null;
	}
	//判断是不是html元素
	function isHtml(dom) {
		return dom && (dom['nodeType'] === 1 || dom['nodeType'] === 9);
	}
	function loadImage(ele,src){

	}
	//debounce对应的render跟fn rendered callback
	function debounce(fn, delaytime) {
		return function () {
			var that = this, args = arguments;
			if (flag) clearTimeout(flag);
			flag = setTimeout(function () {
				lazyload.render();
				fn.call(that, view ,args);
			}, delaytime);
		}
	}
	//第一种使用getBoundingClientRect判断
	function inViewWay1(dom) {
		let box = dom.getBoundingClientRect();
		return (box.right >= view.Left && box.bottom >= view.Top && box.left <= view.lookWidth && box.top <= view.lookHeight);
	}
	//第二种使用原生方法判断
	function inViewWay2(dom, view) {
		if (dom.offsetParent === null) { return false; }
		let Left = lazyload.getPositionLeft(dom);
		let Top = lazyload.getPositionTop(dom);
		return Left >= 0 && Top >= 0 && Left < view['lookWidth'] && Top < view['lookHeight'];
	}
	//替换url
	function srcChange(domElement) {
		if (supporSrcset&&Settings.srcset && domElement.getAttribute(Settings.sersetTag)) {
			domElement.setAttribute('serset', domElement.getAttribute(Settings.sersetTag));
		} else if (Settings.background && domElement.getAttribute(Settings.backgroundTag)) {
			domElement.style.backgroundImage = 'url(' + domElement.getAttribute(Settings.backgroundTag) + ')';
			// domElement.onerror = function(e){console.log('backhasdjaksdjskd')}
		} else {
			domElement.src = domElement.getAttribute(Settings.imgTag);
			// domElement.onerror = function(e){console.log('123')}
		}
		if(!!Settings.deleleData){
			domElement.removeAttribute(Settings.sersetTag);
			domElement.removeAttribute(Settings.backgroundTag);
			domElement.removeAttribute(Settings.imgTag);
		}
	}
	//导出接口
	return lazyload;
});