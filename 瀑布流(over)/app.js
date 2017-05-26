(function(){
	// 懒加载对象 
	// 导出_cache压入的图片数组便于调试 init初始化 cuca计算函数
	var lazyload = (function (){
		var doc = document,
			win = window,
			_cache = [];
		function init(){
			var _img = document.querySelectorAll('img');
			for (var i =0,len = _img.length;i<len;i++){
				if(_img[i].getAttribute('data-src')!==''){
					_cache.push(_img[i])
				}
			}
		};
		//更改图片url
		function changesrc (url){
			this.src = url;
			this.setAttribute('data-src','');
		}
		//得到元素在页面的绝对左偏移距离
		function getPositionLeft(ele){
			var actLeft = ele.offsetLeft;
			var currentLeft = ele.offsetParent;
			while(currentLeft!==null){
				actLeft+=currentLeft.offsetLeft;
				currentLeft = currentLeft.offsetParent;
			}
			return actLeft;
		}
		//得到元素在页面的绝对上偏移距离
		function getPositionTop(ele){
			var actTop = ele.offsetTop;
			var currentTop = ele.offsetParent;
			while(currentTop!==null){
				actTop +=currentTop.offsetTop;
				currentTop = currentTop.offsetParent;
			}

			return actTop;
		}
		//得到用于判断是否在可视区域
		function getReleativeTop(ele){
			var scrollT = win.pageYoffset || doc.documentElement.scrollTop||doc.body.scrollTop;
			return getPositionTop(ele)-scrollT;//绝对距离减去滑动条距离
		}
		function getReleativeLeft(ele){
			var scrollL = win.pageXoffset || doc.documentElement.scrollLeft||doc.body.scrollLeft;

			return getPositionLeft(ele)-scrollL;//绝对距离减去滑动条距离
		}
		//监听计算 主函数
		function cuca(){
			var value,lookH,lookW,scrollT,Left,Top;
			if(_cache.length<=0){return;}
			lookH = win.innerHeight||doc.documentElement.clientHeight||doc.body.clientHeight;
			lookW = win.innerWidth||doc.documentElement.clientWidth||doc.body.clientWidth;
			//滚动条距离
			scrollT = win.pageYoffset ||doc.documentElement.scrollTop||doc.body.scrollTop;
			var len = _cache.length;
			// 尾部开始循环方便删除元素
			for(var i = len-1;i>=0;i--){
				value = _cache[i];
				Left = getReleativeLeft(value);
				Top = getReleativeTop(value);
				// console.log(Left,Top,lookW,lookH,getPositionTop(value))
				if(Left>=0&&Top>=0&&Left<lookW&&Top<lookH){
					changesrc.call(value,value.getAttribute('data-src'));
					_cache.splice(i,1);
				}
			}
			i=null;
		}
		return {
			_cache:_cache,
			_init:init,
			_cuca:cuca
		}
	})();
	//新增img元素
	var myImage = function(node,src){
		if(!node&&!src){return;}
		var _cache = [];
		var imagenode = document.createElement('img');
		imagenode.setAttribute('data-src',src);1
		node.appendChild(imagenode);
		return void 0;
	}





	// 瀑布流计算位置
	// 用position
	function imglocation(option){
		if(Object.prototype.toString.call(option) !== '[object Object]') return;
		var _option = option||{},
			_width = option['width'],
			_box = option['box'],
			_container = option['container'],
			_arr = option['arr'],
			_content = option['content']||'.content';

		if(!_option||!_width||!_box||!_container||!_arr){
			throw new TypeError('参数错误');
			return;
		}
		//获取元素
		var box = document.querySelectorAll(_box),
			container = document.querySelector(_container),
			boxwidth = _width;

		if(box.length ===0||container===0||boxwidth<=0){
			throw new TypeError('参数错误');
			return;
		}
		//获取参数
		var lookW = container.offsetWidth||document.documentElement.clientWidth||document.body.clientWidth,
			num = Math.floor(lookW/_width),
			boxArr = [],
			isActive = false;
		
		var minboxHeight,minboxIndex,boxHeight;
		if(box[0].querySelectorAll('img').length===1){
			isActive=true;
		}
		if(lookW<Number(_width)){
			num = 1;
		}
		// 稍稍对比了一下 display none的timeline
		// container.style.display='none';

		//内部比对
		Array.prototype.forEach.call(box,function(value,index){
			value.style.position="static";
			boxHeight = _arr[index]['height'] ;
			if(!isActive){
				myImage(value.querySelector(_content),_arr[index]['url']);
			}
			
			if(index<num){
				boxArr[index]=boxHeight;
			}else{
				minboxHeight = Math.min.apply(null,boxArr);
				minboxIndex  = boxArr.indexOf(minboxHeight);
				value.style.position='absolute';
				value.style.top = minboxHeight+"px";
				value.style.left = (minboxIndex*_width)+'px';
				boxArr[minboxIndex] +=boxHeight;
			}
		});
		// container.style.display='block';
	}

	window._imgloadtion = imglocation;
	window._lazyload = lazyload;
})()

//传入参数
var imagedata  ={'container':'.container','box':'.box','width':180,'content':'.content',
'arr':[{'url':'1.jpg','height':180},{'url':'2.jpg','height':180},{'url':'3.jpg','height':180},{'url':'4.jpg','height':262},
{'url':'1.jpg','height':180},{'url':'2.jpg','height':180},{'url':'3.jpg','height':180},{'url':'4.jpg','height':262},
{'url':'1.jpg','height':180},{'url':'2.jpg','height':180},{'url':'3.jpg','height':180},{'url':'4.jpg','height':262},
{'url':'1.jpg','height':180},{'url':'2.jpg','height':180},{'url':'3.jpg','height':180},{'url':'4.jpg','height':262},
{'url':'1.jpg','height':180},{'url':'2.jpg','height':180},{'url':'3.jpg','height':180},{'url':'4.jpg','height':262},
{'url':'1.jpg','height':180},{'url':'2.jpg','height':180},{'url':'3.jpg','height':180},{'url':'4.jpg','height':262},
{'url':'1.jpg','height':180},{'url':'2.jpg','height':180},{'url':'3.jpg','height':180},{'url':'4.jpg','height':262},
{'url':'1.jpg','height':180},{'url':'2.jpg','height':180},{'url':'3.jpg','height':180},{'url':'4.jpg','height':262},
{'url':'1.jpg','height':180},{'url':'2.jpg','height':180},{'url':'3.jpg','height':180},{'url':'4.jpg','height':262}]};
//这个height代表了box容器盒子的高度在这里定义了
//.container
//	.box
//		.content
//			img

//init是lazyload的初始化
//cuca是lazyload的监听计算
window.onload=function(){
	_imgloadtion(imagedata);
	_lazyload._init();
	_lazyload._cuca();
}

var re ;
//绑定再scroll内
window.onscroll=function(){
	_lazyload._cuca();
}
//onresize触发重新布局计算
window.onresize = function(){	
	clearTimeout(re)
	re = setTimeout(function(){
		_imgloadtion(imagedata);
		_lazyload._init();
		_lazyload._cuca();
	},1000);
}