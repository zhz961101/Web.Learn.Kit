# lambda
函数式编程语言的根

# 啥啥啥，都是些啥
真的服，网上各种教程，文章，我是真滴看懵了...既然是写个自己看的就别发出来，暴露给搜索引擎，祸害别个

要说看懂，只有[这个](http://mindhacks.cn/2006/10/15/cantor-godel-turing-an-eternal-golden-diagonal/)

### 思
就说了一个东西，"函数就是一切"，或者lambda就是一切，或者"一切都是函数"
```
<expr> ::= <identifier>
<expr> ::= lambda <identifier-list>. <expr>
<expr> ::= (<expr> <expr>)
```
上面这些加两个规则：<br>
- 变量无实意，仅用于区分
- 式中无运算，仅参数替换，然后拿掉lambda，直到变成最简函数

> λx.x λy.x y z 应该理解为 λ x. (x (λy. ((x y) z)))
> <br><br>
> Y := λy. ((x y) z)<br>
> X := λx. (x Y)

λx可以简单理解为现在应该`替换`这个叫做x的变量，在我的表达式里

# boolean
- true := λx. (λy. x)
- false := λx. (λy. y)
- if E1 then E2 else E3 := E1 E2 E3

> 基本可以说是，根本不是我们所想的真假，这里只是一个吞噬参数的过程，真假的不同是吞先喂的还是吐先喂的
> <br>也就是说这里并非传统的真假，仅仅是两选择功能的函数

### 逻辑运算
- not := λ a.a (λ bc.c) (λ de.d)
- and := λ ab.ab (λ xy.y)
- or := λ ab.a (λ xy.x) b

人话：

    否，就是给一个接受两个参数的函数传送两个吞噬第二个参数的函数
    换一个说法，not其实是将函数false和true分别作用于a上，加上true其实就是选择第一个，也就是选择了false，同理false实现了not逻辑

    与，让a选择b或者false。
    逻辑上看就是如果第一个是假，就选择false，是真的话就再看第二个参数

    或，同理

妙啊！

- not := λ a b c.a c b
- and := λ a b.a b a
- or := λ ab.a a b

服

> 可是，这玩意有屁用？学过lisp的应该猜到了，那就是下面(pair)

### 条件
- IS-ZERO := λ a.a false not false
- LEQ := x y. IS-ZERO (SUB m n)
- EQ := x y. AND (LEQ x y) (LEQ y x)

# pair
> cons，就是lisp里的cons

    - makepair x y := mkpr x y := λb. (b x y)
    - first pair := fst p := p true
    - second pair := snd p := p false
上面这种写法感觉很奇怪啊？我觉得应该写成这样才是对的，也符合惯性思维，不知道为什么找到的所有中文文章里都是上面这么写

- mkpr := λ x y. λb. (b x y)
- fst := λ p. p true
- snd  := λ p. p false

结合boolean吞吐的效果，取出pair里的元素

- cons := a b f.f a b
- car := p.p TRUE
- cdr := p.p FALSE
- nil := x. TRUE => x1. (x2 y.x2) => x1 x2 y.x2
- null := p.p (x y.FALSE)
- len := Y (g c x. null x c (g ))


# number

### Church
- 0 := λ f x. x
- 1 := λ f x. f x
- 2 := λ f x. f (f x)
- 3 := λ f x. f (f (f x))

???<br>
等等这是啥？递归？嵌套？不是，这是重复调用，调用的次数就是这个值(函数)代表的数值...

是这么个道理

### 运算
不能算还算什么数

    切，简单啊，加法就是在外面再套个f，inc a => f(a)
    不就完事？好，我们尝试一下，定义这个inc
    inc := λ n. f(n)
    耶~屁啊，f是啥？f(n)使我们想要的 f 与 x 组成的自然数吗？显然，不是
    首先，我们要一个抓取body的函数
    body := λ n. n f x
    body 2 => (λ n. n f x) (λ f x. f (f x)) => f (f x)
    然后在body上加f再套上lambda
    inc := λ n f x. f(body n) => λ n f x. f((λ n. n f x) n)
    => λ n f x. f(n f x)
    带入零试试 inc 0 => λ n f x. f(n f x) λ f x. x
    => λ f x. f x => 1

    (上面和看上去一样，都是废话)

# 递归 Y
> Y := λ y. (λ x.y (x x)) (λ x.y (x x))
> <br> := λ y. y ((λ x.y (x x)) (λ x.y (x x)))
> <br> := λ y. y (y ((λ x.y (x x)) (λ x.y (x x))))
> <br> := λ y. y(...y())

娓娓道来

`**lambda函数的函数名就是某个参数名**`

首先，我们从一个阶乘函数
```python
def fact(n):return n*fact(n-1) if n > 0 else 1
```
这个用lambda怎么写呢？？好像根本摸不着头脑啊
```python
metafact = lambda fact: lambda n:1 if n is 0 else n * fact(fact)(n-1)
fact = metafact(metafact)
# fact = (lambda fact: lambda n:1 if n is 0 else n * fact(fact)(n-1))(lambda fact: lambda n:1 if n is 0 else n * fact(fact)(n-1))
```
啊！哦！居然！真是让人余音绕梁的代码

### 不动点
Y := f. (x.f(x x)) x.f(x x)


# lambda组合子演算
- S := x y z. (x z (y z))
- K := x y. x
- I := x. x

    很正常的式子啊？咋滴？
    i := S K K
    猜猜这个是啥？
    => x y z. (x z (y z)) (x y. x) (x y. x)
    => z.((x y. x) z  ((x y. x) z))
    => z. y.z y.z => z.z
    ????????!!! 不是吧！
    i := I
    实际上，SK可以创造任意lambda运算表达式
