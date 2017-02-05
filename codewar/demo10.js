The number 89 is the first integer with more than one digit that fulfills the property partially introduced in the title of this kata. What's the use of saying "Eureka"? Because this sum gives the same number.

In effect: 89 = 8^1 + 9^2

The next number in having this property is 135.

See this property again: 135 = 1^1 + 3^2 + 5^3

We need a function to collect these numbers, that may receive two integers a, b that defines the range [a, b] (inclusive) and outputs a list of the sorted numbers in the range that fulfills the property described above.

Let's see some cases:

sumDigPow(1, 10) == [1, 2, 3, 4, 5, 6, 7, 8, 9]

sumDigPow(1, 100) == [1, 2, 3, 4, 5, 6, 7, 8, 9, 89]
If there are no numbers of this kind in the range [a, b] the function should output an empty list.

sumDigPow(90, 100) == []




function sumDigPow(a, b) {
  // Your code here
  var c = a;  
  var d = b;
   var z=[];
   function sss(num){
   	var vvv = num.toString();
   	var ccc = 0;
   	for(var f=0;f<vvv.length;f++){
   		ccc=ccc+Math.pow(Number(vvv[f]),f+1);
   	}
   	return ccc;

   }
  for(c;c<d;c++){
    if(c ==sss(c)){
    	z.push(c);
    }
  }
return z;
}



function filterFunc(n) {
  return `${n}`.split("").map((x, i) => x ** (i+1)).reduce((a, b) => a+b) == n;
}

function *range(a, b) {
  for (var i = a; i <= b; ++i) yield i;
}

function sumDigPow(a, b) {
  return Array.from(range(a, b)).filter(filterFunc);
}


function sumDigPow(a, b) {
  var ans = [];
  while(a <= b){
    if(a.toString().split('').reduce((x,y,i)=>x + +y ** (i + 1),0) == a)
      ans.push(a);
    a++;
  }
  return ans;
}


function sumDigPow(a, b) { 
  l=[]; for (i=a;i<=b;i++) {s=i+""; c=0; for (j=0;j<s.length;j++) c+=Math.pow(s.charCodeAt(j)-48,j+1); if (c==i) l.push(i)}
  return l;
}


function sumDigPow(a, b) {
  var resultArr = [];
  var tempString = [];
  var sum;
  
  for(var i = a; i < b; i++){
    sum = 0;
    tempString = ("" + i).split("");
    for(var j = 0; j < tempString.length; j++)
      sum += Math.pow(tempString[j], j+1);
    if(sum === i)
      resultArr.push(i);   
  }
  return resultArr;
}