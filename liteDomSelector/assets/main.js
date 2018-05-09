let printlog = console.log;
let _strict = true; // dont use document.querySelector
let _modleDebugOn = true; // open some debug console log call
var my$ = (function() {
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
    let addTextFunction = function() {
        this.text = function(_newText) {
            if (this.empty) {
                return ''
            }
            let ele = typeof this.data[0] !== "undefined" ? this.data[0] : this.data;
            if (!_newText) {
                return ele.innerText;
            } else {
                ele.innerText = _newText;
                return _newText;
            }
        }
    }
    let addEachFunction = function(){
        if (this.empty) {
            return ''
        }
        this.Each = function(_func){
            for (let _index = 0; _index < this.data.length; _index++) {
                _func(this.data[_index],_index);
            }
        }
    }
    let setAllProps = function(_eleData){
        addHtmlFunction.apply(_eleData);
        addEachFunction.apply(_eleData);
        addTextFunction.apply(_eleData);
        return _eleData;
    }
    if (document.querySelector && !_strict) {
        _modleDebugOn?printlog("used document.querySelector()"):"";
        return function(_Selector) {
            let targets = {};
            switch (_Selector[0]) {
                case '.':
                case '#':
                case '@':
                    targets.data = document.querySelectorAll(_Selector);
                    break;
                default:
                    targets.data = document.querySelector(_Selector);
            }
            targets.empty=(targets.data === null || targets.data[0] === "undefined")?true:false;
            setAllProps(targets);
            return targets;
        }
    } else {
        _modleDebugOn?printlog("used DIY selector"):"";
        return function(_Selector) {
            let targets = {};
            let reg = /(#|\.|@| )(.+?)(#|\.|@| |$)/g;
            let keyVal = reg.exec(_Selector)['2'];
            switch (_Selector[0]) {
                case '.':
                    targets.data = document.getElementsByClassName(keyVal);
                    break;
                case '#':
                    targets.data = document.getElementById(keyVal);
                    break;
                case '@':
                    targets.data = document.getElementsByName(keyVal);
                    break;
                default:
                    targets.data = document.getElementsByTagName(keyVal);
            }
            targets.empty=(targets.data === null || targets.data[0] === "undefined")?true:false;
            setAllProps(targets);
            return targets;
        }
    }
}());

window.my$ = my$;
