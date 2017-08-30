// 从上往下打印出二叉树的每个节点，同层节点从左至右打印。

function PrintFromTopToBottom(root)
{
    // write code here
    if(!root){return []}
    var a = [],temp
    a.push(root)
    var d = []
    while(a.length!=0){
        temp = a.shift()
        d.push(temp.val)
       	if(temp.left){
            a.push(temp.left)
        }
        if(temp.right){
            a.push(temp.right)
        }
    }
    return d
}

//思路
//建立一个队列先进先出。来做辅助
通过每次while循环输入这个队列。将结果valuepush进数组
从而实现从此遍历
O(n)