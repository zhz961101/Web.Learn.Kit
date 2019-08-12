__TEST_MAX__ = 100

function asyncify(gen){
    return new Promise((resolve,reject)=>{
        var done = false
        var ret = []
        try {
            while(true){
                var n = gen.next(done)
                if(n.done)break;
                ret.push(n.value)
            }
            resolve(ret)
        } catch (e) {
            reject(e)
        }
    })
}

function frameify(gen){
    return new Promise((resolve,reject)=>{
        var done = false
        var ret = []
        function inner(){
            if(done){
                resolve(ret);
                return void 0;
            }
            window.requestIdleCallback((deadline)=>{
                while(deadline.timeRemaining()>0){
                    var n = gen.next();
                    done = n.done;
                    if(done)break;
                    ret.push(n.value);
                }
                inner();
            })
        }
        try {
            inner()
        } catch (e) {
            reject(e)
        }
    })
}

// (async function(){
//     var ret = await asyncify((function*(){
//         for (var i = 0; i < __TEST_MAX__; i++) {
//             var resp = yield i*i
//             console.log("resp1:",resp)
//         }
//     })())
//     console.log("ret:",ret)
// })();

(async function(){
    var ret = await frameify((function*(){
        for (var i = 0; i < __TEST_MAX__; i++)
            console.log("resp2:",yield i)
    })())
    console.log("ret2:",ret)
})();

(async function(){
    var ret = await frameify((function*(){
        for (var i = 0; i < __TEST_MAX__; i++)
            console.log("resp3:",yield i*i)
    })())
    console.log("ret3:",ret)
})();
