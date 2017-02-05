Write a function that accepts an array of 10 integers (between 0 and 9), that returns a string of those numbers in the form of a phone number.

Example:

createPhoneNumber([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]) // => returns "(123) 456-7890"
The returned format must be correct in order to complete this challenge. 
Don't forget the space after the closing parenthese!'


function createPhoneNumber(numbers){
    var d = '';
    function xxx(){
       return '('+numbers[0].toString()+numbers[1].toString()+numbers[2].toString()+')'
    }
    for(var i =3;i<numbers.length;i++){
       if(i==6){
           d=d+'-'+numbers[i].toString();
       }else{
          d=d+numbers[i].toString();
       }
    }
    return xxx()+' '+d;
}


function createPhoneNumber(numbers){
  var format = "(xxx) xxx-xxxx";
  
  for(var i = 0; i < numbers.length; i++)
  {
    format = format.replace('x', numbers[i]);
  }
  
  return format;
}

function createPhoneNumber(numbers){
  numbers = numbers.join('');
  return '(' + numbers.substring(0, 3) + ') ' 
      + numbers.substring(3, 6) 
      + '-' 
      + numbers.substring(6);
}


function createPhoneNumber(numbers){
  return numbers.join('').replace(/(...)(...)(.*)/, '($1) $2-$3');
}             