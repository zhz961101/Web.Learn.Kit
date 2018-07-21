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
        this._bindSetter();
    }
    _updata() {
        $(this.ele).html(this.tpl.joint(this.data));
    }
    _bindSetter() {
        for (let variable in this.data) {
            let oldV = this.data[variable];
            let option = {}
            if (typeof oldV === "function") {
                option.get = () => {
                    return oldV(this.data);
                }
            } else {
                option.get = () => {
                    return this[variable];
                }
            }
            option.set = newVal => {
                this[variable] = newVal;
                this._updata();
            }
            Object.defineProperty(this.data, variable, option)
            this.data[variable] = oldV;
        }
    }
}
