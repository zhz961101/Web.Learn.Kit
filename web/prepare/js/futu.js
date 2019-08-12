var Future = function(fn){
    this.callbacks = []
    this.failbacks = []
    this.init = fn
}
Future.prototype = {
    resolve(res) {
        if (this.callbacks.length > 0) {
            let ret = this.callbacks.shift()(res, this.resolve.bind(this), this.reject.bind(this));
            if (ret && ret.then && typeof ret.then == "function") ret.then(this.resolve.bind(this))
        }
    },
    reject(res) {
        this.callbacks = [];
        if (this.failbacks.length > 0) {
            this.failbacks.shift()(res, this.resolve.bind(this), this.reject.bind(this));
        }
    },
    catch(fn) {
        this.failbacks.push(fn);
    },
    then(fn) {
        this.callbacks.push(fn);
        if (typeof this.init == "function") {
            this.init(this.resolve.bind(this), this.reject.bind(this))
            this.init = undefined
        }
        return this;
    }
}
Future.flowall = function(future_arr) {
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
Future.raceall = function(future_arr) {
    return new Future(resolve => {
        let result = []
        let waitlen = future_arr.length
        while (future_arr.length) future_arr.shift().then(fu_res => {
            result.push(fu_res);
            result.length == waitlen ? resolve(result) : void 0
        })
    })
}
Future.race = function(future_arr) {
    return new Future(resolve => {
        while (future_arr.length) future_arr.shift().then(fu_res => resolve(fu_res))
    })
}


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
// console.log(p)
// p.then(multiply)
//  .then(add)
//  .then(multiply)
//  .then(add)
//  .then(function (result) {
//     console.log('Got value: ' + result);
// });
//
