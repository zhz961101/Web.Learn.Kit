# ECMAScript 6入门
[电子书版](http://es6.ruanyifeng.com/#README)

这里不算笔记，算是对本书的脱水版本，加上自己对es6的认识

# 目录

# 声明扩展
### 变量
1.let声明

> 看似仅仅增加了一种声明方式，其实是增加了js缺失的语法<br>
> `块级作用域`<br>
> 一般用来解决变量名重复时js错误指向的问题，比如
```js
function loop(){
    for(var i=0;i<100;i++){
        setPx(i);
    }
}
function setPx(row){
    for(var i=0;i<100;i++){
        buff[row][i] = color.black;
    }
}
```
以正常的编程逻辑（类c语法）这个代码没有任何问题，但是js不同

原生js是没有块级作用域的（甚至可以说js中没有作用域），看起来正常的赋值逻辑，会发生致命错误，并且难以锁定并debug

let关键词解决了这个问题，使用`for(let i=0,i<100,i++){...}`,将限制对变量i的查找，在这个块级作用域内，且不影响函数作用域中的同名变量

2.const声明

> 字面意思，声明后不可修改，其余与let相同

### 面向对象
class
```js
function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function () {
  return '(' + this.x + ', ' + this.y + ')';
};
```
上面的写法包装成了下面这种
```js
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}
```
一般的get set static extends都是正常用法，不赘述

绑定this（使得解构之后的方法仍然指向实例对象）
```js
function selfish (target) {
  const cache = new WeakMap();
  const handler = {
    get (target, key) {
      const value = Reflect.get(target, key);
      if (typeof value !== 'function') {
        return value;
      }
      if (!cache.has(value)) {
        cache.set(value, value.bind(target));
      }
      return cache.get(value);
    }
  };
  const proxy = new Proxy(target, handler);
  return proxy;
}

const obj = selfish(new obj());
```
new.target，作用是`判断`是否用new关键字创建的对象
```js
function Person(name) {
  if (new.target !== undefined) {
    this.name = name;
  } else {
    throw new Error('必须使用 new 命令生成实例');
  }
}

// 另一种写法
function Person(name) {
  if (new.target === Person) {
    this.name = name;
  } else {
    throw new Error('必须使用 new 命令生成实例');
  }
}
```

### Decorator
装饰器
```js
@decorator
class A {}
// 等同于
class A {}
A = decorator(A) || A;
```
一目了然，与py中的用法无异，唯一的区别在于，js的装饰器只能用于类和类成员，无法作用于`function`上。是由于`函数提升`导致，暂时无解。可能es8/9还会有非提升function吧，类似于`let x = function`的语法糖

作用还是很强大的，比如上面class中提到的this绑定的问题`@autobind`就可以解决


### 异步
1.Generator<br>
协程基础，常见操作<br>
```js
function* Fibonacci(times){
    times=times||10;
    let v1=1,v2=1;
    while(times>=0){
        times-=1;
        yield v1+=v2;
        times-=1;
        yield v2+=v1;
    }
}
for(var n of Fibonacci(20)){
    console.log(n)
}
// 等价于
var g = Fibonacci(20);
for(var i=0;i<20;1++){
    console.log(g.next());
}
```
(甚至完全可以将gen函数写成死循环)

`Generator 在很大程度上完全可以接替Promise `

2.async

# module


# 解构扩展
1.数组解构

>

2.对象解构

>

3.应用

>


# 函数扩展
### 参数

### 属性

### 箭头

### 双冒号

### 优化

# 对象扩展
### promise

### set map

### proxy

### symbol

### reflect

# Iterator

# 方法扩展
### 字符串扩展


模板字符串

标签模板

### 正则扩展

### 算数扩展

### 数组扩展

# stage
ArrayBuffer

do 表达式

throw 表达式

表达式

链判断运算符

管道运算符
