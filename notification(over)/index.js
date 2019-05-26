(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(function() {
            return factory(root);
        });
    } else if (typeof exports === 'object') {
        module.exports = factory;
    } else {
        root.show = factory(root);
    }
})(typeof self !== 'undefined' ? self : this, function(root) {
    'use strict';
    if (root.$message) {
        root.pre$message = root.$message;
    }
    // 声明局部变量

    const _window = root;
    const _document = document;
    const defaultSlector = 'AgamennonNotiContainer';
    let listenContainer = false;
    let notificationId = 0;
    // 申请一块容器
    const notificationContainer = {};
    const noop = Function.prototype;
    /**
     * 可暂停的setTimeout任务
     * @param {Function} Execute 可执行函数
     * @param {Number} duration 延迟毫秒数
     */
    function Timer(execute, duration) {
        this.duration = duration;
        this.execute = execute;
        this.start = Date.now();
        this.status = 0; // no start
    }
    Timer.prototype = {
        constructor: Timer,
        startGo: function() {
            this.timeId = setTimeout(this.execute, this.duration);
            this.start = Date.now();
            this.status = 1; // starting
        },
        pause: function() {
            let now = Date.now();
            if (this.status === 2) {
                // stop
                return this;
            }
            if (this.start + this.duration < now) {
                return this;
            }
            this.timeId && clearTimeout(this.timeId);
            this.duration = this.duration - (now - this.start);
            this.status = 2;
            return this;
        },
        resume: function() {
            if (this.status !== 2) {
                return this;
            }
            this.timeId = setTimeout(this.execute, this.duration);
            this.start = Date.now();
            this.status = 1;
            return this;
        },
        stop: function() {
            // debugger
            this.status = 1;
            clearTimeout(this.timeId);
            this.duration = null;
            this.execute = null;
            this.start = null;
        }
    };
    /**
     * 预设的配置样式
     */
    const colorMaps = {
        success: {
            bgcolor: 'rgb(212, 237, 217)',
            color: 'rgb(20, 86, 35)',
            bdcolor: 'rgb(194, 230, 202)'
        },
        info: {
            bgcolor: 'rgb(208, 236, 240)',
            color: 'rgb(11, 84, 95)',
            bdcolor: 'rgb(190, 228, 235)'
        },
        danger: {
            bgcolor: 'rgb(248, 214, 217)',
            color: 'rgb(114, 27, 35)',
            bdcolor: 'rgb(245, 198, 202)'
        },
        warning: {
            bgcolor: 'rgb(255, 242, 205)',
            color: 'rgb(132, 100, 3)',
            bdcolor: 'rgb(255, 237, 185)'
        },
        secondary: {
            bgcolor: 'rgb(225, 227, 229)',
            color: 'rgb(56, 60, 65)',
            bdcolor: 'rgb(225, 227, 229)'
        }
    };
    /**
     * 将Itemwrapper写入适配样式
     */
    const handleAlertTypeColorChoose = (ele) => (type) => (maps) => {
        if (!(ele instanceof HTMLElement)) {
            return;
        }
        // debugger
        const TypeColor = maps[type];
        Object.keys(TypeColor).forEach((item, index, source) => {
            if (item === 'bgcolor') {
                ele.style.backgroundColor = TypeColor[item];
            }
            if (item === 'color') {
                ele.style.color = TypeColor[item];
            }
            if (item === 'bdcolor') {
                ele.style.borderColor = TypeColor[item];
            }
        });
    };
    /**
     * 创建一个notification 容器
     */
    const createNotificationContainer = function() {
        let Container = _document.querySelector('.' + defaultSlector);

        if (Container === null) {
            Container = _document.createElement('div');
            Container.className = defaultSlector;
            _document.body.appendChild(Container);
        }

        return Container;
    };
    /**
     * @param {Number} id 存储容器中的id值
     * @param {Number} duration 延迟毫秒数
     * @param {String} outClass 离开的添加类名
     * @param {Function} onClose 容器卸载执行的回调函数
     */
    function handleAutoClose(id, duration, outClass, onClose) {
        if (notificationContainer[id] == null) {
            return;
        }
        const { instance } = notificationContainer[id];
        const Container = createNotificationContainer();
        const exca = () => {
            // debugger
            instance.className += ' classOut';
            instance.addEventListener('animationend', function() {
                Container.removeChild(instance);
                onClose && onClose(notificationContainer);
            });
        };

        const timerRecord = new Timer(exca, duration);
        timerRecord.startGo();
        notificationContainer[id].timer = timerRecord;
        /**
         * 做hover 的时候暂停自动卸载
         */
        if (listenContainer === false) {
            Container.addEventListener('click', function(e) {
                const target = e.target;
                if (/AgamennonNotiItem--close/.test(target.className)) {
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                    const parentNode = target.parentNode;
                    const instanceid = parentNode.getAttribute('instanceid');
                    notificationContainer[instanceid].timer.stop();
                    const instance = notificationContainer[instanceid].instance;
                    instance.className += ' classOut';
                    instance.addEventListener('animationend', function() {
                        Container.removeChild(instance);
                        onClose && onClose(notificationContainer);
                    });
                }
            });
            listenContainer = true;
        }
    }
    /**
     * 默认设置
     */
    const defaultOptions = {
        autoClose: false,
        onClose: noop,
        duration: 2000,
        type: 'normal',
        message: '',
        content: '',
        outClassName: 'classOut',
        enterClassName: 'classEnter',
        colorMaps: colorMaps
    };
    /**
     * @param {String} string - 代过滤字符串
     * @return {String}
     */
    function xssEscape(string) {
        return [
            ['&', '&amp;'],
            [' ', '&nbsp;'],
            ['<', '&lt;'],
            ['>', '&gt;'],
            ['\r\n', '<br/>'],
            ['\n', '<br/>'],
            ['"', '&quot;']
        ].reduce(function(string, [pattern, replacement]) {
            return string.replace(new RegExp(pattern, 'g'), replacement);
        }, string);
    }
    /**
     * 直接用Template 插入Item内容
     * @param {String} title - Item title
     * @param {String} message - Item message
     * @param {Boolean} canClose - canClose choose show or not show close btn
     */
    const Template = (title, message, canClose) => {
        return `
                <span class="AgamennonNotiItem--title">${xssEscape(title)}</span>
                <span class="AgamennonNotiItem--message">${xssEscape(message)}</span>
                <span class="AgamennonNotiItem--close">x</span>
            `;
    };
    /**
     * @param {String} type - ItemWrapper Html type
     * @param {String} className - ItemWrapper Html className
     * @return {HTMLElement}
     */
    function GeneratorItem(type = 'div', className) {
        const Item = document.createElement(type);
        Item.className = className;
        return Item;
    }
    /**
     * @param {Object} options
     */
    function show(options) {
        // 初始化options
        options = Object.assign(defaultOptions, options);

        const Id = notificationId++;

        // 获取容器
        const Container = createNotificationContainer();
        // 设定item
        const Item = GeneratorItem('div', 'AgamennonNotiItem--Wrapper classEnter');
        Item.setAttribute('instanceid', Id);
        Item.innerHTML = Template(options.title, options.message);

        handleAlertTypeColorChoose(Item)(options.type)(options.colorMaps);
        Container.appendChild(Item);
        Item.addEventListener(
            'mouseover',
            function(e) {
                const target = e.target;
                const instanceid = target.getAttribute('instanceid');
                if (instanceid != null) {
                    e.stopPropagation();
                    notificationContainer[instanceid].timer.pause();
                }
            },
            false
        );
        Item.addEventListener(
            'mouseleave',
            function(e) {
                const target = e.target;
                const instanceid = target.getAttribute('instanceid');
                if (instanceid != null) {
                    e.stopPropagation();
                    notificationContainer[instanceid].timer.resume();
                }
            },
            false
        );
        notificationContainer[Id] = {
            instance: Item
        };
        handleAutoClose(Id, options.duration, options.outClassName, options.onClose);
    }
    return show;
});
