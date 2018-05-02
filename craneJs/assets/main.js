'use strict';
// 记录当前这所有的代理方法
let actionsCollection = [];

let anonyFunctionDecorator = function(func){
    if (typeof func !== 'function') {
        throw new Error('just work for an function')
        return
    }
    if(func.name){
        return func;
    }
    let anonyFunction = function(){
        return func();
    }
    return anonyFunction;
}

class Delegate {
    constructor(tagName) {
        tagName = tagName || "body";
        this.tag = tagName.toUpperCase();
        this.el = document.querySelector(tagName);
    }

    // type 事件类型
    // aimTagName 需要监听事件的标签
    // action 回调函数
    on(type, aimTagName, action) {
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
        if (funcName) {
            actionsCollection.push({
                name: funcName,
                tag: aimTag,
                type: type
            })
        }

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
    off(type, actionName) {
        let temp = []
        // 不传入参数 将移除改元素上所有的事件
        if (!arguments.length) {
            actionsCollection.map(func => {
                if (func.tag !== this.tag) temp.push(func)
            })
        } else {
            // 如果只传入 type 将移除这个元素上的所有 type 事件
            if (!actionName) {
                actionsCollection.map(func => {
                    if (func.tag !== this.tag ||
                        func.type !== type) temp.push(func)
                })
            } else {
                // 同时传入两个参数 将移除这个元素上对应 type 的对应事件
                actionsCollection.map(func => {
                    if (func.tag !== this.tag ||
                        func.type !== type ||
                        func.name !== actionName) temp.push(func)
                })
            }
        }
        actionsCollection = temp
    }
}

// 不使用 new 关键字创建绑定对象
function D(tagName) {
    return new Delegate(tagName)
}
