'use strict';

log("runing!");
// test log tool

/**
 * XMLHttpRequest factory
 * @param  {String} method            - http method name["GET","POST","PUT","DELETE"]
 * @param  {String} url               - Request address
 * @param  {String} dataStr           - Request param(JSON string)
 * @param  {Boolean} Async            - if open asynchronous execution
 * @param  {function} callback_sucess - run the function when resquest been sucess
 * @param  {function} callback_error  - run the function when resquest been errors
 * @return {void}
 */
var request = function(method, url, dataStr, Async, callback_sucess, callback_error) {
    this.xmlhttp = null;
    this.data = null;
    this.statusText = null;

    function isJSON(str, pass_object) {
        let typeNameof = obj => Object.prototype.toString.call(obj);
        let isString = function(str) {
            return typeNameof(str) === typeNameof("");
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
    /**
     * function decorator. JSON parsing , when the response is json string
     * @param  {function} __func - need be decorated
     * @return {function}        - decorative function
     */
    let JSONdecorator = function(__func) {
        return function(_response) {
            if (isJSON(_response)) {
                __func(JSON.parse(_response));
            } else {
                __func(_response);
            }
        }
    }
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
    /**
     * replace constructor
     * @param  {function} callback_sucess - run the function when resquest been sucess
     * @param  {function} callback_error  - run the function when resquest been errors
     * @return {void}
     */
    this._init = function(callback_sucess, callback_error) {
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
    let _finally = function(that, method, url, dataStr, Async) {
        Async = Async || true;
        method = method.toUpperCase() || "GET";
        that.xmlhttp.open(method, url, Async);
        that.xmlhttp.send(null);
    };

    this._init(callback_sucess, callback_error);
    _finally(this, method, url, dataStr, Async);
}
/**
 * XMLHttpRequest with Promise
 * @param  {object} _config - method          :http method name
 *                          - url             :Request address
 *                          - dataStr         :Request param(JSON string)
 *                          - Async           :if open asynchronous execution
 *                          - content-type    :
 * @return {Promise}        - Promise Object
 */
var proRequest = function(_config) {
    return new Promise(function(resolve, reject) {
        new request(_config.method || "GET", _config.url, _config.data || null, _config.async, resolve, reject)
    })
}

var ajax1 = proRequest({
    method: "GET",
    async: true,
    url: "./assets/test10.json"
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
