let printlog = console.log;
let _strict = false; // dont use document.querySelector
let _modleDebugOn = true; // open some debug console log call
var my$ = (function() {
    let renameProperty = function(srcName,_name,fn){
        this.__proto__[_name] = function(_newVal) {
            if (this.empty) {
                return '';
            }
            let ele = typeof this[0] !== "undefined" ? this[0] : this;
            return fn(ele,srcName,_newVal);
        }
    }
    let gsProp = function(ele,srcName,val){
        if (!val) {
            return ele[srcName];
        } else {
            ele[srcName] = val;
            return val;
        }
    }
    let addHtmlFunction = function() {
        renameProperty.apply(this,["innerHTML","html",gsProp]);
    }
    // arguments
    let addDataFunction = function() {
        renameProperty.apply(this,["getAttribute","data",function(ele,srcName,val){
            return ele[srcName]("data-"+val);
        }]);
    }
    let addTextFunction = function() {
        renameProperty.apply(this,["innerText","text",gsProp]);
    }
    let addValFunction = function() {
        renameProperty.apply(this,["value","val",gsProp]);
    }
    let addEachFunction = function(){
        if (this.empty) {
            return ''
        }
        this.__proto__.Each = function(_func){
            for (let _index = 0; _index < this.length; _index++) {
                _func(this[_index],_index);
            }
        }
    }
    let setAllProps = function(_eleData){
        _eleData.__updataed__ = true;
        addHtmlFunction.apply(_eleData);
        addEachFunction.apply(_eleData);
        addTextFunction.apply(_eleData);
        addDataFunction.apply(_eleData);
        addValFunction.apply(_eleData);
        return _eleData;
    }
    if (document.querySelector && !_strict) {
        _modleDebugOn?printlog("used document.querySelector()"):"";
        return function(_Selector) {
            let targets = {};
            if(typeof _Selector !== typeof ""){
                if(_Selector.__updataed__){
                    return _Selector;
                }
                targets = _Selector;
            }else{
                // switch (_Selector[0]) {
                //     case '.':
                //     case '#':
                //     case '@':
                //         targets = document.querySelectorAll(_Selector);
                //         break;
                //     default:
                //         targets = document.querySelector(_Selector);
                // }
                targets = document.querySelectorAll(_Selector);
                targets.empty=(targets === null || targets[0] === "undefined")?true:false;
            }
            setAllProps(targets);
            return targets;
        }
    } else {
        _modleDebugOn?printlog("used DIY selector"):"";
        return function(_Selector) {
            let targets = {};
            if(typeof _Selector !== typeof ""){
                if(_Selector.__updataed__){
                    return _Selector;
                }
                targets = _Selector;
            }else{
                let reg = /(#|\.|@| )(.+?)(#|\.|@| |$)/g;
                let keyVal = reg.exec(_Selector)['2'];
                switch (_Selector[0]) {
                    case '.':
                        targets = document.getElementsByClassName(keyVal);
                        break;
                    case '#':
                        targets = document.getElementById(keyVal);
                        break;
                    case '@':
                        targets = document.getElementsByName(keyVal);
                        break;
                    default:
                        targets = document.getElementsByTagName(keyVal);
                }
                targets.empty=(targets === null || targets[0] === "undefined")?true:false;
            }
            setAllProps(targets);
            return targets;
        }
    }
}());

window.my$ = my$;
