'use strict';

console.log($("#app")[0])
_init_native($("#app")[0])

myEvent.on("9527",()=>{
    log("9527!!!channel!!!")
})
myEvent.on("9527",()=>{
    log("9527!!!channel!!!")
})

myEvent.on("9611",()=>{
    log("9611!!!channel!!!")
})

myEvent.on("dblclick",e=>{
    console.log(e)
    console.log(e.target)
})

myEvent.on("change",e=>{
    console.log("onchange!")
    if(parseInt($(e.target).data("id")) === 12){
        console.log(e.target.value)
    }
})

myEvent.emit("9527")
myEvent.emit("9611")

myEvent.emit("110")
