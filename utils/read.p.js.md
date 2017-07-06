```
//一层闭包是为了简化操作方便压缩
var P = (function(prototype, ownProperty, undefined) {
  //return一个P的函数 也就是我们调用P的时候的传参
  return function P(_superclass /* = Object */, definition) {
    //这边做只有一个参数时候的处理
    if (definition === undefined) {
      definition = _superclass;
      _superclass = Object;
    }
    //主要的函数  因为我们实际上是return一个构造函数并不是直接的对象
    function C() {
        //这边是做一个不用new调用的操作  实例化的时候直接xxx()即可
        //判断this是方便以后使用call apply
      var self = this instanceof C ? this : new Bare;
      //使用当前prototype的init初始化函数
      self.init.apply(self, arguments);
      return self;
    }
    //这个实际上是一个辅助的桥梁
    function Bare() {}
    //C.Bare保存着它方便在日后做判断
    C.Bare = Bare;
    //获得父级的super prototype  实际上就是传入的第一个参数的prototype
    var _super = Bare[prototype] = _superclass[prototype];
    //这边很精巧Bare[prototype]上面设置了。实际上这一步new Bare的时候。
    //它的[proto]就是super prototype
    //然后在做二次变化Bare[prototype]并依次将C prototype C.p写入
    //存在proto方便之后的抛出操作
    var proto = Bare[prototype] = C[prototype] = C.p = new Bare;
    //key是用作后面的迭代
    var key;
    //定式得将它的constructor指向C 实际上也在修改别的因为是引用值
    proto.constructor = C;
    //这边在实例上添加一个extend方法 实际上也是调用P
    //前面的return function写成具名也许就是为了内部的这里调用
    C.extend = function(def) { return P(C, def); }
    //这边相当于是return一个C
    //做了一个闭包操作 并且对c.open赋值了
    //传入我们调用P的第二个参数
    return (C.open = function(def) {
      if (typeof def === 'function') {
        //如果是函数的话就进行这样的赋值操作
        //对应的我们函数回调函数可以调用这几种
        // 当前prototype 父级prototype 当前类 父级类
        def = def.call(C, proto, _super, C, _superclass);
      }
      //如果是对象 直接就可以迭代传参了
      //如果上面函数赋值返回值是一个对象 那么下面也可以接着迭代吧
      if (typeof def === 'object') {
        for (key in def) {
          if (ownProperty.call(def, key)) {
          //判断是不是对象
            proto[key] = def[key];
          }
        }
      }
      //保证当前类有存在init方法
      //当前没有的话就调用父级的
      if (!('init' in proto)) proto.init = _superclass;
      //返回这个我们构建的构造函数
      return C;
    })(definition);
  }
})('prototype', ({}).hasOwnProperty);
//这边传入prototype 还有hasOwnProperty还有undefined

实际上C相当于是一个桥梁
实际上它的继承还是
类似Object.create这种
function temp(){}
temp.prototype = super.prototype
return new temp()
比较绕的地方有几点。
刚开始觉得它的return有坑。然后发现没有
然后就是纠结在它每一点每一次生成的地方this的指向
蛮有意思的一次经历

每一次调用返回的实际上不是实例对象
而是对应的“类”构造函数
实际上我讲的类都应该加个双引号 
卒
```