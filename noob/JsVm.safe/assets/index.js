'use strict';

alert(JSvm("onerror=()=>{alert('error')};debugger;return 2/3.14", safeSandBox));

JSafeVm("alert('cool!');console.log(meetMsg)", {
    meetMsg: "how are u?"
})

log(JSafeVm("meetMsg", {
    meetMsg: "how are u?"
}))

log(JSafeVm("return meetMsg;meetMsg+' \nthere is a <<return>> in inline of code, its non-effect.'", {
    meetMsg: "im fine thx u?"
}))
