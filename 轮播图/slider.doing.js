;(function(){
	
	var objectToString = Object.prototype.toString,
		fnToString = Function.prototype.toString;

	//检查类型
	var checkType = function(type){
		return function(obj){
			return objectToString.call(obj) === '[object '+ type +']';
		}
	}
	var ObjectCheckType = checkType('object');
	var ArrayCheckType = checkType('array');
	var testDiv = document.createElement('div');

	var checkCss = function(str){
		if(ArrayCheckType(str)){
			return str.some(function(v){
				return (v in testDiv.style);
			})
		}
		return (str in testDiv.style);
	}

	var cssChange = checkCss('cssChange')
	var transformList = ['transform','WebkitTransform','MozTransform']
	var isTransformWork = checkCss()

	var accelerate = function (el,style){
		if(cssChange){
			el.style['willChange'] = style;
		}else{
			el.style['transition'] = 'translateZ(0)';
		}
	}

	
	

	
	var defaultSetting = {
		durationTime : '',
		isLoop :false,
		animationFunction : {'opacity':'opacity','translateX':'translateX'},//opacity  translateX translateY 
		accelerate: true, //是否开启加速
		beforeChange:function(){},
		afterChange:function(){},
		autoCalc: true,
		itemClass: '.silder-item',
		itemParent: '.slider-list'
	}
	slider.prototype.defaultSetting = defaultSetting;
	function getOneElement (selector){
		return document.querySelector(selector);
	}
	function getAllElement (selector){
		return document.querySelectorAll(selector);
	}
	function slider(setting){
		if(!(this instanceof slider)){
			return new slider(setting)
		}
		var itemWrap = ['type':]

		this.add = function(animationFunction){
			if(this['animationFunction'][animationFunction] === void 0){
				this['animationFunction'][animationFunction] = animationFunction
			}else{
				console.error('it was already init')
			}
		}
		this.delete = function(animationFunction){
			return delete this['animationFunction'][animationFunction];
		}
		function init(){
			var keys = Object.keys(setting);
			var len = keys.length;
			for(var i = 0;i<len;i++){
				this[keys[i]] = setting[keys[i]]
			}
		}

		

	}
	

})()