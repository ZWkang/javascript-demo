// This kata is to practice simple string output. Jamie is a programmer, and James' girlfriend. She likes diamonds, and wants a diamond string from James. Since James doesn't know how to make this happen, he needs your help.

// Task:

// You need to return a string that displays a diamond shape on the screen using asterisk ("*") characters. Please see provided test cases for exact output format.

// The shape that will be returned from print method resembles a diamond, where the number provided as input represents the number of *’s printed on the middle line. The line above and below will be centered and will have 2 less *’s than the middle line. This reduction by 2 *’s for each line continues until a line with a single * is printed at the top and bottom of the figure.

// Return null if input is even number or negative (as it is not possible to print diamond with even number or negative number).

// Please see provided test case(s) for examples.

// Python Note

// Since print is a reserved word in Python, Python students must implement the diamond(n) method instead, and return None for invalid input.

// JS Note

// JS students, like Python ones, must implement the diamond(n) method, and return null for invalid input.

https://www.codewars.com/kata/5503013e34137eeeaa001648/solutions/javascript


function diamond(n){
  if(n<=2){return null;}
  if(n%2==0){return null;}
  var diam = '';
  if(n%2==1){
                  var num = (n+1)/2;
                  for(var i=1;i<=num;i++){
                           var _arr = new Array(num-i+1);
                           var _xing = new Array(i*2);
                           diam = diam+_arr.join(' ')+_xing.join('*')+'\n';
                  }
                  for(var z=num-1;z>0;z--){
                           var _arr = new Array(num-z+1);
                           var _xing = new Array(z*2);
                           diam = diam+_arr.join(' ')+_xing.join('*')+'\n';
                  }
  }
  return diam;
}


function diamond(n){
  if (n < 0 || n % 2 == 0) return null;
  for (var i = 0, diamond = ''; i < n; i++) {
    var stars = n - Math.abs(n - 2*i - 1);
    var spaces = (n - stars) / 2;
    while (spaces-- > 0) diamond += ' ';
    while (stars-- > 0) diamond += '*';
    diamond += '\n';
  }
  return diamond;
}

function diamond(n){
  if (n < 0 || !(n % 2)) return null; 
  const middleIndex = Math.floor(n / 2);
  
  return Array.apply(null, {length: n})
      .map((el, index) => {
        const indentation = Math.abs(index - middleIndex);
        const numberOfAsterisks = n - indentation * 2;
        return Array(indentation + 1).join(' ') + Array(numberOfAsterisks + 1).join('*');
      })
      .join('\n') + '\n';
}

