# 面向面试学习
- qu.: question,<br>
- algo.: algorithm,<br>计算机网络，数据结构，算法
- .html: 一个页面就能说明的问题

自我要求:<br>
algo > qu > .html

# 杂记
就在这里记一些遇到的问题，基础差一面的效果非常不好，需要强化一下，理论什么的搞一个

# front-end-interview-handbook
[参考](https://github.com/yangshun/front-end-interview-handbook)

### CSS
> 比较薄弱的地方，毕竟真的写的少

##### **优先级**
    先依次判断有没有内联样式，有没有ID选择器#，然后根据（类，属性，伪类选择器）之和、（标签(div)选择器）之和来分层判断优先级

    tips：这是作用优先级，也就是应用优先级的倒序

    比如
```css
div                {background-color: AntiqueWhite;}
[other]::before    {content: "bar";}
div[other]::before {content: "-";}
.blue[green]       {background-color: yellow;}
[green]            {background-color: green;}
.blue              {background-color: blue;}
#black             {background-color: black}
#red               {background-color: red}
#red               {background-color: Brown}

div#app.other[foo]::after{}
```
    以上选择器从上到下依次增强


##### **css reset**
    这个很简单
```css
*{
    padding: 0;
    margin: 0;
    border: 0;
    box-sizing: border-box;
}
```
    这就是，作用就是控制各端的样式统一

    这个很多人反对，我个人支持，跨平台统一view很重要
    不过工程化的项目还是推荐 Normalize.css


##### **float定位原理**
    首先，float是相对的，很多时候float更适合一些相对定位的情况
    正常情况float不会让node阻挡文档流
    
 `但是如果设置了overflow: auto或overflow: hidden，会使其内部的子元素形成块格式化上下文（Block Formatting Context）`
    
    (正常情况是行内格式化上下文，也就是横着排)
    flex就是BFC，常用BFC布局就很容易对布局感觉混乱

    tips:BFC主要的作用就是把超出正常流的元素包到父级元素里

> 清除浮动：
> - 父级设置overflow
> - 前面后面设置clear
> - 用::after
> - 以及最简单的下面这种
> `<div style="display: none;clear: both;"></div>`


##### **定位问题**
> - static： 跟随文档流
> - Float: 头尾定位，定位于盒头(left)或尾(right)
> - relative： 偏移定位
> - Absolute: 脱离文档，自己相对最接近的relative、fixed、absolute元素定位
> - fixed: 脱离文档，只根据浏览器窗口定位

##### **Z-index**
    层叠上下文，所有没有设置z-index的元素都在根层叠上下文之中
    且所有层叠上下文都是在node内scoped的

    默认的层级顺序是`谁先谁高`，而层级上下文的应用顺序是`谁后谁高`
    也就是说同一级的将会后来居上
    比如两个z-index设置为99(或者-1或者0)，就会应用`谁后谁高`而设置auto的话会以默认层级顺序排序(且不会因为整数而限制)

##### 雪碧图
    作用就是减少服务器的请求，解决一些伪类设置图片的时候加载慢的问题
    background-position和background-size

##### 兼容性
> - webpack: autoprefixer
> - Bootstrap
> - Normalize.css
> - css hack: _ie6 *+ie7
> - 渐进式增强: 支持再创建

##### svg
> - 文本可被搜索
> - 文本方便编辑
> - 伸缩不影响显示质量

##### media 属性
    todo...

##### 盒模型
    不同的盒模型对content的定义不同，content决定了元素的宽度高度

> - 默认的content、padding、border分层叠加，尺寸只算content，并根据等于设定的值
> - border模型，ie默认模型，就是整个盒子都算content，并算尺寸
> - margin虽然不算入尺寸中，但是它占据一定的位置，等于没有样式的空白部分（这部分的大小js中要用.outerHeight(true)拿）

### HTML

##### **说下你觉得HTML5是什么？**
> - 浏览器统一
> - 可以替代一部分js代码
> - 语义标签 footer header nav
> - 多媒体 video canvas webgl
> - API localstorage sessionStorage webworker

##### **DOCTYPE有什么用 模式有什么区别**
    document type，声明HTML文档的模式，如果不声明会采用怪异模式
    怪异模式就是指的不确定模式，不同的浏览器感觉自己的标准渲染页面
    在html5中声明`<!DOCTYPE html>`就行不用指定dtd

    tips:dtd中会定义一些标签属性的属性，比如onclick是脚本类型，而id为ID类型，title是文本类型这些东西，以及一些基本颜色定义

##### **多种语言内容的页面**
    这一般由后台主导，根据请求头判断语言环境，如果有这个环境的HTML文档，或者可以生成这样的文档就返回，并在html标签注明lang="xx"

    而现在流行的SPA中，多语言页面主要由相应的前端插件完成，如vue-i18n

    tips:常见的问题主要在，时间显示，阅读顺序，以及使用模板导致语序不匹配的问题。均只能特异化解决

##### **储存方式**
> - cookie: 兼容性，通用，需要手动设置，限制4kb
> - localStorage: 5mb限制，不过期
> - sessionStorage: 5mb，页面一关就没有

    tips: 在所有类型的请求中都会带上cookie，并且可以从服务端设置
    都有安全问题，因为客户端都是明文储存

##### **link 和 script 标签的位置**
    把link style放在head中是标准定义的做法，如果不这样不同浏览器容易产生歧义
    script放在body的最后，是为了让浏览器解析完再执行脚本，这么做的原因有很多
> - 在加载js脚本的时候是阻塞的，js卡了还没解析的html也不会显示
> - js中常常要操作dom元素，放最后也保证了dom节点正确获取
> - 使用defer属性可以使script异步加载，但是如果上下脚本有关联的话容易出现找不到对象之类的问题
> - 如果使用jqery的话可以在其他地方写，也能最后执行，等价于window.onload

##### **progressive rendering**
> - 懒加载 滚动加载
> - 渲染优先级，暂时显示不出的用一定的load元素替代，比如utb的布局
> - 拆分html css js，webpack可以进行一定程度自动化

##### **srcset**
    img的响应式抓取，主要是减少不必要的渲染，比如一个100px的正方形img没必要去加载一个可以作为壁纸的图片

##### **模板语言 HTML**
> - jinja:python flask里的，基本用法有点像jsp
> - jsp:java的
> - Poi-Tpl: 我自己的小框架中的模板语言，嵌套原生js

### JS
这部分比较复杂，会在其他文档中写
