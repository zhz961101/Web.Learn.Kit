class _Promise {
    constructor(fn) {
        // this.result
        this.callbacks = []
        this.failbacks = []
        setTimeout(() => (fn(this.resolve.bind(this), this.reject.bind(this))), 0);
    }
    resolve(res) {
        if (this.callbacks.length > 0) {
            let ret = this.callbacks.shift()(res, this.resolve.bind(this), this.reject.bind(this));
            if (ret && ret.then && typeof ret.then == "function") ret.then(this.resolve.bind(this))
        }
    }
    reject(res) {
        this.callbacks = [];
        if (this.failbacks.length > 0) {
            this.failbacks.shift()(res, this.resolve.bind(this), this.reject.bind(this));
        }
    }
    catch (fn) {
        this.failbacks.push(fn);
    }
    then(fn) {
        this.callbacks.push(fn);
        return this;
    }

}

// var a = new _Promise(function(resolve, reject) {
//     // resolve("成功");
//     setTimeout(function() {
//         resolve("成功");
//     }, 1000);
// }).then(function(result, resolve, reject) {
//     console.log(result)
//     reject("失败")
// }).catch(function(err) {
//     console.log(err);
// });

let delay = cb => setTimeout(cb, Math.floor(Math.random() * 1000))
let datas = []
let aj_ = str => cb => new _Promise(res => delay(() => {
    console.log("doit_", str);
    res(str);
    cb && console.log(str+"_cb:", cb);
    cb && datas.push(cb);
    // console.log(str,datas)
}))

let a_aj = aj_("头")
let b_aj = aj_("中")
let c_aj = aj_("尾")
// a_aj().then(b_aj).then(c_aj).then(()=>console.log(datas)).catch(err => console.log(err))
// console.log(datas)
// setTimeout(()=>console.log(datas),5000)
// let aj_res = []
// a_aj().then((res,resolve)=>{
//     aj_res.push(res)
//     console.log(aj_res,res)
//     return b_aj()
//     // return b_aj().then(resolve)
// }).then((res,resolve)=>{
//     aj_res.push(res)
//     console.log(aj_res,res)
//     return c_aj()
//     // return c_aj().then(resolve)
// }).then((res,resolve)=>{
//     aj_res.push(res)
//     console.log(aj_res,res)
// })

function multiply(input) {
    return new _Promise(function (resolve, reject) {
        console.log('calculating ' + input + ' x ' + input + '...');
        setTimeout(resolve, 500, input * input);
    });
}

// 0.5秒后返回input+input的计算结果:
function add(input) {
    return new _Promise(function (resolve, reject) {
        console.log('calculating ' + input + ' + ' + input + '...');
        setTimeout(resolve, 500, input + input);
    });
}

var p = new _Promise(function (resolve, reject) {
    console.log('start new Promise...');
    resolve(123);
});

p.then(multiply)
 .then(add)
 .then(multiply)
 .then(add)
 .then(function (result) {
    console.log('Got value: ' + result);
});
