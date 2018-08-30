# 生啃pyvim
看了几个简单的实现，想要完成一个逞心如意的ide还是有难度，就我的经验来看，模仿是最佳的途径

这里我将尽可能详尽的分析[pyvim]()的源码，终极目的还是实现自己的生产工具

# 开始
> 万事开头难，头铁一点，啥事都能成

由于其本身是复刻版，并且是在prompt_toolkit的基础之上的产物，就不会选择比较旧的版本减少代码量，我们直接上！

#### index
- root 基本是和插件的对接
- io 编辑器接口支持（这部分挺规范的）
- entry 生产环境的一些东西，没什么重要的
- commands vim的主要实现，组合操作的定义都在里面，看上去每个操作的功能并不多，实现下来四舍五入就是一千行
- tests 单元测试

#### easy
    welcome_message.py
    没用使用py3的模板字符串特性，看着有点别扭，大概那个意思，不分析了

    help.py
    帮助文档，如果我写，绝对不会用`py`文件写...

    enums.py
    兼容py2(其实我也不太确定究竟兼容不兼容)

    lexer.py
    字数不多，但是联系了`buffer`模块，作用是根据文件类型使用不同的语法高亮，怎么判断文件类型，这里是采用了`PygmentsLexer.from_filename`这个模块，需要考究一些怎么用的

    rc_file.py
    rc具体指什么全称不太清楚，这个模块的功能是调用配置文件pyvimrc，配置文件其实就是一个py文件，通过py代码配置

    reporting.py
    调用pyflakes做语法检查，看上去是做测试的时候用的？

    style.py
    定义了两种默认色彩风格
> __all__ 对于py项目很重要

> 这库很注重兼容性，大量使用了six库。我个人不怎么感冒，本来就写个工具没必要嘛

#### other ( root )
直击要害，我主要不太清楚tab edit pager这些，这几个内容也分布在buffer editor layout几个部分

    这几个部分以buff为底，构建WindowArrangement（它替代了prompt_toolkit的一些实现部分）还原vim的tabpage功能，layout就是对每个组件的布局进行了定义，比如底部状态栏里每个状态应该显示什么（prompt_toolkit布局有点意思，从某种程度上说不定可以对接html或者类xml语言，不过这东西是肯定不会有人写的），edit类实现一个编辑器的功能，大概是最后一层，包括io也是在这个模块中使用

总结一下，虽然囫囵吞枣过了一遍，大概有个概念，总体还是有点复杂，prompt_toolkit没法实现tabpage功能？不至于吧
