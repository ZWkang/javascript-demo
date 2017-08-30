let testarr = [1,2,3,4,5,6];


var root = typeof self == 'object' && self.self === self && self ||
            typeof global == 'object' && global.global === global && global ||
            this;

//创建数组
var xx = [],xx = new Array();

//shift删除前头元素
//unshift 加入前头元素

//Array.from() 方法从一个类似数组或可迭代对象创建一个新的数组实例。
// console.log(Array.form('kang'));


// if (!Array.isArray) {
//	 Array.isArray = function(arg) {
//	 return Object.prototype.toString.call(arg) === '[object Array]';
//	 };
// }
// isArray polyfill


// Array.concat连接数组

//copyWithin() 方法浅复制数组的一部分到同一数组中的另一个位置，并返回它，而不修改其大小。

function copyright(){
	return testarr.slice();
}
// console.log(testarr.slice().filter(function(value){return value >2;}))

if(!Array.prototype.filter){
	Array.prototype.filter=function(fun){
		'use strict'
		if(this === void 0 || this===null) throw TypeError();
		var t = Object(this);
		var len = t.length >>>0;
		if((Object.prototype.toString.call(function(){})).toLowerCase()!=='[object function]')throw new TypeError();

		var res = [];
		var thisArg = arguments.length>=2 ? arguments[1]:void 0;
		for (var i = 0; i < len; i++)
		{
			if (i in t)
			{
				var val = t[i];
				if (fun.call(thisArg, val, i, t)){
					res.push(val);
				}
			}
		}

		return res;
	}
}

var every = copyright().every(function(value,index,array){
	//console.log(this);
	return (value>=2);
},root);

var fill = copyright().fill(4);

var find = copyright().find(function(value,index,array){
	return value>4;
});

var findIndex = copyright().findIndex(function(value,index,array){
	return value>4;
});
//第二个thisArg指定this
var forEach = copyright().forEach(function(value,index,array){
	//console.log('index:'+index+'--value:'+value);
});
//forEach polyfill
if (!Array.prototype.forEach) {
	Array.prototype.forEach = function(callback, thisArg) {
		var T, k;
		if (this == null) {
			throw new TypeError(' this is null or not defined');
		}
		var O = Object(this);
		var len = O.length >>> 0;
		if (typeof callback !== "function") {
			throw new TypeError(callback + ' is not a function');
		}
		if (arguments.length > 1) {
			T = thisArg;
		}
		k = 0;
		while (k < len) {
			var kValue;
			if (k in O) {
				kValue = O[k];
				callback.call(T, kValue, k, O);
			}
			k++;
		}
	};
}

var include = copyright().includes(3);

var indexOf = copyright().indexOf(3);

var join = copyright().join(',');

var lastindexOf = copyright().lastIndexOf(2,-2);

var map = copyright().map(function(value,index,array){
	return value*2;
});

//左往右
var reduce = copyright().reduce(function(accumulator,currentValue,currentIndex,array){
	return accumulator+currentValue;
},100);

//右往左
var reduceRight = [[0, 1], [2, 3], [4, 5]].reduceRight(function(a, b) {
    return a.concat(b);
}, []);


var reverse = copyright().reverse();

var slice = copyright().slice(2);

var some = copyright().some(function(value,index,array){
	return (value>2);
},root);

var sort = copyright().sort(function(a,b){
	return a-b;
});

var splice = copyright().splice(0,1,2);

var toLocaleString = copyright().toLocaleString();

var toString = copyright().toString();

module.exports  = {
	every,fill,find,findIndex,include,indexOf,join,lastindexOf,map,reduce,reduceRight,reverse,slice,sort,splice
}
