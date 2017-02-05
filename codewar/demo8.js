function triangleType(a, b, c){
  var max = Math.max(a,b,c);
  
  if (a+b+c <= 2*max) return 0;
  if (2*max*max == a*a+b*b+c*c) return 2;
  if (2*max*max >  a*a+b*b+c*c) return 3;
  return 1;
}



function triangleType(a, b, c){
  var d = [];
  d.push(a); d.push(b); d.push(c);
  console.log(d);
  var z = d.sort(function(a,b){return b-a;})
  console.log(z);
  if(z[2]+z[1]>z[0] && z[0]-z[1]<z[2]){
     if(Math.pow(z[2],2)+Math.pow(z[1],2)==Math.pow(z[0]),2){return 2}
     if(Math.pow(z[2],2)+Math.pow(z[1],2)>Math.pow(z[0]),2){return 1}
     if(Math.pow(z[2],2)+Math.pow(z[1],2)<Math.pow(z[0]),2){return 3}
  }else{
  return 0;}
}
triangleType(7,12,8);



/* Should return ᐃ type:
  0 : if ᐃ cannot be made with given sides
  1 : acute ᐃ
  2 : right ᐃ
  3 : obtuse ᐃ
*/
function triangleType(a, b, c){
  var cmp, sides = [a, b, c].sort(function (a, b) { return a - b });
  a = sides[0]; b = sides[1]; c = sides[2];
  if (a && a + b > c) {
    cmp = a * a + b * b - c * c;
    if (cmp > 0) return 1;
    if (cmp == 0) return 2;
    if (cmp < 0) return 3;
  }
  return 0;
}


/* Should return ᐃ type:
  0 : if ᐃ cannot be made with given sides
  1 : acute ᐃ
  2 : right ᐃ
  3 : obtuse ᐃ
*/
var NO_TRIANGLE = 0;
var ACUTE = 1;
var RIGHT = 2;
var OBTUSE = 3;

function triangleType(a, b, c){
  var sides = [a,b,c].sort(function(x1,x2){return x1-x2;});
  a = sides[0]; b = sides[1]; c = sides[2];
  
  if (a + b <= c) return NO_TRIANGLE;
  var a2 = a*a, b2 = b*b, c2 = c*c;
  
  if (a2 + b2 == c2) return RIGHT;
  if (a2 + b2 > c2) return ACUTE;
  return OBTUSE;
}



Description:

In this kata, you should calculate type of triangle with three given sides a, b and c (given in any order).

If all angles are less than 90°, this triangle is acute and function should return 1.

If one angle is strictly 90°, this triangle is right and function should return 2.

If one angle more than 90°, this triangle is obtuse and function should return 3.

If three sides cannot form triangle, or one angle is 180° (which turns triangle into segment) - function should return 0.

Input parameters are sides of given triangle. All input values are non-negative floating point or integer numbers (or both).


Acute

Right

Obtuse
Examples:

triangleType(2, 4, 6); // return 0 (Not triangle)
triangleType(8, 5, 7); // return 1 (Acute, angles are approx. 82°, 38° and 60°)
triangleType(3, 4, 5); // return 2 (Right, angles are approx. 37°, 53° and exactly 90°)
triangleType(7, 12, 8); // return 3 (Obtuse, angles are approx. 34°, 106° and 40°)