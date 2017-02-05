Check to see if a string has the same amount of 'x's and 'o's. The method must return a boolean and be case insensitive. The string can contains any char.

Examples input/output:

XO("ooxx") => true
XO("xooxx") => false
XO("ooxXm") => true
XO("zpzpzpp") => true // when no 'x' and 'o' is present should return true
XO("zzoo") => false


function XO(str) {
    //code here
    str = str.toLowerCase();
    var a = 0;
    var c = 0;
    for(var i in str){
       if(str[i]=='x'){
          a++
       }
       if(str[i]=='o'){
          c++
       }
    }
    if(a==c){return true;}else{return false;}
}


function XO(str) {
  let x = str.match(/x/gi);
  let o = str.match(/o/gi);
  return (x && x.length) === (o && o.length);
}


const XO = str => {
  str = str.toLowerCase().split('');
  return str.filter(x => x === 'x').length === str.filter(x => x === 'o').length;
}


function XO(str) {
    var a = str.replace(/x/gi, ''),
        b = str.replace(/o/gi, '');
    return a.length === b.length;
}


function XO(str) {
  return str.replace(/o/ig, '').length == str.replace(/x/ig, '').length
}