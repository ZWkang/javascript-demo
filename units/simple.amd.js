const CONFIG = {
	isAutoFixJs:true
}
const MODULE_NOT_FOUND = -1;
const MODULE_LOADING = 3;
const MODULE_DONE = 4;


console.log = function(...arg){
	console.log(`%c${arg}`,'color:back;font-weight:bold;')
}
console.error = function(...arg){
	console.error(`%c${arg}`,`color:red;font-weight:bold;`)
}
console.info = function(...arg){
	console.info(`%c${arg}`,`color:green;`)
}

//load function 

function CreateLoad (url){
	let scrContainer = document.createElement('script');
	let head = document.querySelector('head');
	scrContainer.src = url;
	head.appendChild(scrContainer)

}
const helpis = (obj,param)=>{
	return Object.prototype.toString.call(obj) === `[object ${param}]`;
}
const regexpList = []
const NowPath = window.location.origin;
//fix deps path
const pathname = window.location.pathname;
const pathnameList = pathname.split('/').map((a,index,obj)=>{
	// return a !== '' &&
	if(index == obj.length-1){
		return !(/'js|php|html|jsp|asp|css'/.test(a)) && a !== '';
	}
	return a !== '';
})
const isIndex = (pathname === '');
function resolvePath(filename,url = NowPath){
	// url = window.location.origin;

	// let NowPath = window.location.origin;

	if(url.test(/^[http|https]/)){
		return url;
	}
	if(url.test(/^\.(?=\.)/) && isIndex){
		throw new TypeError('path first must not a ..');
	}
	let pathList = pathname.split('/');
	let nowpath = pathnameList.slice(0);
	for(let i of pathList){
		if(i === '..'){
			if(nowpath.length ==0){
				throw new TypeError('too much ..');
			}
			nowpath.length  = nowpath.length - 1 ;
		}else if ( i === '.' ){
		}else{
			nowpath.push(i);
		}
	}
	return nowpath.reduce((a,b)=>{
		return a+'/'+b;
	},NowPath+'/')
}

function pathToHash(string){
	return string.split('').reduce((a,b)=>{
		return a + b.toString().charCodeAt()
	},'');
}
//

/**
 * 模块存放位置
 */
const MODULES = {
	NAME:'xx.js',
	dependeni : [],
	node
}
const CACHE_MODULES = {
	'123123123123123':{}
}
const getRequireRegExp = /=(\s+)require(\s*)(?=\(\s*['|"]([\w|\s|\.]+)['|"])/;

function fixdepList(){

}
//fix loop deps



KLoader.defined = function(moduleName,depsList,callback){
	if(arguments.length ==1){
		if(typeof moduleName == 'String'){
			return {};
		}
	}
	if(arguments.length ==2){

	}

	//fix CommondJS
	
}


KLoader.require = function(name){
	let path = resolvePath();
	let pathHash = pathToHash(path);

	if(CACHE_MODULES[pathHash]){
		console.error(`the module doesn't load`);
		return {};
	}
	
	return CACHE_MODULES[pathHash];
}

KLoader.load = function(url){
	let link = resolvePath(url);
	let node = document.createElement('script');
	let head = document.createElement('head')[0];


	// let supportOnload
	node.charset = 'utf-8';
	node.type = 'text/javascript';
	node.onload = function(){

	}
	node.onerror = function(){

	}
	node.src = url;
	// node.src = 'test.js'

	head.appendChild(node);
}

























// function parseToMoney(money){
// 	if(/^[0-9]*(\.[0-9]*.)/.test(123.123))return throw new TypeError('error')
// 	var str = money.toString()
// 	var temp = str.split('.')
// 	temp[0].reduce(()=>{})
// }


function parseToMoney(money){
	if(Number(money)!==money)throw new TypeError('error type')
	var str = money.toString()
	var temp =   str.split('.')
	var _temp = temp[0].split('').reverse().join('')
	while(/\d{4}?/.test(_temp)){
		_temp = _temp.replace(/(\d{3})(?=\d)/,function(word){
			return RegExp.$1+','
		})
	}
	// console.log(_temp)
	if(!!temp[1]){
		temp[0] =  _temp.split('').reverse().join('')
	}
	
	return temp.join('.')
}
console.log(parseToMoney(13112111123))
// function parseToMoney(money){
// 	if(Number(money)!==money)throw new TypeError('error type')
// 	var temp = money.toString()
// 	var str = temp.split('.')[0]
// 	str = str.split('').reverse().join('')
// 	console.log(str)
// 	while(!(/\,\d{3}\./.test(str)||/\,\d{3}$/.test(str))){
// 		str = str.replace(/(\d{3})(?=\d)(!\.\d+)*/,function(){return RegExp.$1+','})
// 	}
// 	return str.split('').reverse().join('')
// }
console.log(parseToMoney(13112111123))