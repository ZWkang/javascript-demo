// 在一个二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。
//请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。

//思路 暴力枚举全部元素
//思路 从左下角或者右上角即可看出两方向不同
//用作移动
function Find(target, array)
{
    
	var col = array[0].length-1
        var row = 0

        while(row<=array.length-1&&col>=0){
            if(target==array[row][col]){
                return true;
            }else if(target>array[row][col]){
                row++;
            }else{
                col--;
            }
        }
        return false;
    
}