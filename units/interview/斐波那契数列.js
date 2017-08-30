var result = []
function Fibonacci(n)
{
    // write code here
    
    if(n==0){
        return 0
    }
    if(n==2||n==1){
        return 1
    }
    if(result[n]){
        return result[n]
    }
    result[n] = Fibonacci(n-1)+Fibonacci(n-2)
    return result[n]
}
// 大家都知道斐波那契数列，现在要求输入一个整数n，请你输出斐波那契数列的第n项。
// n<=39