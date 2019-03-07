const 
var Koa = require('koa')
  , http = require('http')
  , request = require('supertest')
  , should = require('should')
  , Route = require('./simple-server-router.js')

async function writeCtxBodyAuthorName (ctx, next) {
    ctx.body = {
        Author: 'ZWkang'
    }
    return await next()
}
async function writeCtxBodyMuti (ctx, next) {
    ctx.body.muti = true
    return await next()
}
describe('Route#middlerware', function() {
    it('test single Route case', function(done) {
        var app = new Koa();
        var router = new Route();
        
        router.register(/\/singleMiddler/, writeCtxBodyAuthorName)
        
        app.use(router.createMiddlerware());
        request(http.createServer(app.callback()))
        .get('/singleMiddler')
        .expect(200)
        .end(function(err, res) {
            if (err) return done(err);
            res.should.have.property('body');
            res.body.should.have.property('Author', 'ZWkang');
            done();
        });
    });
    it('test muti Routes case', function(done) {
        var app = new Koa();
        var router = new Route({
            muti: true
        });
        
        router.register(/\/singleMiddler/, writeCtxBodyAuthorName)
        router.register(/\/singleMiddlersTest/, writeCtxBodyMuti)
        app.use(router.createMiddlerware());
        request(http.createServer(app.callback()))
        .get('/singleMiddlersTest')
        .expect(200)
        .end(function(err, res) {
            if (err) return done(err);
            res.should.have.property('body');
            res.body.should.have.property('Author', 'ZWkang');
            res.body.should.have.property('muti', true);
            done();
        });
    });
    it('test default should be 404 status code', function(done) {
        var app = new Koa();
        var router = new Route();
        
        router.register(/\/singleMiddler/, writeCtxBodyAuthorName)
        router.register(/\/singleMiddlersTest/, writeCtxBodyMuti)
        app.use(router.createMiddlerware());
        request(http.createServer(app.callback()))
        .get('/iwant404')
        .expect(404)
        .end(function(err, res) {
            if (err) return done(err);
            done();
        });
    });
})