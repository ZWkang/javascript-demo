// function solution(number){
//   // convert the number to a roman numeral
//         var alpha = [ 'I', 'V', 'X', 'L', 'C', 'D', 'M' ], roman = "", bit = 0;
//         while (number > 0){  
//             var tempnum = number % 10;
//             switch (tempnum){  
//                 case 3:{   
//                     roman = alpha[bit] + roman;  
//                     tempnum--;
//                 }  
//                 case 2:{  
//                     roman = alpha[bit] + roman;  
//                     tempnum--;
//                 }  
//                 case 1:{  
//                     roman = alpha[bit] + roman;  
//                     break;  
//                 }  
//                 case 4:{  
//                     roman = alpha[bit + 1] + roman;
//                     roman = alpha[bit] + roman;  
//                     break;  
//                 }  
//                 case 8:{  
//                     roman = alpha[bit] + roman; 
//                     tempnum--;
//                 }  
//                 case 7:{  
//                     roman = alpha[bit] + roman; 
//                     tempnum--;
//                 }  
//                 case 6:{  
//                     roman = alpha[bit] + roman;  
//                     tempnum--;
//                 }  
//                 case 5:{  
//                     roman = alpha[bit + 1] + roman;  
//                     break;  
//                 }  
//                 case 9:{ 
//                     roman = alpha[bit + 2] + roman; 
//                     roman = alpha[bit] + roman; 
//                     break;  
//                 }  
//                 default:{  
//                     break;  
//                 }  
//             }  
//             bit += 2;  
//             number = Math.floor(number / 10);  
//         }  
//         return roman;
// }



Create a function taking a positive integer as its parameter and returning a string containing the Roman Numeral representation of that integer.

Modern Roman numerals are written by expressing each digit separately starting with the left most digit and skipping any digit with a value of zero. In Roman numerals 1990 is rendered: 1000=M, 900=CM, 90=XC; resulting in MCMXC. 2008 is written as 2000=MM, 8=VIII; or MMVIII. 1666 uses each Roman symbol in descending order: MDCLXVI.

Example:

solution(1000); // should return 'M'
Help:

Symbol    Value
I          1
V          5
X          10
L          50
C          100
D          500
M          1,000
Remember that there can't be more than 3 identical symbols in a row.


https://www.codewars.com/kata/51b62bf6a9c58071c600001b/train/javascript




function solution(number){
  // convert the number to a roman numeral
var  roman = {M:1000,CM:900, D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1 }

var ans = '';
while(number>0){
    for(a in roman){ 
        if(roman[a]<=number){ ans += a; number-=roman[a]; break;}
            
    }
}
return ans;
}


function solution(number){
  return [
    { threshold: 1000, char: 'M'},
    { threshold: 900,  char: 'CM'},
    { threshold: 500,  char: 'D'},
    { threshold: 400,  char: 'CD'},
    { threshold: 100,  char: 'C'},
    { threshold: 90,   char: 'XC'},
    { threshold: 50,   char: 'L'},
    { threshold: 40,   char: 'XL'},
    { threshold: 10,   char: 'X'},
    { threshold: 9,    char: 'IX'},
    { threshold: 5,    char: 'V'},
    { threshold: 4,    char: 'IV'},
    { threshold: 1,    char: 'I'}
  ].reduce(function(prev, curr, idx, arr)
  {
    while(number >= curr.threshold)
    {
      prev += curr.char;
      number -= curr.threshold;
    }
    
    return prev;
  }, '');
}