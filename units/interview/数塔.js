var a = [
[9],
[12,15],
[10,6,8],
[2,18,9,5],
[19,7,10,4,16]
]

function arrs(arr){
	console.log(arr)
	var towlen = arr.length-1
	var temparr = arr.slice()
	for(var i = towlen-1;i>=0;i--){
		for(var j = 0;j<=i;j++){
			temp_max = Math.max(temparr[i+1][j],temparr[i+1][j+1])
			temparr[i][j] = temp_max+temparr[i][j]
		}
	}
	j=0;
    for (var i = 1; i < towlen; ++i){
        node_value = temparr[i - 1][j] - arr[i - 1][j];
        /* 如果node_value == temparr[i][j]则说明下一步应该是arr[i][j]；如果node_value == temparr[i][j + 1]则说明下一步应该是arr[i][j + 1]*/
        if (node_value == temparr[i][j + 1]) ++j;
        console.log("->"+arr[i][j]);
    }	
	return temparr[0][0]
}
function cucl (arr){

}
console.log(arrs(a))