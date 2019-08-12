# 前言
> https://blog.csdn.net/tong_11/article/details/80324451

英语学好真的很重要，可以自己爬doc，不然永远走在后人的后人后面

# READY
### jdk
> 这个就不说了（我本身就不是学java出身的耍得不6）
> <br>（精通各种语言...环境配置！）

### node
> https://nodejs.org/en/

> 我的建议是及时更新（不看重效率和特性的话，用最顺手的），最好不要用`n`来管理node版本，因为...`n`只能在linux上使

### Android SDK
> http://www.androiddevtools.cn/

> 不喜欢studio那种庞然大物的，下载100来MB的SDK就够了，模拟器随便找个国产的，毕竟debug的时候调试的不是java

> tips:安装完后用一般需要`SDK Mannager`增加不少的平台支持插件

### Gradle
> http://services.gradle.org/distributions/

> 下载并配置环境变量

***以上，是除去了前端部分所需环境，这些依赖配置完就可以安心使用了(看着麻烦`而已`)**

# cordova安装 配置 使用
```
npm install -g cordova
```
脚手架
```
cordova create hello com.example.hello HelloWorld
```
> ***目录说明***
> <br>hooks：`cordova`的脚本命令
> <br>config_xml：`cordova`的配置文件
> <br>www：开发目录，构建的时候`cordova`将这个目录直接copy到各个平台的打包的资源目录中
> <br>plugins：插件
> <br>platforms：生产目录，编译后会直接覆盖请注意这点

依赖
```
npm i html-minifier uglify-js clean-css
```
添加平台
```
cordova platform add android --save
```
查看项目平台设置
```
cordova platform ls
```
打包
```
cordova build android --debug
```
```
cordova build android --release --browserify
```
