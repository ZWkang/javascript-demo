// 输入两个整数序列，
// 第一个序列表示栈的压入顺序，请判断第二个序列是否为该栈的弹出顺序。假设压入栈的所有数字均不相等。
// 例如序列1,2,3,4,5是某栈的压入顺序，序列4，5,3,2,1是该压栈序列对应的一个弹出序列，
// 但4,3,5,1,2就不可能是该压栈序列的弹出序列。
// （注意：这两个序列的长度是相等的）

function IsPopOrder(pushV, popV)
{
    // write code here
    var a = []
    if(popV.length==0&&pushV.length==0){return true}
    var i=0,j=0
    while(i<pushV.length){
        a.push(pushV[i++])
        while(j<popV.length&&a[a.length-1]== popV[j]){
            a.pop()
            ++j
        }
    }
    return a.length==0
}

//思路 建立一个辅助栈

