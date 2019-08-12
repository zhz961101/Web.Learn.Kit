# arrow function
箭头函数

# this question
```javascript
((c) => {
  this.b = 2;
  console.log(this, c)
})(3);

((c) => {
  this.b = 2;
  console.log(this, c)
}).apply({
    a: 1
  }, [3])

  ~ function() {
    ! function(a) {
        console.log(this);
      this.a = a;
      (() => {
        console.log(this)
      })()
    }(1)
  }()
```
简单说，箭头函数和普通函数的最大区别就是`this`指向，箭头函数就是无法指定，或者改变`this`的匿名`function`

由上原因，导致一些js常用操作下箭头函数行为会不易理解

### json对象
json对象中的function，在预编译后会将this指向父级容器，当然如你所猜想的，这一操作仅仅是用了bind这类的方法（js版本众多并无考证，笔者实验得出），因此json对象中的箭头函数this无法指向json对象

# 其他
箭头函数，即使已经公布很久，但是并没有特别明确的行为定义，特别是作为一个语法糖，在别的语法糖中的表现，它是很模糊的

比如，node V8环境和chrome V8环境下上方给出的代码会有一些不同，当箭头函数搜寻不到this时，node只会找一级没有的话为空对象，chrome环境下，会递归寻找，知道window对象（看上去是为了兼容性，总感觉会某种情况死循环？）
