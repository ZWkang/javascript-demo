const CONFIG = {
	isAutoFixJs:true
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

const MODULES = {
	NAME:'xx.js',
	dependeni : [],
	node
}
const CACHE_MODULES = {
	'123123123123123':{}
}

//fix loop deps


KLoader.defined = function(){

}
const getRequireRegExp = /=(\s+)require(\s*)(?=\(\s*['|"]([\w|\s|\.]+)['|"])/;

KLoader.require = function(){
	
}

KLoader.load = function(url){
	let link = resolvePath(url);
	let node = document.createElement('script');

	// let supportOnload
	node.src = 'test.js'
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