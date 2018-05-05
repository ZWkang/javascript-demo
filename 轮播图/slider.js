// 实现轮播图的方法。
// 需要div


(function (_doc, _win, undefined) {
	var SliderFactory = (function () {
		var id = 0;
		return function (option) {
			this.id = id++;
			var option = option || {}
			var index = 0;
			this.ContainerClassSelector = {} //
			this.autoPlay = false //是否自动滚动
			this.autoinit = false //是否自动初始化
			this.clickdelay = false	//点击是否开启延迟
			this.animate_duration = '1s' //动画变换时间
			this.auto_width = true	//是手动输入每个元素块的大小(这种情况下通常可以用作按需加载)还是自动获取
			this.slider_like = "CSS" //动画函数的效果 是css control  or  javascript control
			this.MODE_SELECT = 1 //三种模式  简单滑动 透明度  无缝滑动
			this.hooks = {
				start: [],
				sectionStart: [],
				sectionChanging: [],
				sectionEnd: [],
				end: []
			} // 挂载的生命周期


			this.mainWorkFlow = function () {

			}
			this.hook = function (name, fn) {
				var arr = tihs.hook[name] || tihs.hook =[] && tihs.hook[name]
				arr.push(fn)
			}
			this.firehook = function (name) {
				var fn = null
				while (this.firehook[name] !== void 0 && this.firehook[name].length !== 0) {
					fn = this.firehook[name].shift()
					fn && fn();
				}
				return this;
			}
			this.removehook = function (name, fn) {
				if (!name) return
				var index
				if (fn) {
					index = this.firehook[name].indexOf(fn)
					delete this.firehook[name][index]
				} else {
					delete this.firehook[name]
				}
			}
			function initContainer(obj) {
				var i
				for (i in arr) {
					if (obj.hasOwnProperty(i)) {
						this.ContainerClass[i] = this.getOne(pics_pre)
					}
				}
				i = null
			}
			function initIconList() {

			}
			function initPreBtn(pics_pre) {
				this.ContainerClass['pre_btn'] = this.getOne(pics_pre)
				return true
			}
			function initNextBtn(pics_next) {
				this.ContainerClass['next_btn'] = this.getOne(pics_next)
				return true
			}
			function initImageList(img_class) {
				this.ContainerClass['imgs_container'] = this.getOne(img_class)
				return true
			}
			function wrap(fn) {
				if (!(this instanceof SliderFactory)) return new SliderFactory()
				return function (args) {
					fn.apply(this, args)
				}
			}
			this.mode = function (modes) {
				switch (modes) {
					case 'opacity':

				}
			}

		}
	})()
	SliderFactory.prototype = {
		constructor: SliderFactory,
		isObject: function (obj) {
			return Object.prototype.toString.call(null, obj)
		},
		addEvent: function (ele, eventType, callback, bool) {
			if (ele.addEventListener) {
				return ele.addEventListener(eventType, callback, !!bool)
			} else if (ele.attachEvent) {
				return ele.attachEvent(eventType, callback)
			} else {
				return ele["on" + eventType] = callback
			}
		},
		removeEvent: function (ele, eventType, callback, bool) {
			if (ele.addEventListener) {
				return ele.removeEventListener(eventType, callback, !!bool)
			} else if (ele.attachEvent) {
				return ele.detachEvent(eventType, callback)
			} else {
				return ele["on" + eventType] = null
			}
		},
		cancelEvent: function (event) {
			if (event.preventDefault) {
				e.preventDefault();
			} else {
				event.returnValue = false;
			}
		},
		eventstopPropagation: function (event) {
			if (event.stopPropagation) {
				event.stopPropagation()
			} else {
				event.cancelBubble = true
			}
		},
		eventGet: function (e) {
			return e || _win.event
		},
		getAll: function (selector) {
			return _doc.getSelectorAll(selector)
		},
		getOne: function (selector) {
			return _doc.getSelector(selector)
		}
	}
})(document || {}, window || {}, void 0)