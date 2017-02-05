// function Vector(components) {
//   // TODO: Finish the Vector class.
//   this.arr = components;
//   this.add = add;
//   this.subtract=subtract;
//   this.norm=norm;
//   this.dot=dot;
// }

// function add(aa) {
//   if(this.arr.length === aa.arr.length) {
//     var result=[];
//     for(var i=0; i<this.arr.length; i++) {
//        result.push(this.arr[i]+aa.arr[i]);
//     }
//     return new Vector(result);
//   } else {
//     throw 'throws an error';
//   }
// }
// function subtract(aa) {
//   if(this.arr.length === aa.arr.length) {
//     var result=[];
//     for(var i=0; i<this.arr.length; i++) {
//        result.push(this.arr[i]-aa.arr[i]);
//     }
//     return new Vector(result);
//   } else {
//     throw 'throws an error';
//   }
// }
// function dot(aa) {
//   if(this.arr.length === aa.arr.length) {
//     var result=0;
//     for(var i=0; i<this.arr.length; i++) {
//        result=result+this.arr[i]*aa.arr[i];
//     }
//      return result;
//   } else {
//     throw 'throws an error';
//   }
// }
// function norm() {
//     var result=0;
//     for(var i=0; i<this.arr.length; i++) {
//        result=result+this.arr[i]*this.arr[i];
//     }
//     return Math.sqrt(result);
// }

// Vector.prototype.equals = function(s){
//     return this.arr.join('')==s.arr.join('');
// }
// Vector.prototype.toString=function(){
//   return '('+this.arr.toString()+')';
// }



// Create a Vector object that supports addition, subtraction, dot products, and norms. So, for example:

// var a = new Vector([1,2,3]);
// var b = new Vector([3,4,5]);
// var c = new Vector([5,6,7,8]);
// a.add(b); // should return Vector([4,6,8])
// a.subtract(b); // should return Vector([-2,-2,-2])
// a.dot(b); // should return 1*3+2*4+3*5 = 26
// a.norm(); // should return sqrt(1^2+2^2+3^2)=sqrt(14)
// a.add(c); // throws an error
// If you try to add, subtract, or dot two vectors with different lengths, you must throw an error!

// Also provide:

// a toString function, so that using the vectors from above, a.toString() === '(1,2,3)' (in Python, this is a __str__ method, so that str(a) == '(1,2,3)')
// an equals function, so that two vectors who have the same components are equal
// The test cases will utilize the user-provided equals method.


// https://www.codewars.com/kata/526dad7f8c0eb5c4640000a4/solutions/javascript



// var Vector = function (components) {
//   this.x = components;
// };
// Vector.prototype.add = function(b){
//   var a = this.x
//   b = b.x;
//   if(a.length !== b.length) throw new TypeError("Vectors have different length");
//   return new Vector(a.map(function(x,i){ return x + b[i]; }));
// }
// Vector.prototype.subtract = function(b){
//   var a = this.x;
//   b = b.x;
//   if(a.length !== b.length) throw new TypeError("Vectors have different length");
//   return new Vector(a.map(function(x,i){ return x - b[i]; }));
// }
// Vector.prototype.dot = function(b){
//   var a = this.x;
//   b = b.x;
//   if(a.length !== b.length) throw new TypeError("Vectors have different length");
//   return a.reduce(function(s,x,i){ return s + x * b[i]; },0);
// }
// Vector.prototype.equals = function(b){
//   var a = this.x;
//   b = b.x;
//   if(a.length !== b.length) return false;
//   return a.every(function(x,i){ return x === b[i]; });
// }
// Vector.prototype.norm = function(){
//   var a = this.x;
//   return Math.sqrt(a.reduce(function(s,x){ return s + x*x }, 0));
// }
// Vector.prototype.toString = function(){
//   return '(' + this.x.join(',') + ')';
// }


// var Vector = function (components) {
//   this.items = components;
//   this.length = components.length;
// };

// Vector.prototype = {
//   do: function (action, vector) {
//     if (vector.length !== this.length) { throw 'Different Length!'; }
//     return new Vector(this.items.map(function (v, k) { 
//       return eval(v + action + vector.items[k])
//     }));
//   },
//   add: function (v) { return this.do('+', v); },
//   subtract: function (v) { return this.do('-', v); },
//   sum: function (v) { return eval(v.items.join('+')); },
//   dot: function (v) { return this.sum(this.do('*', v)); },
//   norm: function () { return Math.sqrt(this.dot(this)); },
//   toString: function() { return '(' + this.items + ')'; },
//   equals: function (v) { return this.toString() == v.toString(); }  
// };