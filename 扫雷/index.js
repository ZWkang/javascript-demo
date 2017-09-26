//放雷

//初始化大小数组
function makeinitarray(num,lei){
    var arr = [];
    arr[lei-1] = void 0;
    arr.fill(1);
    arr = arr.concat((new Array(num-lei)).fill(0));
    return arr;
}
// console.log(makeinitarray(16,5))
// 随机处理数组数据
function random_arr(arr){
    var temp,rand,len,i;
    len = arr.length;
    for(i = 0;i<len;i++){
        rand = Math.floor(Math.random()*(i+1));
        if(rand!==i){
            temp = arr[i];
            arr[i] = arr[rand];
            arr[rand] = temp;
        }
    }
    return arr ;
}
// var a = calc(initlei(random_arr(makeinitarray(16,3))));
var arr = makeinitarray(16,3);
var ramdom = random_arr(arr);
var init = initlei(arr);
// var a = calc(init);
// console.log(render(a),a)
a = [ [ { value: 1, show: false },
    { value: 1, show: false },
    { value: 1, show: false },
    { value: 1, show: false } ],
  [ { value: 1, show: false },
    { value: 1, show: false },
    { value: 2, show: false },
    { value: 2, show: false } ],
  [ { value: 0, show: false },
    { value: 0, show: false },
    { value: 2, show: false },
    { value: 2, show: false } ],
  [ { value: 0, show: false },
    { value: 0, show: false },
    { value: 1, show: false },
    { value: 1, show: false } ] ];
a = cailei(3,0,a);
setTimeout(()=>{
    console.log(render(a))
})

// 初始化埋雷操作。
function initlei(arr){
    var cache = [],len,i,num;
    var arrlen = Math.sqrt(arr.length);
    var len = arr.length;
    for(i=0;i<len;i++){
        num = Math.floor(i/arrlen);
        if(!cache[num]){
            cache[num] = [];
        }
        cache[num][i%arrlen] = arr[i];
    }
    return cache;
}
function quyudefen(x,y,arr){
    var len = arr.length;
    var rowlen = arr[0].length;
    var start = {
        x:Math.max(x-1,0),
        y:Math.max(y-1,0)
    }
    var end = {
        x:Math.min(x+1,rowlen-1),
        y:Math.min(y+1,len-1)
    }
    var sum = 0;
    var num = 0;
    // console.log('------------',start,end,'-------------')
    for(var i = start.x;i<=end.x;i++){
        for(var j = start.y;j<=end.y;j++){
            // console.log(i,j)
            sum += Number(arr[i][j]['value'])
            num++
        }
    }
    // console.log(x,y,num,sum,start,end,arr[0][0])
    return {
        value:sum,
        show:false
    };
}
function calc(arr){
    var cache = arr.slice();
    var len = arr.length;
    var rowlen = arr[0].length;
    cache = cache.map((v)=>{
        return v.map((v)=>{
            return {
                show:false,
                value:v
            }
        })
    })
    a = JSON.parse(JSON.stringify(cache))
    
    cache = cache.map((vss,i,obj)=>{
        return vss.map((vv,index)=>{
            return quyudefen(index,i,a)
        })
    });
    return cache;

    // var start = {x:0,y:0}
    // var end = {x:rowlen,y:len}
    // quyudefen
    
}
// console.log(calc(initlei(random_arr(makeinitarray(36,6)))));
// 填充站点
function calclei(arr){
    // var a = makeinitarray();
    // var arr = initlei(random_arr(a));
    var cache = [],len = arr.length;
    // console.log(arr);
    var cc = count(arr);
    cc.len = arr.length;
    for(var c = 0;c<len;c++){
        cache[c]=[];
        for(var d = 0;d<len;d++){
            cache[c][d] = cc(c,d);
        }
    }
    // console.log('\n')
    // console.log(cache);
    return cache;
}
function count(arr){
    var arr = arr;
    return function foo(i,j){
        var num = 0;
        if(arr[i][j]){
            return 999;
        }
        for(var z = i-1;z<=i+1;z++){
            for(var y = j-1;y<=j+1;y++){
                if(z>=0&&y>=0&&y<foo.len&&z<foo.len){
                    if(arr[z][y]){
                        num++;
                    }
                }
            }
        }
        return num;
    }
}
// calclei();

function render(arr)
{
    console.log(arr)
    return arr.map((v,index)=>{
        return v.reduce((a,b)=>{
            if(b['show']&&b['value']==0){
                return `${a} x`
            }
            if(b['show']){
                // return `${a}<td>m</td>`
                return `${a} ${b['value']}`
            }
            return `${a} @`;
        },'')
    }).join('\n');
    // return html;
}

function cailei(x,y,arr){
    var len = arr.length;//4
    var rowLen = arr[0].length;//4
    var start = {
        x:Math.max(x-1,0),
        y:Math.max(y-1,0)
    }
    var end = {
        x:Math.min(x+1,rowLen-1),
        y:Math.min(y+1,len-1)
    }
    if(arr[x][y]['value']!==0){
        arr[x][y]['show'] = true;
        return arr;
    }
    for(var i = start.x;i<=end.x;i++){
        for(var j = start.y;j<=end.y;j++){
            // console.log('===---====')
            if(arr[i][j]['value'] == 0 && arr[i][j]['show'] === false&& i!=x&&j!=y){
                cailei(i,j,arr);
            }else{
                arr[i][j]['show'] = true;
            }
        }
    }
    return arr;
}
