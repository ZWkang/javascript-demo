// const pathToRegexp = require('path-to-regexp');
const debug = require('debug')('kang-route');
// const methods = require('methods');
const compose = require('koa-compose')

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