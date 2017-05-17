(function(window,document){
	//创建引用
	// 传递引用
	var win = window,
		doc=document

	var emit = function (eventname,e) {
		// console.log(eventname)
		var events = this._events,
			rest_events=(events[eventname]||[]).concat([]);
			// 内部复制个副本

		var target = e.srcElement||e.target;
		if(events.length==0||!rest_events)return
		//如果没有
		for(var i= rest_events.length-1; i>=0; i--){
			if(rest_events[i].parents===(void 0)){
				event_pack(eventname,rest_events[i]['callback'],this._ele,e);
				rest_events.splice(i,1);
			}else if(rest_events&&hasp(target,rest_events[i]['parents'])){
				event_pack(eventname,rest_events[i]['callback'],this._ele,e);
				rest_events.splice(i,1);
			}
		}
		i=null;//手动销毁

		if(rest_events.length ===0)return
	}
	function hasp(node,classname){
		if(!classname)return false
		var node = node||false
		while(node){
			if(node.className == classname){
				return true;
			}
			node = node.target
		}
		return false
	}
	function countposition(x1,x2,y1,y2){
		// 先判断垂直方向水平方向
		// 再判断上下左右
		return Math.abs(x1 - x2) >=Math.abs(y1-y2)?(x1 - x2 > 0 ? 'swipeleft' : 'swiperight') : (y1 - y2 > 0 ? 'swipeup' : 'swipedown')
	}
	var event_pack=function (name,fn,dom,e) {
		var new_event = {
			'name':name,
			'target':e.srcElement||e.target,
			'touches':e.touches
		}
		var call_res = fn.call(dom,new_event);
		if(call_res === false){
			e.preventDefault();
			e.stopPropagation();
		}
		return call_res
	}
	var eventListener = function (dom) {

		var self = this;

		var x1,x2,y1,y2,
			touchDelay,//用于双击
			starttime,//记录时间用于判断是否为双击
			endtime,
			isActive = false,
			eventmark = null,
			longtap,//用于长按
			tap//用于单击

		function actionfunc(){
			isActive=false;
			clearTimeout(touchDelay);
			clearTimeout(longtap);
		}
		function touchstart(e){
			// console.log('touchstart',e)
			eventmark = e||win.event;
			starttime = new Date();
			x1 = e.touches[0].pageX;
			y1 = e.touches[0].pageY;
			x2 = 0;
			y2 = 0;
			isActive = true

			//常按
			clearTimeout(longtap);
			longtap = setTimeout(function(){
				actionfunc();
				emit.call(self,'longtap',e);
			},500)

		}
		function touchmove(e){
			eventmark = e||win.event;
			if(!isActive)return;
			x2 = e.touches[0].pageX;
			y2 = e.touches[0].pageY;
			if(Math.abs(x1-x2)>6||Math.abs(y1-y2)>6){
				emit.call(self,countposition(x1,x2,y1,y2),eventmark);
			}else{
				emit.call(self,'singtap',e);
			}
			actionfunc()
			
		}
		function touchend(e){
			if(!isActive)return
			now = new Date;
			if(now-endtime<300){
				//三个事件
				actionfunc();
				//断定此次事件为连续两次轻击事件
				emit.call(self,'doubletap',eventmark);

			}else{
				touchDelay = setTimeout(function(){
					actionfunc();

					emit.call(self,'singletap',eventmark);
					endtime = null;
				},200);
			}
			endtime = now;

		}
		//这里这样写是因为想把控制绑定取消绑定的控制权给外部对象
		dom.addEventListener('touchstart',touchstart,false);
		dom.addEventListener('touchmove',touchmove,false);
		dom.addEventListener('touchend',touchend,false);	
		dom.addEventListener('touchcancel',actionfunc,false);

		return function (){
			dom.removeEventListener('touchend',touchend,false);	
			dom.removeEventListener('touchmove',touchmove,false);	
			dom.removeEventListener('touchstart',touchstart,false);
			dom.removeEventListener('touchcancel',actionfunc,false);	
		}
	}

	var _touch = function(element){
		if(!(this instanceof _touch))return new _touch(element);
		this._events = {};
		this._ele = element;
		this._id = 0;
		this._removecallback = null;
	} 
	_touch.prototype._on=function(eventname,callbackname,callback,parent){
		if(!(this instanceof _touch))throw new Error('error use');
		if(!this._events[eventname])this._events[eventname]=[]

		this._events[eventname].push({
				'name':callbackname||eventname,
				'callback':callback,
				'parents':parent||void 0,
				'_id':++this._id
			}
		);
		if(Object.keys(this._events).length===1 && this._events[eventname].length===1){
			this._removecallback = eventListener.call(this,this._ele);
		}

		return this;
	}
	_touch.prototype._remove=function(eventname,name){
		if(!(this instanceof _touch))throw new Error('error use');
		var _events = this._events;
		if(_events[eventname]===void 0 &&(!name))throw new Error('不存在这个事件')
		for(var len = _events[eventname], i =len.length-1;i>=0;i--){			
			if(_events[eventname][i]['name']===name){
				_events[eventname].splice(i,1);
			}
		}
		if(_events[eventname].length===0){delete _events[eventname]};

		if(Object.keys(_events).length===0){
			this._removecallback()
		}
		// 提供链式调用接口
		return this;
	}
	// 导出接口
	
	if(typeof win&&win.self===win){
		// 即使有别的重复 强制性覆盖
		if(win._touch !== _touch){
			win._touch = _touch
		}
		
	}
	

})(self,document||{})