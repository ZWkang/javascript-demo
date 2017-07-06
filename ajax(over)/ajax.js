function ajax(type,url,data,async,cache=true){
	return new Promise(function(resolve,reject){
		let xhr;
		if(window.XMLHttpRequest){
			xhr = new XMLHttpRequest();
		}else{
			xhr = new ActiveXObject('Microsoft.XMLHttp');
		}
		type = type.toUpperCase();
		if(type ==='GET'){
			let cacheA  = [];
			for (let i in data){
				cacheA.push(i+'='+data[i]);
			}
			if(cache){
				cacheA.push(new Date().getTime()+"=1");
			}
			if(url.indexOf("?")>-1){
				url += '&'+cacheA.join('&');
			}else{
				url += '?'+cacheA.join('&');
			}
			
			cache = null;
			xhr.open(type,url,async);
			xhr.setRequestHeader("Content-type","application/json");
			xhr.send();

		}else if(type==='POST'){
			if(url.indexOf("?")>-1&&cache){
				url += '&'+(new Date().getTime()+"=1");
			}
			xhr.open(type,url,async);
			xhr.setRequestHeader("Content-type","application/json");
			xhr.send(JSON.stringify(data));
		}else{
			reject('error type')
		}
		xhr.onreadystatechange=function(){
			console.log(xhr.readyState,xhr.status)
			if(xhr.readyState==4 ){
				if(xhr.status==200){
					let obj = xhr.response;
					if(typeof obj !=='object'){
						obj = JSON.parse(obj);
					}
					resolve(obj);
				}else{
					reject('status error');
				}
			}
		}
	});
}