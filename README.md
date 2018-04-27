<H1 id="readme" align = "center">README</H1>
&emsp;&emsp;这里收录一些前端学习阶段get到的实用小模块，这里只写how to use，详细的介绍和扩展可能或者todo会在相应目录下添加。
<br>

|Author|三石|
|---|---
|E-mail|zhz961101@gmail.com
|qq|474591987

# TemplateEngine
```javascript
var template_html =`
    <div id="hobby">
    <h1>My hobby:</h1>
    <%for(var index in hobby) {%>
        <%if(hobby[index].taboo && !showTaboo) {%>
            <% continue %>
        <% } %>
        <a href="#"><% hobby[index].content %></a>
    <% } %>
    </div>
    `;// ↑ ES6 template =.=||
var template_data = {
    hobby: [
        {
            content:"code",
            taboo:false
        },
        {
            content:"game",
            taboo:false
        }, {
            content:"loli",
            taboo:true
        }],
    showTaboo: false
};
var tE1 = new TemplateEngine(template_html);
var template_text = tE1.joint(template_data);
```
template_text:
```html
<div id="hobby">
    <h1>My hobby:</h1>
    <a href="#">code</a>
    <a href="#">game</a>
</div>
```
> 小而强大的一个模块，但是并没有编译原理那一套大怪兽，使用的是基于正则匹配的一种简洁取巧的实现方法

> todo:如果有可能我想尝试一下类似vue中的数据绑定，看上去应该并不难
# MasonryLayout
```javascript
var index_config = {

};
var pLayout = new pinterestLayout(index_config);
pLayout.AppendEle(newEle);
```
> 正在重构（重写）中，之前用gird布局完成的版本确实可以用，但是可操作性太低，性能优化也很困难，准备重写为相对定位的新版本布局

> todo:目标是删烦就简
# randTextGen
```javascript
console.log(randomWord(7));
console.log(randomWord());
// may print => oxoyluz
console.log(randomNumStr(3));
console.log(randomNumStr());
// may print => 147
console.log(randomSentence(10,true,5,1))
console.log(randomSentence())
// may print =>
// Xtrtcuh akwtix w r oz cc puca epz yswegf khmzx
console.log(randomText(2,9,2));
// may print =>
// Rqprfo a cep tuildv rxby fm, Fdrjods is soqok yjmj e qdro wmn!
```

> 目前就是一个简单到不能再简单的随机文本生产器
> <br>其中有一个基于虫口模型的随机数生成器，很魔性，在里面我会针对这个内容再展开，或者写在blog里

> todo:准备运用从weibo爬到的语料做一个马克洛夫链的文本生成器（以后就可以自己给自己的微博评论辣，苦）
# liteDomSelector
```javascript
my$("#id222").html(my$("#id222").html()+'<br/>!!!!!!');
my$("#id222").text();
```
> 很多时候，我们会思考，jquery不仅好用还好大！明明...我只用了选择器和常用操作...
> <br/>这个包就是这样的思路，实现（用新的方法、特性）jq中最常用的方法

> todo:更多的方法，至少在下次想用jq的时候可以代替它
> <br/>tip:这个可能在以后会单独独立出来，已经不是个小工具了啦，并且对前端优化我还有一个大胆的想法。
# canneJs
> 哈，这就是大胆的想法
> 可惜还没开始

> todo:像工厂里的起重机（crane）一样统一调配工地施工设施的安放问题（dom事件管理以及虚拟dom层实现）
# ProRequest
```javascript
var ajax1 = proRequest({
    method: "GET",
    async: true,
    url: "./test10.json"
});
ajax1.then((response) => {
    log(response);
    console.log(response);
}).catch((errorStr) => {
    log(errorStr)
})

var ajax2 = proRequest({
    method: "GET",
    async: true,
    url: "./text1.txt"
});
ajax2.then((response) => {
    log(response);
    console.log(response);
}).catch((errorStr) => {
    log(errorStr)
})
```
> 就是简单的把xmlhttprequest封装成了promise的样子
> <br/>像ajax，至少就我目前来看日常够用了

> todo:接下来会加入一些支援异步操作的方法，以及类似axios的包装
# log
```javascript
log("some string");
log({name:"sanshi",age:18})
```
> 去除了以前莫名其妙的带有UI的printpage，用来个简单的类似dos输出框的普通方法，每段输出会带有时间戳以及表明EOF，方便异步调试，详细代码在项目模板中
> 为什么浪费时间写这个呢，主要是最近毕业招聘季，发现写前端代码最要命的就是把时间浪费在打开console上，所以就想到了写一个在网页输出内容的模块
> <br>并不完整，相对于其他的扳手，这个就是个别针

> todo:优化样式，解析json，简单的高亮
> <br>注意：print函数被覆盖之前是用来浏览器调用打印机API的，如果你需要这个函数，请修改。
# web.Object.templ
> 包含基本的脚手架
> <br/>以及log函数的实现
# tooltips
> 就是一个css实现的小工具
> <br/>做一些简单易用的多文档框架
# 其他
&emsp;&emsp;JavaScript可真**有意思。
<br>
&emsp;&emsp;（面试官：还不错，就是基础不好。）
<br>
&emsp;&emsp;如果你有什么好的想法请尽快联系我，Thx！

<p align = "center"><a href="#readme"><img src="https://img.shields.io/badge/%E5%9B%9E%E5%88%B0-%E9%A1%B6%E7%82%B9-lightgrey.svg" alt="回到顶部" /></a></p>
