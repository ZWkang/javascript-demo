function Maps(){
	if(!(this instanceof Maps))return new Maps();

	this.keys = [];

	this.size = function(){
		return this.keys.length;
	};
	this.isEmpty=function(){
		if(this.keys.length<0)return true;
		return false;
	};
	this.clear = function(){
		this.keys = [];
	}

	this.put = function(key,value){

		for(let i = 0 ; i<this.keys.length;i++){
			if(this.keys[i]['key']==key){
				this.keys[i]['value'] = value;
				return ;
			}
		}
		this.keys.push({
			'key':key,
			'value':value
		});
	}
	this.remove = function(key){
		for(let i = 0 ; i<this.keys.length;i++){
			if(this.keys[i]['key']==key){
				delete this.keys[i];
				return ;
			}
		}
	}
	this.get = function (key){
		for(let i = 0 ; i<this.keys.length;i++){
			if(this.keys[i]['key']==key){
				return this.keys[i]['value']
			}
		}
	}
	this.containsKey = function(key){
		for(let i = 0 ; i<this.keys.length;i++){
			if(this.keys[i]['key']==key){
				return true
			}
		}
		return false;
	}
	this.containsValue = function(value){
		for(let i = 0 ; i<this.keys.length;i++){
			if(this.keys[i]['value']==value){
				return true
			}
		}
		return false;
	}
	this.indexNum = function(key){
		for(let i = 0 ; i<this.keys.length;i++){
			if(this.keys[i]['key']==key){
				return i
			}
		}
		return false;
	}
	this.valuelist = function(){
		var arr = [];
		for(let i = 0 ; i<this.keys.length;i++){
			arr.push(this.keys[i]['value']);
		}
		return arr;
	}
	this.keylist = function(){
		var arr = [];
		for(let i = 0 ; i<this.keys.length;i++){
			arr.push(this.keys[i]['key']);
		}
		return arr;
	}
}

