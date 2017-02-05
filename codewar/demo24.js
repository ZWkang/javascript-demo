//经典动态规划

// function longestSlideDown (pyramid) {
//     var f = new Array(1000);
//     var l = pyramid.length;
// 	  for (var i=0;i<l;i++){
// 		    f[i]=pyramid[l-1][i];
//     }
// 	  for (var z=l-1-1;z>=0;z--){
// 		    for (var j=0;j<=z;j++){
// 			  f[j]=Math.max(f[j],f[j+1])+pyramid[z][j];}
//     }
//     return f[0]
// }


// https://www.codewars.com/kata/pyramid-slide-down/javascript


// Description:

// Lyrics...

// Pyramids are amazing! Both in architectural and mathematical sense. If you have a computer, you can mess with pyramids even if you are not in Egypt at the time. For example, let's consider the following problem. Imagine that you have a plane pyramid built of numbers, like this one here:

//    /3/
//   \7\ 4 
//  2 \4\ 6 
// 8 5 \9\ 3
// Here comes the task...

// Let's say that the 'slide down' is a sum of consecutive numbers from the top to the bottom of the pyramid. As you can see, the longest 'slide down' is 3 + 7 + 4 + 9 = 23

// Your task is to write a function longestSlideDown (in ruby: longest_slide_down) that takes a pyramid representation as argument and returns its' longest 'slide down'. For example,

// By the way...

// My tests include some extraordinarily high pyramides so as you can guess, brute-force method is a bad idea unless you have a few centuries to waste. You must come up with something more clever than that.

// (c) This task is a lyrical version of the Problem 18 and/or Problem 67 on ProjectEuler.


// function longestSlideDown (pyramid) {
//   return pyramid.reduceRight((last,current)=>current.map(
//     (v,i)=>v+Math.max(last[i],last[i+1])
//   ))[0];
// }

// function longestSlideDown (pyramid) {
//   for (var i = pyramid.length - 2; i > -1; i--) {
//     for (var j = 0; j < pyramid[i].length; j++) {
//       pyramid[i][j] += Math.max(pyramid[i + 1][j], pyramid[i + 1][j + 1]);
//     }
//   }
//   return pyramid[0][0];
// }