// 题目描述
// 已知某公司总人数为W，平均年龄为Y岁(每年3月末计算，同时每年3月初入职新人)，假设每年离职率为x，x>0&&x<1,每年保持所有员工总数不变进行招聘，新员工平均年龄21岁。 
// 从今年3月末开始，请实现一个算法，可以计算出第N年后公司员工的平均年龄。(最后结果向上取整)。
// 输入描述:
// 输入W Y x N
// 输出描述:
// 输出第N年后的平均年龄
// 示例1
// 输入

// 5 5 0.2 3
// 输出

// 15

var readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
rl.on('line', function(line) {
  var tokens = line.split(' ')
  var x = changef(tokens[2])
  var W = change(tokens[0])
  var Y = change(tokens[1])
  var N = change(tokens[3])
  
  for(var i =0;i<N;i++){
      Y = (1-x)*(Y+1)+21*x;
  }
  console.log(Math.ceil(Y))
  
})
function change(str){
    return parseInt(str,10)
    
}
function changef(str){
    return parseFloat(str,10)
}