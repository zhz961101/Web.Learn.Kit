'use strict';

log("runing!");
// test log tool

var ajax1 = proRequest({
    method: "GET",
    async: true,
    url: "./assets/test10.json",
    contentType : "text/plain;charset=UTF-8"
});
ajax1.then((response) => {
    log(response);
}).catch((errorStr) => {
    log(errorStr)
})

var ajax2 = proRequest({
    method: "GET",
    async: true,
    url: "./assets/text1.txt"
});
ajax2.then((response) => {
    log(response);
}).catch((errorStr) => {
    log(errorStr)
})

var ajax1 = proRequest({
    method: "GET",
    async: true,
    url: "./assets/test1.json"
});
ajax1.then((response) => {
    log(response);
}).catch((errorStr) => {
    log(errorStr)
})
