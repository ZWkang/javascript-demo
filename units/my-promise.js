function Promise(executor){
    let that = this
    that.PromiseResolveChain = []
    that.PromiseRejectChain = []
    that.status = 'pending'
    that.data = undefined
    function resolve(value){
        if(that.status=== 'pending'){
            that.status = 'resolved'
            that.data = value
            for(let i=0;i<that.PromiseResolveChain.length;i++){
                self.PromiseResolveChain[i](value)
            }
        }
    }
    function reject(reason){
        if(that.status=== 'pending'){
            that.status = 'resolved'
            that.data = value
            for(let i=0;i<that.PromiseResolveChain.length;i++){
                self.PromiseResolveChain[i](value)
            }
        }
    }

    try {
        executor(resolve,reject)
    } catch (error) {
        reject(error)
    }

    
}
Promise.prototype.then=function(){
    
}
