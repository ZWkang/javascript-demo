/**
* 这是一个用来练习正则的小仓库
*/

//千分号
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