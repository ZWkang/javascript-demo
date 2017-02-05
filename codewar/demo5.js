The goal of this exercise is to convert a string to a new string where each character in the new string is '(' if that character appears only once in the original string, or ')' if that character appears more than once in the original string. Ignore capitalization when determining if a character is a duplicate.

Examples:

"din" => "((("

"recede" => "()()()"

"Success" => ")())())"

"(( @" => "))(("











function duplicateEncode(word){
    // ...
    var d={};
    word = word.toLowerCase();
    for(var i=0;i<word.length;i++){
        if(word[i] in d){

            d[word[i]]=d[word[i]]+1;

        }else{
          d[word[i]]=1;
        }
    }
  var f ='';
    for(var z = 0;z<word.length;z++){
      if(d[word[z]]!=1){
        f=f+')';
      }else{
        f=f+'(';
      }
    }
  return f;
}



function duplicateEncode(word){
  return word
    .toLowerCase()
    .split('')
    .map( function (a, i, w) {
      return w.indexOf(a) == w.lastIndexOf(a) ? '(' : ')'
    })
    .join('');
}


function duplicateEncode(word) {
  var letters = word.toLowerCase().split('')
  return letters.map(function(c, i) {
    return letters.some(function(x, j) { return x === c && i !== j }) ? ')' : '('
  }).join('')
}


function duplicateEncode(word){
   
    var unique='';
    word = word.toLowerCase();
    for(var i=0; i<word.length; i++){
        if(word.lastIndexOf(word[i]) == word.indexOf(word[i])){
            unique += '(';
        }
        else{
            unique += ')';
        }
    }
    return unique;

}
