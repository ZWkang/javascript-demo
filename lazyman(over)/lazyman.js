(function(){
	function LazyMan(_name){

		return new _lazyman(_name);

	}
	function _lazyman(_name){
		this.task=[];
		var self = this;
		var fn = function(){
			console.log('Hi this is ' +_name);
			self.next();
		};
		this.task.push(fn);
		setTimeout(function(){
			self.next();
		},0);
		return this;
	}
	_lazyman.prototype.sleep=function(time){
		var self = this,
			name = this.names;
		var fn = function(){
			setTimeout(function(){
				console.log('wake up after '+time);
				self.next();
			},time*1000);
		};
		this.task.push(fn);
		return this;
	};
	_lazyman.prototype.eat=function(food){
		var self = this,
			_food = food;
		var fn = function(){
			
				console.log('Eat '+_food);
				self.next();
			
		};
		this.task.push(fn);
		return this;
	};
	_lazyman.prototype.sleepFirst=function(time){
		var self = this,
			_time = time;
		var fn = function(){
			setTimeout(function(){
				console.log('wake up after '+_time);
				self.next();
			},_time*1000);
		};
		this.task.unshift(fn);
		return this;
	};
	_lazyman.prototype.next=function(){
		if(this.task.length==0)return;
		var fn = this.task.shift();
		fn();
		// console.log(fn);
	};

	LazyMan("Hank");
	// LazyMan("Hank").sleepFirst(5).eat("supper");
	// LazyMan("Hank").eat("dinner").eat("supper");
	// LazyMan("Hank").LazyMan("Hank").sleep(20).eat("dinner")
})();