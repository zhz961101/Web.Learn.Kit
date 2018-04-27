'use strict';

log("runing!");

var request = function(method, url, dataStr, Async, callback_sucess, callback_error) {
    this.xmlhttp = null;
    this.data = null;
    this.statusText = null;

    function isJSON(str, pass_object) {
        let isString = function(str) {
            return typeof str === typeof "";
        }

        if (pass_object && isObject(str)) return true;

        if (!isString(str)) return false;

        str = str.replace(/\s/g, '').replace(/\n|\r/, '');

        if (/^\{(.*?)\}$/.test(str))
            return /"(.*?)":(.*?)/g.test(str);

        if (/^\[(.*?)\]$/.test(str)) {
            return str.replace(/^\[/, '')
                .replace(/\]$/, '')
                .replace(/},{/g, '}\n{')
                .split(/\n/)
                .map(function(s) {
                    return isJSON(s);
                })
                .reduce(function(prev, curr) {
                    return !!curr;
                });
        }

        return false;
    }
    let JSONdecorator = function(__func) {
        return function(_response) {
            if (isJSON(_response)) {
                __func(JSON.parse(_response));
            } else {
                __func(_response);
            }
        }
    }
    this.init = function(callback_sucess, callback_error) {
        if (window.XMLHttpRequest) { // code for all new browsers
            this.xmlhttp = new XMLHttpRequest();
        } else if (window.ActiveXObject) { // code for IE5 and IE6
            this.xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        if (this.xmlhttp != null) {
            this.xmlhttp._success = JSONdecorator(callback_sucess);
            this.xmlhttp._error = JSONdecorator(callback_error);
            this.xmlhttp.onreadystatechange = this.stateChange;
        } else {
            alert("Your browser does not support XMLHTTP.");
        }
    };
    this.stateChange = function() {
        if (this.readyState == 4) { // 4 = "loaded"
            if ((this.status >= 200 && this.status < 300) || (this.status == 304) || (this.status == 0)) { // 200 = OK
                let data = this.responseText;
                this._success ? this._success(data) : "";
            } else {
                let statusText = this.statusText;
                this._error ? this._error(statusText) : "";
            }
        }
    };
    let next = function(that, method, url, dataStr, Async) {
        Async = Async || true;
        that.xmlhttp.open("GET", url, Async);
        that.xmlhttp.send(null);
    };

    this.init(callback_sucess, callback_error);
    next(this, method, url, dataStr, Async);
}

var proRequest = function(_config) {
    return new Promise(function(resolve, reject) {
        new request(_config.method || "GET", _config.url, _config.data || null, _config.async, resolve, reject)
    })
}

// new request("GET", "./test1.json", null, true, (data) => {
//     log(data)
// }, (errorStr) => {
//     log(errorStr)
// })
// log("Async??")
// new request("GET", "./test10.json", null, true, (data) => {
//     log(data)
// }, (errorStr) => {
//     log(errorStr)
// })

var ajax1 = proRequest({
    method: "GET",
    async: true,
    url: "./test10.json"
});
ajax1.then((response) => {
    log(response);
    console.log(response);
}).catch((errorStr) => {
    log(errorStr)
})

var ajax2 = proRequest({
    method: "GET",
    async: true,
    url: "./text1.txt"
});
ajax2.then((response) => {
    log(response);
    console.log(response);
}).catch((errorStr) => {
    log(errorStr)
})
