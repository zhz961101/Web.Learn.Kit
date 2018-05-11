'use strict';
log("log tools runing!!");

let sigla = function(name,template,data,wath,subSiglas,mixwith){
    this.name = name
    // tpl
    this.tpl = new Template(template,subSiglas);
    // data
    this.data = {}
    _init_DateValueProperty(data,wath,mixwith)
    // mixwith
    // [
    //  base - > sigle
    // ]
    // data = copyof base.data
    // _init_data(data)
    //
    // wath
    // {
    //  data1:(newVal)=>{console.log(newVal)}
    // }
    // data.data1:set:(newVal)=>{
    //      setting...
    //      wath.data1(newVal)
    // }
    //
    // data=>self.data{
    // get:()=>{}
    // set:()=>{}
    // }
    this.assemble = ()=>{
        return this.tpl.joint()
    }
}

let eo = function(id,name,template,data,wath,subSiglas,mixwith){
    let _$ = document.querySelector;
    let addHtmlFunction = function() {
        this.html = function(_newHtml) {
            if (this.empty) {
                return ''
            }
            let ele = typeof this.data[0] !== "undefined" ? this.data[0] : this.data;
            if (!_newHtml) {
                return ele.innerHTML;
            } else {
                ele.innerHTML = _newHtml;
                return _newHtml;
            }
        }
    }
    this.el = addHtmlFunction(_$(id));
    this.sigla = new sigla(name,template,data,wath,subSiglas,mixwith)
    this.render = ()=>{
        this.el.html(this.sigla.assemble())
    }
    this.rerender = ()=>{
        this.render()
    }
    // on,emit
    this.Event = (()=>{
        let subscribe = {}
        let isFunction = (obj)=>{
            return typeof obj === "function"
        }
        // channel : [function,]
        return {
            on : (channel,fn)=>{
                let old = subscribe[channel];
                subscribe[channel] = function(){
                    if(isFunction(old)){
                        old()
                    }
                    fn()
                }
            },
            emit : (channel)=>{
                if(isFunction(subscribe[channel])){
                    subscribe[channel]()
                }
            }
        }
    })()

    this.$on = this.Event.on;
    this.$emit = this.Event.emit;

    let _init_bind = (channel,fn)=>{
        let arrMerge = (a,b)=>{
            return a.push.apply(a,b);
        }
        let support_list = ["resize","load","click","change"]
        support_list = arrMerge(support_list,[
            "blur",
        ])
    }
}


// <a bind:herf="url"></a>
// <a herf="<% url %>"></a>
// <a on:click="alertLove"></a>
// <a data-event-id=random></a>
//
// upper.addlisenter("click",(e)=>{
//      e.target.getAttribute("data-event-id")==random?alertLove(e):undefined;
// })
//
// <input model="url"></input>
// <input bind:value="url" on:onchage="()=>{url=this.value}"></input>
//

class Delegate {
    constructor(tagName) {
        tagName = tagName || "body";
        this.tag = tagName.toUpperCase();
        this.el = document.querySelector(tagName);
    }

    // type 事件类型
    // aimTagName 需要监听事件的标签
    // action 回调函数
    on(type, aimTagId, action) {
        if (typeof action !== 'function') {
            throw new Error('action must be an function')
            return
        }
        action = anonyFunctionDecorator(action);
        const funcName = action.name
        const aimTag = aimTagName ? aimTagName.toUpperCase() : this.tag // 如果 aimTagName 不存在 则绑定到自身

        // 如果不是匿名函数 则记录当前的事件
        // tag 该事件绑定的标签
        // type 记录触发类型
        actionsCollection.push({
            name: funcName,
            tag: aimTag,
            type: type
        })

        this.el.addEventListener(type, e => {
            if (e.target && e.target.nodeName.toUpperCase() === aimTag) {
                if (!funcName) { // 匿名函数 直接执行 不需要判断是够已经移除
                    action(e)
                } else { // 处理非匿名函数 函数可以被移除
                    // 由于一个函数可能被用于多个标签上 所以此处要遍历所有的代理方法
                    actionsCollection.map(func => {
                        if (func.name === funcName &&
                            func.tag === aimTag &&
                            func.type === type) action(e)
                    })
                }
            }
        })
    }

    // type 事件类型
    // actionName 需要移除的函数名
    off(type, aimTagName, actionName) {
        let temp = []
        aimTagName = aimTagName ? aimTagName.toUpperCase() : this.tag;
        // 不传入参数 将移除改元素上所有的事件
        if (!arguments.length) {
            actionsCollection.map(func => {
                if (func.tag !== aimTagName) temp.push(func)
            })
        } else {
            // 如果只传入 type 将移除这个元素上的所有 type 事件
            if (!actionName) {
                actionsCollection.map(func => {
                    if (func.tag !== aimTagName ||
                        func.type !== type) temp.push(func)
                })
            } else {
                // 同时传入两个参数 将移除这个元素上对应 type 的对应事件
                actionsCollection.map(func => {
                    if (func.tag !== aimTagName ||
                        func.type !== type ||
                        func.name !== actionName) temp.push(func)
                })
            }
        }
        actionsCollection = temp
    }
}
