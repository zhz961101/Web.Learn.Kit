function* gen() {
    yield void 0;
    yield void 0;
    yield void 0;
    yield void 0;
    return "ret"
}
var g = gen()
while (true) {
    n = g.next()
    if (n.done) {
        console.log(n.value)
        break
    }
}
()=>{
    await (new Promise());
}
