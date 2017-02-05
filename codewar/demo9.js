The test fixture I use for this kata is pre-populated.

It will compare your guess to a random number generated in Ruby by:

(Kernel::rand() * 100 + 1).floor
In Javascript/CoffeeScript by:

Math.floor(Math.random() * 100 + 1)
In Python by:

randint(1,100)
You can pass by relying on luck or skill but try not to rely on luck.

"The power to define the situation is the ultimate power." - Jerry Rubin

Good luck!

https://www.codewars.com/kata/dont-rely-on-luck/train/javascript



var guess =Math.floor(Math.random() * 100 -12)-12


Math.random = function(n){return 0;}
var guess = 1;


var guess = 10
Math.floor = function(v) { return guess; }


Math.random = () => 0;
var guess = 1


var guess = 10;
lucky_number = 10;