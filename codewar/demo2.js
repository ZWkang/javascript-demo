// Welcome. In this kata, you are asked to square every digit of a number.

// For example, if we run 9119 through the function, 811181 will come out.

// Note: The function accepts an integer and returns an integer


function squareDigits(num){
  //may the code be with you
  var c = num.toString();
  var ccc ='';
  for (var i in c){
    var ttt = parseInt(c[i]);
    var ccc = ccc + (ttt*ttt).toString();
  }
  return parseInt(ccc);
}