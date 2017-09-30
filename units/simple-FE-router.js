//way 1 history



//way 2 hash
function Router(){
    this.routes = {};
    this.crrentUrl = '';
}

Router.prototype.route = function(path,callback){
    this.routes[path] = callback||function(){};
}
Router.prototype.refresh = function(){
    this.currentUrl = location.hash.slice(1)||'/';
    this.routes[this.crrentUrl]();
}
Router.prototype.init = function(){
    window.addEventListener('load',this.refresh.bind(this),false);
    window.addEventListener('hashchange',this.refresh.bind(this),false);
}


