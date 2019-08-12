class Future {
    constructor(fn) {
        this.callbacks = []
        this.failbacks = []
        this.init = fn
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
        if (typeof this.init == "function") {
            this.init(this.resolve.bind(this), this.reject.bind(this))
            this.init = undefined
        }
        return this;
    }
}
let flowall = function(future_arr) {
    return new Future(resolve => {
        let result = []
        let waitlen = future_arr.length
        let next = () => future_arr.length ? future_arr.shift().then(res => {
            result.push(res);
            result.length == waitlen ? resolve(result) : next()
        }) : void 0
        next()
    })
}
let raceall = function(future_arr) {
    return new Future(resolve => {
        let result = []
        let waitlen = future_arr.length
        while (future_arr.length) future_arr.shift().then(fu_res => {
            result.push(fu_res);
            result.length == waitlen ? resolve(result) : void 0
        })
    })
}
let race = function(future_arr) {
    return new Future(resolve => {
        while (future_arr.length) future_arr.shift().then(fu_res => resolve(pr_res))
    })
}

// var a = new Future(function(resolve, reject) {
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
let aj_ = str => cb => new Future(res => delay(() => {
    // console.log("doit_", str);
    res(str);
    cb && console.log(str + "_cb:", cb);
    cb && datas.push(cb);
    // console.log(str,datas)
}))

// new Future((r)=>r("?")).then(res=>console.log(res))

let a_aj = aj_("头")
let b_aj = aj_("中")
let c_aj = aj_("尾")
let abc = futuall([a_aj(), b_aj(), c_aj()]).then(res => console.log("!", res))
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

// function multiply(input) {
//     return new Future(function (resolve, reject) {
//         console.log('calculating ' + input + ' x ' + input + '...');
//         setTimeout(resolve, 500, input * input);
//     });
// }
//
// // 0.5秒后返回input+input的计算结果:
// function add(input) {
//     return new Future(function (resolve, reject) {
//         console.log('calculating ' + input + ' + ' + input + '...');
//         setTimeout(resolve, 500, input + input);
//     });
// }
//
// var p = new Future(function (resolve, reject) {
//     console.log('start new Promise...');
//     resolve(123);
// });
//
// p.then(multiply)
//  .then(add)
//  .then(multiply)
//  .then(add)
//  .then(function (result) {
//     console.log('Got value: ' + result);
// });
