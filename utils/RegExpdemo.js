function parseToMoney(money){
	if(Number(money)!==money)throw new TypeError('error type')
	var str = money.toString()
	while(!(/\,\d{3}\./.test(str)||/\,\d{3}$/.test(str))){
		str = str.replace(/(\d{3})(?=\d)(!\.\d+)*/,function(){return RegExp.$1+','})
	}
	return str;
}
console.log(parseToMoney(1123123.123123123))