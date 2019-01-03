/**
 * @author ZWkang
 * @since 1/3/2019
 */

(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(function () {
			return factory(root);
		});
	} else if (typeof exports === 'object') {
		module.exports = factory;
	} else {
		root.KLoader = factory(root);
	}
})(this, function (root) {
	'use strict';
	const CONFIG = {
		isAutoFixJs:true
	}
	const MODULE_NOT_FOUND = 1
	const MODULE_READY = 2
	const MODULE_LOADING = 3
	const MODULE_DONE = 4

	const consoleColor = (color) => `color:${color};font-weight:bold;font-size: 16px;`

	const log = function(...arg){
		console.log(`%c${arg}`, consoleColor(`#ccc`))
	}
	const error = function(...arg){
		console.error(`%c${arg}`, consoleColor(`red`))
	}
	const info= function(...arg){
		console.info(`%c${arg}`, consoleColor(`green`))
	}

	//load function 
	function CreateLoad (url){
		console.log(url)
		return new Promise((resolve, reject) => {
			let scrContainer = document.createElement('script');
			let head = document.querySelector('head');
			scrContainer.src = url;
			scrContainer.onload = function () {
				resolve(url)
			}
			scrContainer.onerror = function (e) {
				reject(e, url)
			}
			head.appendChild(scrContainer)
		})
	}

	const helpis = (obj,param)=>{
		return Object.prototype.toString.call(obj) === `[object ${param}]`;
	}
	//fix deps path
	const regexpList = []
	const NowPath = window.location.origin;
	const pathname = window.location.pathname;
	const pathnameList = pathname.split('/').filter((a, index, obj) => {
		if(index == obj.length-1){
			return !(/'js|php|html|jsp|asp|css'/.test(a)) && a !== ''
		}
		return a !== ''
	})
	const isIndex = (pathname === '')

	function resolvePath(filename, targetLink = NowPath){
		if(/^\.(?=\.)/.test(targetLink) && isIndex){
			error('path first must not a ..')
			throw new TypeError('path first must not a ..')
		}
		let tempPath = NowPath + '/'
		let pathList = filename.split('/')
		let nowpath = pathnameList.slice(0);
		for(let i of pathList){
			if(i === '..'){
				if(nowpath.length ==0){
					throw new TypeError('too much ..')
				}
				nowpath.length  = nowpath.length - 1
			}else if ( i === '.' ){
			}else{
				nowpath.push(i)
			}
		}
		return nowpath.reduce((a,b) => `${a}/${b}`, tempPath)
	}

	function pathToHash(url){
		return resolvePath(url).split('').reduce((a,b)=>{
			return a + b.toString().charCodeAt()
		},'');
	}
	//
	let KLoader  = {}
	/**
	 * 模块存放位置
	 */
	const MODULES = {
	}
	const CACHE_MODULES = {
	}
	// 用于鉴别
	const getRequireRegExp = /=(\s+)require(\s*)(?=\(\s*['|"]([\w|\s|\.]+)['|"])/g;

	KLoader.defined = function(moduleName,depsList,callback){
		if(moduleName && !depsList &&!callback) {
			MODULES[pathToHash(moduleName)] = {}
			return
		}
		if(moduleName && helpis(depsList, 'Function')) {
			moduleName = pathToHash(moduleName);
			callback = depsList
			MODULES[moduleName] = callback()
			return
		}
		checkDeepIsCanBeUse(depsList).then(() => {
			const args = depsList.map(v => MODULES[pathToHash(v)])
			MODULES[pathToHash(moduleName)] = callback.apply(null, args)
		})
	}

	const checkDeepIsCanBeUse = (list) => {
		const listRequire = list.map(v => KLoader.require(v))
		return Promise.all(listRequire)
	}

	KLoader.require = function(name){
		let pathHash = pathToHash(name);
		if(!MODULES[pathHash]){
			return CreateLoad(name).then(v => v)
		}
		return MODULES[pathHash];
	}

	KLoader.load = function(url, callback){
		return CreateLoad(url).then((v) => {
			v = pathToHash(v)
			if (MODULES[v] === undefined) {
				MODULES[v] = {}
			}
			MODULES[v].loaded = true
			return v
		}).then(v => {
			callback(MODULES[v])
		})
	}

	return KLoader
})
