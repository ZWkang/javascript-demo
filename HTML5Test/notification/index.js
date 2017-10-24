const koa = require('koa');
const static = require('koa-static');
const app = new koa();
app.use(static(__dirname));
app.listen(8000,()=>{
    console.log('listening 8000 please visit localhost:8000/index.html')
})