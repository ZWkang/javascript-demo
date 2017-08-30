// 输入一个链表，反转链表后，输出链表的所有元素。

function ReverseList(pHead)
{
    // write code here
    if(!pHead||pHead.next==null){
        return pHead
    }
    var a = []
    while (pHead!=null){
        a.push(pHead)
        pHead = pHead.next
    }
    var _temp =temp= a.pop()//保存一个引用来return
    while(a.length!=1){
        temp.next = a.pop()
        temp = temp.next
    }
    var c = a.pop()
    c.next = null
    temp.next = c
    return _temp
}

// 运行时间：90ms
// 占用内存：8052k