'use strict';
/**
 * A method for implementing a function overloaded factory
 * @param  {Object}   object           - Method container
 * @param  {String|function}   name    - Method Name
 * @param  {Function} fn               - overload Function
 * @return {Void}
 */
function overloadMethod_1 (object, name, fn) {
    if(typeof name === typeof function(){}){name=name.name};
    let old = object[name];
　　object[name] = function() {
　　　　if(fn.length === arguments.length) {
　　　　　　return fn.apply(this, arguments);
　　　　} else if(typeof old === "function") {
　　　　　　return old.apply(this, arguments);
　　　　}
　　}
}
// gobal function overlod
overloadMethod_1(window,overloadMethod_1.name,function (Method, fn) {
    overloadMethod_1(window,Method.name,fn);
})

/**
 * Another one for implementing a function overloaded factory
 * @param  {Object}   object           - Method container
 * @param  {String|function}   name    - Method Name
 * @param  {Function} fn               - overload Function
 * @return {Void}
 */
function overloadMethod_2 (object, name, fn) {
    let o_list_name = "__"+name+"_overload";
    if(typeof name === typeof function(){}){name=name.name};
    if(!object[o_list_name]){
        let overlodObj = {};
        overlodObj[object[name].length] = object[name];
        object[o_list_name] = overlodObj;
        object[name] = function(){
            // object[o_list_name][Object.keys(object[o_list_name])[0]]
            let applynow = !object[o_list_name][arguments.length]?object[o_list_name][Object.keys(object[o_list_name])[0]]:object[o_list_name][arguments.length];
            applynow.apply(this,arguments);
        }
    }
    if(!object[o_list_name][fn.length]){
        object[o_list_name][fn.length] = fn;
    }else {
        let old = object[o_list_name][fn.length];
        object[o_list_name][fn.length] = function(){
            old.apply(this,arguments);
            fn.apply(this,arguments);
        };
    }
}
// gobal function overlod
overloadMethod_2(window,"overloadMethod_2",function(method,fn){
    overloadMethod_2(window,method.name,fn);
})
