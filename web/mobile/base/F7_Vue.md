# 前言

> 测试
> <br>
> https://stackblitz.com/edit/js-ruvbxn

# Vue
环境配置简单，webpack中配置好vue-loader几乎就完事了<br>如果有强迫症的想所有功能都玩上的直接看[这个](https://github.com/zhzLuke96/webpack.vue.tmpl.sample)(写的臭，但能用...)

> 值得注意的是，`framework7.vue`是完完全全通过Vue来构建的插件，所有需要在入口函数中`use`它，就像用`vue-router`一样

# framework7.Vue
> 简单说说：个人用起来其实并不很爽，主要是`f7`与`Vue`在某种程度上有一定职责交叉，写的时候常常要思考渲染一个页面应该交给`f7`封装的`ajax`呢还是应该让`Vue`来完成，两种方法显示肯定一样，但是带来的行为不一致性却有点恼人

> 特别感谢这个大大，根据这个repo解决了不少问题，也为我节约了很多挖坑的时间
> <br>`https://github.com/yawuling/vue-framework7`

bootCDN
> **CSS**<br>
> `https://cdn.bootcss.com/framework7/2.3.0/css/framework7.ios.min.css`
> <br>
> `https://cdn.bootcss.com/framework7/2.3.0/css/framework7.md.min.css`
> <br>
> `https://cdn.bootcss.com/framework7/2.3.0/css/framework7.min.css`
> <br>
> `https://cdn.bootcss.com/framework7/2.3.0/js/framework7.min.js`

### layout速记表（来自官方）
**静态**
```
.view
  .pages
    .page
      .page-content
        .navbar
        // other page content
        .toolbar
```
**Fixed**
```
.view
  .pages.navbar-fixed.toolbar-fixed
    .page
      .navbar
      .page-content
      .toolbar
```
**Through**
```
.view
  .navbar
  .pages.navbar-through.toolbar-through
    .page
      .page-content
  .toolbar
```


### template
> `https://github.com/nolimits4web/Framework7-Vue-Webpack-Template`
> <br>非官方模板，比较完整，这个是不带cordova的，我果然建议用这个入门好点

### cordova 入门
> 这个必须加，即使用了webpack(有歧义，其实就是cordova与webpack平级，两者不相干，所以需要使用cordova的功能需要标记引用。这个js会在cordova打包后一起包含)
```html
<script src="cordova.js"></script>
```
> document.addEventListener("backbutton", onBackKeyDown, false);
> <br>绑定返回按钮（安卓）

eq
```javascript
document.addEventListener("backbutton", onBackKeyDown, false);

function onBackKeyDown() {
    // Handle the back button
}
```
full
```javascript
document.addEventListener('deviceready', ()=>{
    document.addEventListener('backbutton', ()=>{
        navigator.notification.confirm(
          'Are you sure you want to quit?',
          buttonIndex=>{
            if (buttonIndex === 1) {
              navigator.app.exitApp();
            }
          },
          'Exit'
        );
    }, false);
}, false);
```
