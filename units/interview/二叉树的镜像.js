// 操作给定的二叉树，将其变换为源二叉树的镜像。

// 后序遍历的一个变型：递归地交换孩子节点的左右孩子，再交换自己的左右孩子


function Mirror(root)
{
    // write code here

    if(root!=null){
        Mirror(root.left)
        Mirror(root.right)
        
        temp = root.left
        root.left = root.right
        root.right = temp
    }else{
        return
    }
}