// 输入一个链表，从尾到头打印链表每个节点的值。
//链表

/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function printListFromTailToHead(head)
{
    // write code here
    var a = []
    while (head!=null){
        a.push(head.val)
        head = head.next
    }
    a.reverse()
    return a
}