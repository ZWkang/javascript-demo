// 用两个栈来实现一个队列，完成队列的Push和Pop操作。 队列中的元素为int类型。


//思路 数组模拟栈
var a = []
var b = []
function push(node)
{
    // write code here
    a.push(node)
}
function pop()
{
    // write code here
    if(b.length==0){
        while(a.length!=0){
            b.push(a.pop())
        }
    }
    return b.pop()
    
    
}
module.exports = {
    push : push,
    pop : pop
};

// 入队：将元素进栈A
// 出队：判断栈B是否为空，如果为空，则将栈A中所有元素pop，并push进栈B，栈B出栈；
 // 如果不为空，栈B直接出栈。







// 入栈：将元素进队列A
// 出栈：判断队列A中元素的个数是否为1，如果等于1，则出队列，否则将队列A中的元素
// 以此出队列并放入队列B，直到队列A中的元素留下一个，然后队列A出队列，再把
// 队列B中的元素出队列以此放入队列A中。


var a = []
var b = []
function push(node){
	a.push(node)
}
function unshift(){
	if(a.length==1){
		return a.pop();
	}
	while(a.length!=1){
		b.push(a.unshift())
	}
	result = a.pop()
	while(b.length!=0){
		a.push(b.unshift())
	}
	return result
}