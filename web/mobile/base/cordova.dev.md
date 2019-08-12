# 如何解决所有问题？
> 1.debug framework && debug vue

> 2.Pls!Carefully before debug the [Document](https://framework7.io/docs/) (NOT CN)!

插件问题看ionic的一些内容也很有帮助

> http://www.ionic.wang/ng_cordova-index.html

# devlop log
爬坑记录

# 原生事件

```javascript
document.addEventListener('deviceready', ()=>{},false)
```

需要先监听这个，然后绑定其他事件，要是vue对象里的onF7init没问题的话直接在里面绑定事件应该也是可以的，不过用最通用的吧。onF7这个方法好像不能触发，不知道为什么

> backbutton
>
> ```javascript
> document.addEventListener('backbutton', () => {
>   if (this.$f7.views.current.history.length != 1) {
>     // Use Framework7's router to navigate back
>     this.$f7.views.current.router.back()
> }else if(!this.$f7.views.current.main){
>     // back main view, but ... i dont konw how code it ...
> }else {
>     this.$f7.dialog.confirm(
>       'Are you sure you want to quit?','Exit',
>       navigator.app.exitApp,
>       ()=>{}
>     );
>   }
> })
> ```
>
> <br>this.$f7
> : framework7 对象，每个版本的实现可能都不同，最好把this打开看看（这是最新版本上我能用的结果）
> <br>this.$f7.views.current.history.length != 1
> : 如果还可以back就run back function
> <br>else if(!this.$f7.views.current.main) :
> 这个用于判断是不是main view，比如左滑panel就不是，希望的是可以将侧边栏收回
> <br>this.$f7.dialog.confirm,这个并非f7-vue里独有，看官方doc就可以，描述很清楚。空函数是说这里还有一个点击取消后的处理函数
> <br>navigator.app.exitApp: 调用原生接口，退出程序

除了返回键，其余事件都有，包括音量键，具体的看[这个](https://cordova.apache.org/docs/en/8.x/cordova/events/events.html)V8.x(latest)

| Supported        | android | ios | Windows |
| ---------------- | ------- | --- | ------- |
| deviceready      | √       | √   | √       |
| pause            | √       | √   | √       |
| resume           | √       | √   | √       |
| backbutton       | √       | ×   | √       |
| menubutton       | √       | ×   | ×       |
| searchbutton     | √       | ×   | ×       |
| startcallbutton  | ×       | ×   | ×       |
| endcallbutton    | ×       | ×   | ×       |
| volumedownbutton | √       | ×   | ×       |
| volumeupbutton   | √       | ×   | ×       |
| activated        | ×       | ×   | √       |

# 打包js压缩问题

> <https://blog.csdn.net/lovelyelfpop/article/details/56014300>

### browserify

    cordova build android --browserify

将插件合并打到一个文件中，减少资源获取，插件多的时候很必要

### Hooks

真压缩，在after_prepare钩子上调用css,js的压缩工具

> <https://github.com/adamerny/cordova-minify-v2>
> <br>tip:需要配置cordova/plugins.xml
>
> Debug 打包：运行cordova build android --browserify，将所有（cordova相关）js统一
>
> Release打包：运行cordova build android --release --browserify，不仅打包js文件，还压缩。

> cordova minify 最新版（虽然是两年前）的增加了imagemin的支持，所以还需要增加这个依赖

```
npm install -D clean-css html-minifier uglify-js imagemin imagemin-svgo imagemin-jpegtran imagemin-gifsicle imagemin-optipng
```

# F7 3.x

下面列出一些新旧教程不同的地方
> 如果是f7-Vue的话就是写到F7parapem

### swipepanel

```javascript
var app = new Framework7({
  // App root element
  root: '#app',
  // App Name
  name: 'My App',
  // App id
  id: 'com.myapp.test',
  // Enable swipe panel
  panel: {
    swipe: 'left',
  },
  // Add default routes
  routes: [
    {
      path: '/about/',
      url: 'about.html',
    },
  ],
  // ... other parameters
});
```

### onF7Init
old:
```javascript
vue({
    // ...
    mouted:{
        onF7init(){
            this.$f7.dialog.alert("F7init")
        }
    }
    // ...
})
```
new:
```javascript
var app = new Framework({
  on: {
      init:function(){
          this.dialog.alert("F7init")
      }
  }
})
```

内部调用没有太大变化，主要是初始化不同，看[文档](https://framework7.io/docs/app.html#app-parameters)，多思考

### immersiveMode
沉浸app，移动端，没有沉浸式基本就和高端两个字无缘了，这属于必修课

全屏，最简单的沉浸，没有状态栏，在config.xml里设置
```
<preference name="Fullscreen" value="True" />
```
找了网上csdn很多教程，都需要改原生java，虽说不复杂，但是总感觉...额

找到了[这个](https://github.com/mesmotronic/cordova-plugin-fullscreen)，安卓端的沉浸插件，也没有测试机，暂时不考虑ios

安装
> cordova plugin add cordova-plugin-fullscreen

调用
> AndroidFullScreen.immersiveMode(successFunction, errorFunction);

状态栏全透明
```
cordova plugin add cordova-plugin-statusbar
```
config.xml
```
<preference name="StatusBarBackgroundColor" value="transparent" />
<preference name="StatusBarOverlaysWebView" value="true" />
```

### 打包问题
> Expecting UnicodeEscapeSequence -- uXXXX

具体是什么问题还在排查...怀疑是node版本的问题...
在没更新node之前都是好的

难受
