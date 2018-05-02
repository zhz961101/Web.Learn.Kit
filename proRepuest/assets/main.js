'use strict';

/**
 * XMLHttpRequest factory
 * @param  {String} method            - http method name["GET","POST","PUT","DELETE"]
 * @param  {String} url               - Request address
 * @param  {String} dataStr           - Request param(JSON string)
 * @param  {Boolean} Async            - if open asynchronous execution
 * @param  {String} contentType       - http contentType
 * @param  {function} callback_sucess - run the function when resquest been sucess
 * @param  {function} callback_error  - run the function when resquest been errors
 * @return {void}
 */
var request = function(method, url, dataStr, Async, contentType, callback_sucess, callback_error) {
    this.xmlhttp = null;
    this.contentType = contentType || "text/plain;charset=UTF-8";

    Async = Async || true;
    method = method.toUpperCase() || "GET";

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
    /**
     * function decorator. JSON parsing , when the response is json string
     * @param  {function} __func - need be decorated
     * @return {function}        - decorative function
     */
    let JSONdecorator = function(__func) {
        return function(_response) {
            if (isJSON(_response)) {
                _response = _response.replace(/(?<!".+?) /g,"").replace(/\n|\r/g,"").replace(/,(}|])/g,"$1");
                __func(JSON.parse(_response));
            } else {
                __func(_response);
            }
        }
    }
    this.stateChange = function() {
        // this => XMLHttpRequest Object
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
        that.xmlhttp.open(method, url, Async);
        if(method !== "GET"){
            that.xmlhttp.setRequestHeader('Content-Type',that.contentType)
            that.xmlhttp.send(dataStr);
        }else{
            that.xmlhttp.send(null);
        }
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
        new request(_config.method , _config.url, _config.data , _config.async, resolve, reject)
    })
}
