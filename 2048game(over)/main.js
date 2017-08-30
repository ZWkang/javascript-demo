	(function(){
		function game(){
			this.arr = [];
			this.cur_queue = null;
			this.max_value = 0;
			this.direction = 0;
			this.score = 0;
			this.spaceCache = [];
			this._row = 4;
			this._col = 4;
			this._flag = true;
			this._parent_ele=null;
		}
		game.prototype.init=function(obj){
			if(typeof obj !='object'||obj instanceof Array){
				throw new TypeError('type error');
			}
			this._parent_ele=obj.parentChile;
			this.arr = obj._arr;
			this.printList();
		}
		game.prototype.isFull=function(){
			for(var row = 0;row<4;row++){
				for(var col = 0;col<4;col++){
					if(this.arr[row][col]==0){
						return false;
					}
				}
			}
			return true;
		};
		game.prototype.ramdonBlock=function(){
			this.getSpace();
			var randomNum = this.spaceCache[Math.floor(Math.random()*spaceCache.length)];
			this.arr[randomNum[0]][randomNum[1]]=2;
			randomNum=null;
		};
		game.prototype.getSpace=function(){
			this.spaceCache = [];
			for(var row = 0;row<4;row++){
				for(var col = 0;col<4;col++){
					if(this.arr[row][col]==0){
						this.spaceCache.push([row,col]);
					}
				}
			}
		};
		game.prototype.cango=function(flag){

			switch(flag){
				case 'left':
					for(var row = 0;row<4;row++){
						for(var col=1;col<4;col++){
							if(this.arr[row][col]!=0){
								if(this.arr[row][col-1]==0||this.arr[row][col]==this.arr[row][col-1]){
									return true;
								}
							}
						}
					}
					return false;
				case 'right':
					for(var row=0;row<4;row++){
						for(var col=2;col>=0;col--){
							if(this.arr[row][col]!=0){
								if(this.arr[row][col+1]==0||this.arr[row][col]==this.arr[row][col+1]){
									return true;
								}
							}
						}
					}
					return false;
				case 'up':
					for(var row=1;row<4;row++){
						for(var col=0;col<4;col++){
							if(this.arr[row][col]!=0){
								if(this.arr[row-1][col]==0||this.arr[row][col]==this.arr[row-1][col]){
									return true;
								}
							}
						}
					}
					return false;
				case 'down':
					for(var row=0;row<3;row++){
						for(var col=0;col<4;col++){
							if(this.arr[row][col]!=0){
								if(this.arr[row+1][col]==0||this.arr[row][col]==this.arr[row+1][col]){
									return true;
								}
							}
						}
					}
					return false;

			}
		};
		// game.prototype.
		game.prototype.move = function(flag){
			switch(flag){
				case 'left':
					if(this.cango(flag)){
						for(var row=0;row<4;row++){
							this.moveInRow(flag,row);
						}
					}
					return this;
				case 'right':
					if(this.cango(flag)){
						for(var row=0;row<4;row++){
							this.moveInRow(flag,row);
						}
					}
					return this;
				case 'up':
					if(this.cango(flag)){
						for(var col=0;col<4;col++){
							this.moveInCol(flag,col);
						}
					}
					return this;
				case 'down':
					if(this.cango(flag)){
						for(var col=0;col<4;col++){
							//console.log(00);
							this.moveInCol(flag,col);
						}
					}
					return this;

			}


		};

		game.prototype.moveInRow=function(flag,row){
			switch(flag){
				case 'left':
					for(var col = 0;col<=2;col++){
						nextCol = this.getNext(flag,row,col);
						if(nextCol ==-1){
							
						}else{
							if(this.arr[row][col]==0){
								this.arr[row][col] = this.arr[row][nextCol];
								this.arr[row][nextCol] = 0;
								col--;
							}else if(this.arr[row][col]==this.arr[row][nextCol]){
								this.arr[row][col] *=2;
								this.arr[row][nextCol]= 0;
								this.score = (this.score>this.arr[row][col])?this.score:this.arr[row][col];
							}
						}
					}
					break;
				case 'right':
					for(var col=3;col>0;col--){
						nextCol = this.getNext(flag,row,col);
						if(nextCol==-1){
							
						}else{
							if(this.arr[row][col]==0){
								this.arr[row][col]=this.arr[row][nextCol];
								this.arr[row][nextCol]=0;
								col++;
							}else if(this.arr[row][col]==this.arr[row][nextCol]){
								this.arr[row][col]*=2;
								this.arr[row][nextCol]=0;
								this.score = (this.score>this.arr[row][col])?this.score:this.arr[row][col];
							}
						}
					}
					break;
			}
		};
		game.prototype.moveInCol=function(flag,col){
			switch(flag){
				case 'up':
					for(var row=0;row<3;row++){
						nextRow=this.getNext(flag,row,col);
					
					if(nextRow==-1){
						
					}else{
						if(this.arr[row][col]==0){
							this.arr[row][col]=this.arr[nextRow][col];
							this.arr[nextRow][col]=0;
							row--;
						}else if(this.arr[row][col]==this.arr[nextRow][col]){
							this.arr[row][col]*=2;
							this.arr[nextRow][col]=0;
							this.score = (this.score>this.arr[row][col])?this.score:this.arr[row][col];
						}
					}}
					break;
				case 'down':
					for(var row=3;row>0;row--){
						nextRow = this.getNext(flag,row,col);
						if(nextRow==-1){
							break;
						}else{
							if(this.arr[row][col]==0){
								this.arr[row][col]=this.arr[nextRow][col];
								this.arr[nextRow][col]=0;
								row++
							}else if(this.arr[row][col]==this.arr[nextRow][col]){
								this.arr[row][col]*=2;
								this.arr[nextRow][col]=0;
								this.score = (this.score>this.arr[row][col])?this.score:this.arr[row][col];
							}
						}
					}
					break;
			}
		};
		game.prototype.getNext=function(flag,row,col){
			switch(flag){
				case 'left':
					for(var i = col+1;i<4;i++){
						if(this.arr[row][i] != 0){
							return i;
						}
					}
					return -1;
				case 'right':
					for(var i =col-1;i>=0;i--){
						if(this.arr[row][i]!=0){
							return i ;
						}
					}
					return -1;
				case 'up':
					for(var i=row+1;i<4;i++){
						if(this.arr[i][col]!=0){
								return i;
						}
					}
					return -1;
				case 'down':
					for(var i=row-1;i>=0;i--){
						if(this.arr[i][col]!=0){
							return i;	
						}	
					}		
					return -1;	
			}
		};
		game.prototype.printList=function(){
			var tempString ='';
			for(var i =0;i<4;i++){
				for (var col=0;col<4;col++){
					if(this.arr[i][col]>0){
						string = arr[i][col];
					}else{
						string='';
					}
					tempString+='<div class="item'+this.arr[i][col]+'">'+string+'</div>';
				}
			}
			// return tempString;		
			this._parent_ele.innerHTML = tempString;
		};
		game.prototype.isGameOver=function(){
			if(!this.isFull())return false;
			//判断是否满了

			for(var row=0;row<4;row++){
				for(var col=0;col<4;col++){
					
					if(col<3){/*检查右侧相邻*/
						if(this.arr[row][col]==this.arr[row][col+1]){
							return false;
						}
					}
					if(row<3){/*检查下方相邻*/
						if(this.arr[row][col]==this.arr[row+1][col]){
							return false;
						}
					}
				}
			}
			return true;
		};
		game.prototype.showArr=function(){
			for(var i=0;i<4;i++){
				console.log(this.arr[i]+'\n');
			}
		};
		//调试用


	})();