Complete the solution so that it strips all text that follows any of a set of comment markers passed in. Any whitespace at the end of the line should also be stripped out.

Example:

Given an input string of:

apples, pears # and bananas
grapes
bananas !apples
The output expected would be:

apples, pears
grapes
bananas
The code would be called like so:

var result = solution("apples, pears # and bananas\ngrapes\nbananas !apples", ["#", "!"])
// result should == "apples, pears\ngrapes\nbananas"



function solution(input, markers){
    var test= input.split("\n");
    var len=markers.length ,strlen=test.length;
    for(var i=0;i<len;i++){
        test = test.map(function(item){
            return item.split(markers[i])[0].trim();
        });
    }

    return test.join('\n');
}


https://www.codewars.com/kata/strip-comments/train/javascript



function solution(input, markers){
  return input.replace(new RegExp("\\s?[" + markers.join("") + "].*(\\n)?", "gi"), "$1");
}

function solution(input, markers) {
  return input.split('\n').map(
    line => markers.reduce(
      (line, marker) => line.split(marker)[0].trim(), line
    )
  ).join('\n')
}

