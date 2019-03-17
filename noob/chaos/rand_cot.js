// cot 的链式混沌现象作为随机数发生器
const rand = (function(){
    "use strict"
    const cot = d => Math.cos(d)/Math.sin(d);
    const cut = n => Math.abs(n - ~~n);
    let seed = cot(new Date().getTime());
    return () => cut(seed = cot(seed));
})()

const randint = (min,max) => ~~(rand() * (max - min) + min)
const randInt = (min,max) => randint(min,max + 1)

function test(){
    console.log(rand())
    console.log(rand())
    console.log(randint(500,1200))
    console.log(randint(500,1200))
    console.log(randint(500,1200))
    console.log(randint(500,1200))
    console.log(randint(500,1200))
}
test()