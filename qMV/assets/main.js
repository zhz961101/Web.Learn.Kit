'use strict';

var $ = my$;

let deepCopy = (obj) => {
    return JSON.parse(JSON.stringify(obj));
}

function getType(obj) {
    //tostring会返回对应不同的标签的构造函数
    var toString = Object.prototype.toString;
    var map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object'
    };
    if (obj instanceof Element) {
        return 'element';
    }
    return map[toString.call(obj)];
}

function deepClone(data) {
    var type = getType(data);
    var obj;
    if (type === 'array') {
        obj = [];
    } else if (type === 'object') {
        obj = {};
    } else {
        //不再具有下一层次
        return data;
    }
    if (type === 'array') {
        for (var i = 0, len = data.length; i < len; i++) {
            obj.push(deepClone(data[i]));
        }
    } else if (type === 'object') {
        for (var key in data) {
            obj[key] = deepClone(data[key]);
        }
    }
    return obj;
}

class Ele {
    constructor(_el, _data, _template) {
        this.ele = _el
        this.data = deepClone(_data) || {}
        this.tpl = new TemplateEngine(_template ? _template : $(_el).html);
        this._updata();
        this._bindSetter(this);
    }
    _updata() {
        $(this.ele).html(this.tpl.joint(this.data));
    }
    _bindSetter(that) {
        for (let variable in this.data) {
            let oldV = this.data[variable];
            if (typeof oldV === "function") {
                Object.defineProperty(this.data, variable, {
                    get: () => {
                        return oldV(that.data);
                    }
                })
            } else {
                Object.defineProperty(this.data, variable, {
                    get: () => {
                        return this[variable];
                    }
                })
            }
            Object.defineProperty(this.data, variable, {
                set: (val) => {
                    this[variable] = val;
                    that._updata();
                }
            })
            this.data[variable] = oldV;
        }
    }
}

let tpl_text2 = `
<br><span style="color:red"><% typeName %>Now time:<% time %><span><br>
`

let ele1 = new Ele("#app2", {
    typeName: "Clock!!!",
    time: (self) => {
        return self.typeName + new Date().toLocaleTimeString()
    }
}, tpl_text2)
//
// setInterval(()=>{
//     ele1.data.time = new Date().toLocaleTimeString();
// },1000)

setInterval(() => {
    ele1.data.typeName = "NOW!!!";
}, 1000)

setInterval(() => {
    ele1.data.typeName = "HAPPY!!!";
}, 3000)
