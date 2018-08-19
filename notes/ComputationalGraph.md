# 计算图
又是一个简写为CG的东西，这里会记录一些自己的学习笔记

> 之前再看neat的时候，就幻想过一些node/link/gate之类的构思，没想到...还是太天真，应该早点静下心来看看，学学

# 什么是
function的抽象，是建模的第一步，正常情况，或者在我们入门的时候都会一layer作为基本单元，但是渐渐的这并不能描述一些新东西，（RNN以后的基本都脱离了层这个概念—）计算图就这么诞生了，现在很多教程，或者课程，还是一层为基础，是非常不负责任的

> 其实这是个非常老的理论，至少有20年的历史了

# Computational Graph Theory
[参考](https://jizhi.im/blog/post/deep_learning_from_scratch_1)
加上连接路径共四种符号

- 圆形：运算符opt
- 直角方形：输入placeholder
- 圆角方形：变量Variable

Tensor：张量
