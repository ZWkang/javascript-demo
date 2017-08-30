// 输入一个矩阵，按照从外向里以顺时针的顺序依次打印出每一个数字，
// 例如，如果输入如下矩阵： 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 则依次打印出数字1,2,3,4,8,12,16,15,14,13,9,5,6,7,11,10.
function printMatrix(matrix)
{
    // write code here
    var row = matrix.length//行数
    var col = matrix[0].length//列数
    var a = []
    var round = (((row<col?row:col)-1)/2+1)|0//求出多少圈
    for(var i=0;i<round;i++){
        //向左
        for(var j=i;j<col-i;j++){
            a.push(matrix[i][j])
        }
        //向下
        for(var k=i+1;k<row-i;k++){
            a.push(matrix[k][col-i-1])
        }
        //向左
        //判断是否会重复打印(从右向左的每行数据)
        for(var m=col-i-2;(m>=i)&&(row-i-1!=i);m--){
            a.push(matrix[row-i-1][m])
        }
        //向上
        //判断是否会重复打印(从下往上的每一列数据)
        for(var n=row-i-2;(n>i)&&(col-i-1!=i);n--){
            a.push(matrix[n][i])
        }
        
    }
    return a
    
}



/*解题思路：顺时针打印就是按圈数循环打印，一圈包含两行或者两列，在打印的时候会出现某一圈中只包含一行，
要判断从左向右打印和从右向左打印的时候是否会出现重复打印，
同样只包含一列时，要判断从上向下打印和从下向上打印的时候是否会出现重复打印的情况*/
