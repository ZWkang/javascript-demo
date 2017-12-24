// 合并两个排序的链表
// 输入两个单调递增的链表，输出两个链表合成后的链表，当然我们需要合成后的链表满足单调不减规则。

递归
function Merge(pHead1, pHead2)
{
    // write code here
    if(pHead1==null){
        return pHead2
    }
    if(pHead2==null){
        return pHead1
    }
    if(pHead1.val<=pHead2.val){
        pHead1.next = Merge(pHead1.next,pHead2) 
        return pHead1
    }else{
        pHead2.next = Merge(pHead1,pHead2.next)
        return pHead2
    }
    
}





