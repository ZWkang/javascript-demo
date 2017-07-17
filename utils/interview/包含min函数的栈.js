//简单在js用数组模拟栈

// 定义栈的数据结构，请在该类型中实现一个能够得到栈最小元素的min函数。

var a=[]
function push(node)
{
    // write code here
    a.push(node)
    
}
function pop()
{
    // write code here
    a.pop()
}
function top()
{
    // write code here
    if(a.length==0){return -1}
    a.unshift()
}
function min()
{
    // write code here
    if(a.length==0){return -1}
    return Math.min.apply(Math,a);
}
module.exports = {
    push : push,
    pop : pop,
    top : top,
    min : min
};



// 思路：用一个栈data保存数据，用另外一个栈min保存依次入栈最小的数
// 比如，data中依次入栈，5,  4,  3, 8, 10, 11, 12, 1
//        则min依次入栈，5,  4,  3，no,no, no, no, 1
 
// no代表此次不如栈
// 每次入栈的时候，如果入栈的元素比min中的栈顶元素小或等于则入栈，否则不如栈。
 