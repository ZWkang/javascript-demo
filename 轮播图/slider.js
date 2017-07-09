	(function(_doc,_win,undefined){
		var SliderFactory = (function(){
			var id=0;
			return function(option){
				this.id = id++;
				var option = option||{}
				var index = 0;
				this.ContainerClass={}
				this.autoPlay=false
				this.autoinit = false
				this.clickdelay = false
				this.init=function(){
					wrap(initPreBtn)(option["pics_pre"])&&
				}
				function initContainer(){

				}
				function initIconList(){

				}
				function initPreBtn(pics_pre){
					this.ContainerClass['pre_btn'] = this.getOne(pics_pre)
					return true
				}
				function initNextBtn(pics_next){
					this.ContainerClass['next_btn'] = this.getOne(pics_next)
					return true
				}
				function initImageList(img_class){
					this.ContainerClass['imgs_container'] = this.getOne(img_class)
					return true
				}
				function wrap(fn){
					if(!(this instanceof SliderFactory))return new SliderFactory()
					return function(args){
						fn.apply(this,args)
					}	
				}
			}
		})()
		SliderFactory.prototype={
			constructor:SliderFactory,
			isObject:function(obj){
				return Object.prototype.toString.call(null,obj)
			},
			addEvent:function(ele, eventType, callback, bool){
				if(ele.addEventListener){
					return ele.addEventListener(eventType,callback,!!bool)
				}else if(ele.attachEvent){
					return ele.attachEvent(eventType,callback)
				}else{
					return ele["on"+eventType] = callback
				}
			},
			removeEvent:function(ele,eventType,callback,bool){
				if(ele.addEventListener){
					return ele.removeEventListener(eventType,callback,!!bool)
				}else if(ele.attachEvent){
					return ele.detachEvent(eventType,callback)
				}else{
					return ele["on"+eventType] = null
				}
			},
			cancelEvent:function(event){
				if(event.preventDefault){
					e.preventDefault();
				}else{
					event.returnValue = false;
				}
			},
			eventstopPropagation:function(event) {
				if(event.stopPropagation){
					event.stopPropagation()
				}else{
					event.cancelBubble = true
				}
			},
			eventGet:function(e){
				return e||window.event
			},
			getAll:function(selector){
				return document.getSelectorAll(selector)
			},
			getOne:function(selector){
				return document.getSelector(selector)
			}
		}
	})(document||{},window||{},void 0)