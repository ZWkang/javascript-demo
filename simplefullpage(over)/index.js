(function(){
	window.onload=function(){
		var throttle = function(fn,delaytime){
			var wait = false;
			return function(){
				var that = this , args = arguments;
				if(!wait){
					wait = true;
					setTimeout(function(){
						fn.apply(that,args);
						wait = false;
					},delaytime);
				}
			}
		}
		function fullPage(option){
			if(!(this instanceof fullPage))return new fullPage();

			var pageindex = 0;
			
			var container = option&&option['container']||'.container';
			var sections = option&&option['sections']||container+' > div';
			var len ;

			this.init=function(){
				this.ele = document.querySelector(container);
				this.sections = document.querySelectorAll(sections);
				len = this.sections.length;
				return this;
			}
			this.goSection=function(){
				this.ele.style.transform = 'translateY(-'+(pageindex*100)+'%)';
			}
			this.upSection =function(){
				if(pageindex<=0)return;
				pageindex--;
			}
			this.downSection = function(){
				if(pageindex>=len-1)return;
				pageindex++;
			}

			return this.init();
		}
		var f = new fullPage();
		
		function wheelaction(e){
			if((e.wheelDelta || -e.detail) <0){
				f.downSection();
				f.goSection();
			}else{
				f.upSection();
				f.goSection();
			}
		}
		document.addEventListener('wheel',throttle(wheelaction,1000))

	}



})();