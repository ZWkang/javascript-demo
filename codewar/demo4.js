
// Implement the function unique_in_order which takes as argument a sequence and returns a list of items without any elements with the same value next to each other and preserving the original order of elements.

// For example:

// uniqueInOrder('AAAABBBCCDAABBB') == ['A', 'B', 'C', 'D', 'A', 'B']
// uniqueInOrder('ABBCcAD')         == ['A', 'B', 'C', 'c', 'A', 'D']
// uniqueInOrder([1,2,2,3,3])       == [1,2,3]




var uniqueInOrder=function(iterable){
  //your code here - remember iterable can be a string or an array
  if(iterable instanceof Array){
    iterable = iterable.join('');
  }
var a =[];
  if(iterable==''){
    return a;
  }
  var a = [];
  var b= iterable[0];
      if(typeof parseInt(b) =='number'&& !isNaN(parseInt(b))){
        a.push(parseInt(b));
      }else{
        a.push(b);
      }
  
  for(var i=1;i<iterable.length;i++){
    if(b!=iterable[i]){
      b=iterable[i];
      if(typeof parseInt(b) =='number' && !isNaN(parseInt(b))){
        a.push(parseInt(b));
      }else{
        a.push(b);
      }
    }
  }

  return a;


  function uniqueInOrder(it) {
  var result = []
  var last
  
  for (var i = 0; i < it.length; i++) {
    if (it[i] !== last) {
      result.push(last = it[i])
    }
  }
  
  return result
}



var uniqueInOrder = function (iterable)
{
  return [].filter.call(iterable, (function (a, i) { return iterable[i - 1] !== a }));
}


var uniqueInOrder=function(iterable){
  return Array.prototype.reduce.call(iterable, function(a,b) { if (a[a.length-1] !== b) a.push(b); return a; }, []);
}


var uniqueInOrder=function(iterable){
  var result = [];
  for (var i = 0; i < iterable.length; i++) {
    if (iterable[i-1] === undefined || iterable[i-1] !== iterable[i]) {
      result.push(iterable[i]);
    }
  }
  return result;
}


https://www.codewars.com/kata/54e6533c92449cc251001667/solutions/javascript