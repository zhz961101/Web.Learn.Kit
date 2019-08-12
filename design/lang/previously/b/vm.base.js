/**
 * @author       -    luke sanshi
 * @date         -    18/8/4
 * @description  -写着玩，动态语言写虚拟机搞得像盗梦空间一样哈哈哈
 *              主要是那本书挺不错的，自己实践一下，这里主要是一
 *              些基础工具，写成那种函数式编程是最好的，这里也是这
 *              么实现的，或者这么追求的如果写起来带劲，之后是肯定
 *              要用重构（重写）
 */

const TYPEAT = o => Object.prototype.toString.call(o);
const IsString = o => TYPEAT(o) === TYPEAT("");
const IsNumStr = s => /^[0-9]*$/g.test(s);
const IsFunc = f => typeof f == "function";

// todo: \w+?:{([\w\W]+?)} slpit {}block :MACRO

const preCompile = function(codeSTR) {
    let ret = codeSTR.trim().split("\n").map(v => v.trim()),
        TAGS = {};
    for (let _k in ret)
        if (/\w+?:/g.test(ret[_k])) {
            let sp = ret[_k].split(":");
            TAGS[sp[0].trim()] = _k;
            ret[_k] = sp[1].trim();
        }
    let rets = ret.join("\n");
    for (var tagname in TAGS)rets=rets.replace(tagname, TAGS[tagname]);
    ret = rets.split("\n");
    return ret;
}

class _vm_ {
    constructor(d) {
        this._INS_ = Object.create(null);
        this.init(d);
    }
    init(d){
        this.debugMODE = d || false;
        this.REG = Object.create(null);
        this.REG.AX = 0;
        this.REG.BX = 0;
        this.REG.CX = 0;
        this.REG.DX = 0;
        this.REG.IP = 0;
        this.REG.CF = 0;
        this.REG.IR = true;
        this.STACK = [];
        this.code = "";
    }
    log() {
        let logging = "",
            count = 0;
        for (let _k in this.REG) {
            count += 1;
            let _v = this.REG[_k];
            logging += `${_k}=${_v}\t` + (count % 6 ? "" : "\n");
        }
        logging+="\n"+`LINE:\t<${this.REG.IP}>\t${this.code[this.REG.IP]}\n`;
        console.log(logging)
        return logging;
    }
    run() {
        while (this.REG.IR) {
            this.exec.apply(this,this.fetch().split(" "));
            this.debugMODE && this.log();
            this.REG.IP += 1;
        }
    }
    fetch() {
        if(!this.code[this.REG.IP])throw Error(`DONT FETCH INST!!!\nLINE:${this.REG.IP}`);
        return this.code[this.REG.IP].trim();
    }
    exec(_inst_) {
        let _do = this._INS_[_inst_],args=Array.prototype.slice.apply(arguments);
        if (_do && IsFunc(_do))_do.apply(this, args.splice(1));
    }
    add_INS(fn, NAME) {
        this._INS_[NAME] = fn;
    }
    set_code(_c_) {
        this.code = preCompile(_c_);
    }
}

let vmb1 = new _vm_();

vmb1.add_INS(function() {
    let _TEMP_="",args=Array.prototype.slice.apply(arguments),self=this;
    args.map(val=>{
        if (!IsNumStr(val)) _TEMP_+=`${val}=`+self.REG[val];
        else _TEMP_+=val;
        _TEMP_+=" "
    })
    console.log(_TEMP_);
}, "PRINT")

vmb1.add_INS(function(val) {
    if (!IsNumStr(val)) this.STACK.push(this.REG[val]);
    else this.STACK.push(parseInt(val));
}, "PUSH")

vmb1.add_INS(function(val) {
    this.REG.IR = false;
}, "EXIT")

module.exports = vmb1;
