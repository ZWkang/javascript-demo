const debug = require('debug')('kang-route');
const compose = require('koa-compose');

/**
 * use
 * 1. require('simple-server-router.js')
 * 2. const routers = new Route({
 *      muti: true| false // 是否重复匹配路由
 * })
 * 
 * 3. routers.register(/test/, async (ctx, next) { ctx.body = {name: 'kang'}})
 * 4. app.use(routers.createMiddlerware())
 */
const defaultOptions = {
    muti: false
}
function Route(options) {
    this.middlerwares = []
    this.options = options || defaultOptions
}

Route.prototype.register = function (regex, middlerware) {
    this.middlerwares.push({
        regex,
        middlerware
    })
}
Route.prototype.createMiddlerware = function () {
    const { muti } = this.options
    return async (ctx, next) => {
        const { req } = ctx
        const len = this.middlerwares.length
        const url = ctx.url
        const middlerwares = []
        for(let i = 0; i < len; i++) {
            const middlerware = this.middlerwares[i]
            const isRegexp = middlerware['regex'].exec(url)
            if(isRegexp) {
                middlerwares.push(middlerware['middlerware'])
                if(i === len-1 || !muti) {
                    return compose(middlerwares)(ctx,next)
                }
            }
        }
        noop(ctx, next)
        return await next()
    }
}

function noop (ctx, next) {
    ctx.status = 404
    ctx.res.end()
}

module.exports = Route