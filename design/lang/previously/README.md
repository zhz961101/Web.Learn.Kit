> 这里是自己的一些东西，可能会抱到zturn下

# README
面向高级语言的软`虚拟机`，准备用JS和PY都搞搞看

基本上交叉了计科所有内容，大目标的话是实现在这个虚拟机上运行的`lisp方言解释器`


# 试水
```javascript
var REG = {AX:0,BX:0,CX:0,IP:0,IR:true} // IR:isRuning
var code = "" // some code
var STACK = [] // just STACK.pop or push , not set SP option in REG

ver fetch = ()=>code[REG.IP]
var _eval = function(_inst_){
    switch(_inst_){
        // PSH,POP,ADD,SUB,SET,HTL,JMP
    }
}
var run = function(){
    while(REG.IR){
        _eval(fetch());
        REG.IP+=1;
    }
}
```
结构非常简单，甚至寄存器直接操作的是动态数据，但是结果是很让人兴奋的：
```javascript
var code = `SET AX 1
SET BX 1
SET CX 10
ADD AX BX
DIS AX
ADD BX AX
DIS BX
SUB CX 1
CMP CX 0
JE 11
JMP 3
HTL`.split("\n")
```
（果然汇编不是人写的，那么简单的功能编成这么粗糙的汇编仍然难以看懂）
<br>CX用来控制循环条件，这个程序将求解斐波那契数第3-23个，并打印出来(DIS)

> 有意思吧

# LISP
### b
> 题记：<br>
> 基本定了栈+语义指令集的VM和

beta 随便写点能写的，差不多了解了整个编译管道就可以开搞了

interpreter.js

> 简单解释器，测试call/cc还有动态scoped<br>
> _TEST_函数算是教程，就是基本的lisp语法<br>

```javascript
let AST = Scheme.parse(program)
let res = Scheme.eval(AST)
```
```Scheme
(def r 10)
(def PI 3.141592654)
(* PI (* r r))
(if (and (>= 3 2) (<= 3 5)) (* 3 3) (* 3 7))
```
output
```
// eval TEST (def r 10)
 [_DEFINED_]
// eval TEST (def PI 3.141592654)
 [_DEFINED_]
// eval TEST (* PI (* r r))
 314.1592654
// eval TEST (if (and (>= 3 2) (<= 3 5)) (* 3 3) (* 3 7))
 9
```


p

> python 相关的（这种后台的东西还是python好使，node那些个库真滴难用）
