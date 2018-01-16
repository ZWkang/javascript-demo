(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(function () {
			return factory(root);
		});
	} else if (typeof exports === 'object') {
		module.exports = factory;
	} else {
		root.kangInit = factory(root);
	}
})(this, function (root) {
    'use strict';
    var _win = window,
        _doc = document

    let defaultClass = {
        year: new Date().getFullYear(),//当前年龄
        month: new Date().getMonth() + 1,//当前月份
        eventHandler: {
            public: [],//
            left: [],//左btn事件存储点
            right: []//右btn事件存储点
        },
        nowJson: {}
    }
    let publicObject = {}//
    let until = {
        isObject: function (obj) {
            return publicObject.toString.call(Obj) === '[object Object]' && typeof obj === 'Object'
        },
        isFunction: function (fun) {
            return publicObject.toString.call(fun) === '[object Function]' && typeof fun === 'Object'
        },
        isArray: function (array) {
            return array instanceof Array;
        },
        addEvent: function (ele, eventType, callback, bool) {
            if (ele.addEventListener) {
                return ele.addEventListener(eventType, callback, !!bool)
            } else if (ele.attachEvent) {
                return ele.attachEvent(eventType, callback)
            } else {
                return ele["on" + eventType] = callback
            }
        },
        removeEvent: function (ele, eventType, callback, bool) {
            if (ele.addEventListener) {
                return ele.removeEventListener(eventType, callback, !!bool)
            } else if (ele.attachEvent) {
                return ele.detachEvent(eventType, callback)
            } else {
                return ele["on" + eventType] = null
            }
        },
        cancelEvent: function (event) {
            if (event.preventDefault) {
                return e.preventDefault();
            } else {
                return event.returnValue = false;
            }
        },
        eventstopPropagation: function (event) {
            if (event.stopPropagation) {
                return event.stopPropagation()
            } else {
                return event.cancelBubble = true
            }
        },
        eventGet: function (e) {
            return e || _win.event
        },
        getAll: function (selector) {
            return _doc.getSelectorAll(selector)
        },
        getOne: function (selector) {
            return _doc.getSelector(selector)
        }
    }
    const StaticMonth = [31, [28, 29], 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var calendar = function () {
        if (!(this instanceof calendar)) return new calendar();
        this.year = new Date().getFullYear();
        this.month= new Date().getMonth() + 1;
        this.eventHandler= {
            public: {},
            left: {},
            right: {}
        };
       this.nowJson = {};
    }
    calendar.prototype = {
        constructor: calendar,
        /**
         * @description 是不是闰月
         * @param {Number|String} year
         * @return {Boolean}
         */
        YearType: function (year) {
            if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) { return true; }
            return false;
        },
        /**
         * @description 判断某个月份需要什么
         * @param {Number|String} year
         * @param {Number|String} month
         * @return {Number}
         */
        DayMonth: function (year, month) {
            if (month == 2 && this.YearType(year)) {
                return StaticMonth[1][1];
            } else if (month == 2) {
                return StaticMonth[1][0];
            }
            return StaticMonth[month - 1]
        },
        /**
         * @description 蔡琴公式
         * @param {Number|String} year
         * @param {Number|String} month
         * @param {Number|String} day
         * @return {Number}
         */
        zellerweek: function (year, month, day) {
            var m = month, d = day;;
            if (month <= 2) {
                year--;
                m = month + 12;
            }
            var y = year % 100;
            var c = Math.floor(year / 100);
            var w = (y + Math.floor(y / 4) + Math.floor(c / 4) - 2 * c + Math.floor(13 * (m + 1) / 5) + d - 1) % 7;
            if (w < 0) {
                w += 7;
            }
            return w;
        },
        /**
         * @description 儒略历转化天数
         * @param {Number|String} jd
         * @return {Object}
         */
        julianToDay: function (jd) {
            var r = {};
            var D = this._int(jd + 0.5);
            var F = jd + 0.5 - D, c;
            if (D >= 2299161) {
                c = this._int((D - 1867216.25) / 36524.25);
                D += 1 + c - this._int(c / 4);
            }
            D += 1524;
            r.Y = this._int((D - 122.1) / 365.25);
            D -= this._int(365.25 * r.Y); r.M = this._int(D / 30.601);
            D -= this._int(30.601 * r.M); r.d = D;
            if (r.M > 13) {
                r.M -= 13;
                r.Y -= 4715;
            } else {
                r.M -= 1;
                r.Y -= 4716;
            }
            F *= 24;
            r.h = this._int(F);
            F -= r.h;
            F * 60; r.m = this._int(F);
            F -= r.m;
            F * 60; r.s = F;
            return r;
        },
        /**
         * @description 年月日转儒略日
         * @param {Number|String} y
         * @param {Number|String} m
         * @param {Number|String} d
         * @return {Number}
         */
        dayToJulian: function (y, m, d) {
            var year = y, month = m, day = d + 0.5;
            //d+0.5是为了调整儒略日的在每天公历的中午12点

            if (m <= 2) {
                year -= 1;
                month = month + 12;
            }
            if (year > 1582) {
                B = this._int(year / 100);
                B = 2 - B + this._int(year / 400);
            }

            var dd = day + 0.0000115740;

            var a = Math.floor(365.25 * (year + 4716) + 0.01) + Math.floor(30.60001 * (month + 1)) + dd + B - 1524.5;
            return a;
        },
        /**
         * @description default left button action
         */
        defaultLeftBtn: function () {
            if (this.month < 1) return;
            if (this.month == 1) {
                this.year -= 1;
                this.month = 12;
            } else {
                this.month -= 1;
            }
        },
        /**
         * @description default right button action
         */
        defaultRightBtn: function () {
            if (this.month < 1) return;
            if (this.month == 12) {
                this.year += 1;
                this.month = 1;
            } else {
                this.month += 1;
            }
        },
        leftDays: function(y,m){
            if (m < 1) return;
            if (m == 1) {
                y -= 1;
                m = 12;
            } else {
                m -= 1;
            }
            return this.DayMonth(y,m)
        },
        rightDays: function(y,m){
            if (m < 1) return;
            if (m == 12) {
                y += 1;
                m = 1;
            } else {
                m += 1;
            }
            return this.DayMonth(y,m)
        },
        GetDayMapJson: function (year, month) {
            let temp = []
            temp.length = 42
            temp.fill(0)
            let y, m
            if (arguments.length > 0) {
                y = year
                m = month
            } else {
                y = this.year
                m = this.month
            }
            let beginweekday = this.zellerweek(y, m, 1),
                days = this.dayofMonth(y, m);

            for (let i = beginweekday; i < days; i++) {
                this.nowJson[i] = 1
            }
            this.nowJson = temp;
            return temp
        },
        makeJson: function(year=this.year,month=this.month){
            let temparr = []
            let beginweekday = this.zellerweek(year,month,1);
            var days = this.DayMonth(year, month);
            for (var i = 1; i <= days; i++) {
                temparr.push(i);
            }
            var dayys = this.leftDays(year,month)
            for (var y = 0; y < beginweekday; y++) {
                temparr.unshift(dayys--)
            }
            for (var z = days+beginweekday,d=1; z < 42; z++) {
                temparr.push(d++);
            }
            this.nowJson = temparr
            // this.nowJson['year'] = year
            // this.nowJson['month'] = month
        },
        removeEvent: function(object={}){
            return until.removeEvent.call(this,object['ele'],object['type'],object['callback'],false)
        },
        addEvent: function(result){
            until.addEvent.call(this,result['ele'],result['type'],result['callback'],false)
        },
        initEvent: function(){
            for(let i in this.eventHandler){
                for(let result of this.eventHandler[i]){
                    if(!result['flag']){
                        this.addEvent(result)
                        result['flag'] = true
                        console.log('123123')
                    }
                }
            }
        }
    }
    let init = function(option={}){
        let Calendar = new calendar();
        let keys = Object.keys(option)
        Calendar = Object.assign(Calendar,defaultClass)
        if(keys.length===0)return Calendar;
        
        for(let key of keys){
            Calendar[key] = option[key]
        }
        if(Calendar.eventHandler){
            for(let i in Calendar.eventHandler){
                for(let result of Calendar.eventHandler[i]){
                    Calendar.addEvent(result)
                    result['flag']=true
                }
            }
        }
        return Calendar
    }
    window.kangInit = init
    return init
})