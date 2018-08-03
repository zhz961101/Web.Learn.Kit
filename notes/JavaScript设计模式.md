
<center><h1>设计模式</h1></center>
lang:javascript

# beg
```javascript
Object.create(null)
```
# 函数式编程
> https://www.cnblogs.com/fengyuqing/p/functional_programming_1.html

```javascript
var checkage = min => (age => age > min);
var checkage18 = checkage(18);
checkage18(20);
```
## 柯里化
curry(lodash.js)
```javascript
//柯里函数实质：传递给函数一部分参数来调用它，让它返回一个函数来处理剩余参数
function curry(fx) {
    //要进行柯里化的函数的形参数量
    var arity=fx.length
    return function f1() {
        //第一次传入的参数数量
        var args=[].slice.call(arguments,0)
        //若传入的参数数量大于等于形参数量,代表现在万事俱备（参数齐全了），可以直接执行函数了,直接将参数全部传入fx函数中，并执行它
        if (args.length>=arity) {
            return fx.apply(null,args)
        }else{
            var f2=function() {
                //如果只传入了一部分参数
                var args2 = [].slice.call(arguments, 0)
                //判断是否所有参数都传完了，如果没有，不断concat新传的参数，然后执行f1函数
                return f1.apply(null, args.concat(args2))
            }
            return f2
        }

    }
}
```

# throttle(函数节流)
```javascript
var throttle = function(fn, interval) {
    var __self = fn, // 保存需要被延迟执行的函数引用
        timer, // 定时器
        firstTime = true; // 是否是第一次调用
    return function() {
        var args = arguments,
            __me = this;
        if (firstTime) { // 如果是第一次调用，不需延迟执行
            __self.apply(__me, args);
            return firstTime = false;
        }
        if (timer) { // 如果定时器还在，说明前一次延迟执行还没有完成
            return false;
        }
        timer = setTimeout(function() { // 延迟一段时间执行
            clearTimeout(timer);
            timer = null;
            __self.apply(__me, args);
        }, interval || 500);
    };
};
```

# TimeChunk(分时函数)
```javascript
var timeChunk = function(ary, fn, count) {
    var obj,
        t;
    var len = ary.length;
    var start = function() {
        for (var i = 0; i < Math.min(count || 1, ary.length); i++) {
            var obj = ary.shift();
            fn(obj);
        }
    };
    return function() {
        t = setInterval(function() {
            if (ary.length === 0) { // 如果全部节点都已经被创建好
                return clearInterval(t);
            }
            start();
        }, 200); // 分批执行的时间间隔，也可以用参数的形式传入
    };
};
```

# open&closed OCP
```javascript
Function.prototype.after = function(afterfn) {
    var __self = this;
    return function() {
        var ret = __self.apply(this, arguments);
        afterfn.apply(this, arguments);
        return ret;
    }
};
window.onload = (window.onload || function() {}).after(function() {
    console.log(document.getElementsByTagName('*').length);
});
```

# reconstruct

```javascript
var createXHR = function() {
    var xhr;
    try {
        xhr = new ActiveXObject('MSXML2.XMLHttp.6.0');
    } catch (e) {
        try {
            xhr = new ActiveXObject('MSXML2.XMLHttp.3.0');
        } catch (e) {
            xhr = new ActiveXObject('MSXML2.XMLHttp');
        }
    }
    return xhr;
};
var xhr = createXHR();
```

```javascript
var createXHR = function() {
    var versions = ['MSXML2.XMLHttp.6.0ddd', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp'];
    for (var i = 0, version; version = versions[i++];) {
        try {
            return new ActiveXObject(version);
        } catch (e) {}
    }
};
var xhr = createXHR();
```
