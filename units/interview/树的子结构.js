// 树的遍历我们一般可以用递归做
// 输入两棵二叉树A，B，判断B是不是A的子结构。（ps：我们约定空树不是任意一个树的子结构


function HasSubtree(pRoot1, pRoot2)
{
    // write code here
    if(!pRoot1||!pRoot2){return false}//若两棵树中的一个根节点为空，就返回false  
    return IsSubtree(pRoot1,pRoot2)||HasSubtree(pRoot1.left,pRoot2)||HasSubtree(pRoot1.right,pRoot2)
    //判断从pRoot1和pRoot2开始子树是否完全相同，若相同就结束程序。
    //当pRoot1和pRoot2不完全匹配时，判断A的左子树是否包含B，若包含就返回true，结束程序。 
    //当A的左子树不包括B时，判断A的右子树是否包含B。
}
function IsSubtree(pRoot1,pRoot2){
    if(!pRoot2){return true}//若B的节点匹配完毕，就结束判断，返回true  
    if(!pRoot1){return false}//若A的节点为空,就返回false，因为B的节点非空  
    if(pRoot1.val==pRoot2.val){//若两者相等，就继续判断子节点是否一致。  
        return IsSubtree(pRoot1.left,pRoot2.left)&&IsSubtree(pRoot1.right,pRoot2.right);  
    }else{
        return false//当节点不一致时，就返回false。  
    }
}