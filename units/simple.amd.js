//load function 
function CreateLoad (url){
	let scrContainer = document.createElement('script');
	let head = document.querySelector('head');
	scrContainer.src = url;
	head.appendChild(scrContainer)

}

//fix deps path
function resolvePath(url){
	let NowPath = window.location.origin
	let obj = {
		step:
	}
	if(url.test(/(http|https)/)){

	}

}
//

//fix loop deps






























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