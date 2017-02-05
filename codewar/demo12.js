function list(names){
  //your code here
  values = '';
  names.forEach(function(value,index){
    if(index==names.length-1) values=values+' & '+value['name'];
    if(index>0&&index!=names.length-1)values=values+', '+value['name'];
    if(index==0)values=value['name'];
  })
  return values;
}


function list(names){
  return names.reduce(function(prev, current, index, array){
    if (index === 0){
      return current.name;
    }
    else if (index === array.length - 1){
      return prev + ' & ' + current.name;
    } 
    else {
      return prev + ', ' + current.name;
    }
  }, '');
}


function list( names ){
  return names.reduce(function(prev, curr, i, arr){
    return prev + curr.name + (i<arr.length-2?', ':i==arr.length-2?' & ':'');
  }, '');
}

function list(names) {
  var xs = names.map(p => p.name)
  var x = xs.pop()
  return xs.length ? xs.join(", ") + " & " + x : x || ""
}
//  }Given: an array containing hashes of names

// Return: a string formatted as a list of names separated by commas except for the last two names, which should be separated by an ampersand.

// Example:

// list([ {name: 'Bart'}, {name: 'Lisa'}, {name: 'Maggie'} ])
// // returns 'Bart, Lisa & Maggie'

// list([ {name: 'Bart'}, {name: 'Lisa'} ])
// // returns 'Bart & Lisa'

// list([ {name: 'Bart'} ])
// // returns 'Bart'

// list([])
// // returns ''