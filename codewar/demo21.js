Greed is a dice game played with five six-sided dice. Your mission, should you choose to accept it, is to score a throw according to these rules. You will always be given an array with five six-sided dice values.

 Three 1's => 1000 points
 Three 6's =>  600 points
 Three 5's =>  500 points
 Three 4's =>  400 points
 Three 3's =>  300 points
 Three 2's =>  200 points
 One   1   =>  100 points
 One   5   =>   50 point
A single die can only be counted once in each roll. For example, a "5" can only count as part of a triplet (contributing to the 500 points) or as a single 50 points, but not both in the same roll.

Example scoring

 Throw       Score
 ---------   ------------------
 5 1 3 4 1   50 + 2 * 100 = 250
 1 1 1 3 1   1000 + 100 = 1100
 2 4 4 5 4   400 + 50 = 450


function score( dice ) {
  // Fill me in!
  var num1=0,num2=0,num3=0,num4=0,num5=0,num6=0;
  dice.forEach(function(value){
    if(value==1){
      num1++;
    }else if(value==2){
      num2++;
    }else if(value==3){
      num3++;
    }else if(value==4){
      num4++;
    }else if(value==5){
      num5++;
    }else if(value==6){
      num6++;
    }
  })
  var count = 0;
  if(num1>=3){
    count = count+parseInt(num1/3)*1000+(num1-(parseInt(num1/3)*3))*100;
  }else{
    count = count+ num1*100;
  }
  count = count+parseInt(num2/3)*200;
  count = count+parseInt(num3/3)*300;
  count = count+parseInt(num4/3)*400;
  count = count+parseInt(num6/3)*600;
  if(num5>=3){
    count = count+parseInt(num5/3)*500+(num5-(parseInt(num5/3)*3))*50;
  }else{
    count = count+ num5*50;
  }
  return count;
}



function score( dice ) {
  var dc = [0,0,0,0,0,0];
  var tdr = [1000,200,300,400,500,600];
  var sdr = [100,0,0,0,50,0];
  dice.forEach(function(x){ dc[x-1]++; });
  return dc.reduce(function(s,x,i){ 
    return s + (x >= 3? tdr[i] : 0) + sdr[i]*(x % 3);
  },0);
}



function score( dice ) {
  var score = [0, 0, 0, 0, 0, 0];

  dice.forEach(function(die) {
    ++score[die - 1];
  });

  return score.reduce(function(total, n, i) {
    switch (i + 1) {
      case 1:
        return total + (Math.floor(n / 3) * 1000) + ((n % 3) * 100);

      case 5:
        return total + (Math.floor(n / 3) * 500) + ((n % 3) * 50);

      default:
        return total + (Math.floor(n / 3) * (i + 1) * 100);
    }
  }, 0);
}