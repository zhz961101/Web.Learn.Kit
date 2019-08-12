const isType = t => o => Object.prototype.toString.call(o).slice(8).slice(0,-1).toLowerCase() == t.toLowerCase()
const isArr = o => isType("array")
const isPro = o => isType("promise")

const pipe = (...funcs) => (...args) => funcs.reduce(
    (put, fn) => {
        if (isArr(put)) return fn(...put)
        return fn(put)
    }, args)

// var amm = pipe(add,mulit)
const addfor = base => (...nums) => nums.map((v, i, a) => v + base)
const multfor = base => (...nums) => nums.map((v, i, a) => v * base)

var a3m5 = pipe(addfor(3), multfor(5), addfor(1), console.log)

a3m5(1, 2, 3, 4, 5, 6)