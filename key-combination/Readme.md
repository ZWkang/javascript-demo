### keyCombination

> 快捷使用（两个）组合键


### Usage

```
var keyCombination = require('./index.js')
var keyCombinationTest = new keyCombination({isElement: false})

// Here is easy to bind
// default is window
keyCombinationTest.bindEvent('ctrl shift', function () {
  console.log('ctrl shift is work')
})
```


### API Reference

keyCombination({})

default Object 

{
  element: null, // 需要绑定的HTML元素
}


#### 构造函数返回对象API

##### bindEvent(keyCode, callback)

> description: 添加回调函数进事件集

> eg: bindEvent('ctrl 5', function () { // do some things})

---

##### removeListeners(keyCode, callback)

> description: 从事件集中删除

> eg: removeListeners('ctrl 5', function () {})

这里你需要注意，这个回调函数的引用应该与bindEvent一致。

---

##### detach

> 彻底解绑事件

> eg: new keyCombination({}).detach()

解绑事件

---

##### init

> eg: new keyCombination({}).init()

你可以重新初始化一些参数.用于复用对象

---

##### subscribeAction

> eg: new keyCombination({}).subscribeAction()

初始化数据后你可以手动执行一下进行绑定。

---

keyCode in [keycodes](https://github.com/wesbos/keycodes)

---

### MIT