'use strict';
var randOne = (function() {
    let seed = new Date().getTime();
    return function rnd() {
        seed = (seed * 9301 + 49297) % 233280;
        return seed / (233280.0);
    };
})();

var rand2 = (function() {
    var today = new Date();
    var seed = today.getTime();

    function rnd() {
        seed = (seed * 9301 + 49297) % 233280;
        return seed / (233280.0);
    };
    return function rand(number) {
        // return Math.ceil(rnd(seed) * number);
        return Math.ceil(rnd() * number);
    };
})();

var randBool = function(){
    return randOne()>=0.5?true:false;
};

var randList = function(Strlist){
    let maxPos = Strlist.length;
    return Strlist[rand2(maxPos-1)];
}

// x_(n+1)=ax_n(1-x_n)
// 0<x0<1
// n>1
// 3.57<a<4
var logistic = function(a,n,x0){
    if(n===0){
        return x0;
    }
    var next = logistic(a,n-1,x0);
    return a * next * (1-next);
}
var logisticNext = function(a,n,x){
    return a*n*(1-n);
}
var rand_logistic = (function(){
    let tl,seed,a,x0,last;
    let _init = function(){
        tl = ((new Date().getTime())+"").split('');
        seed = parseInt(tl[tl.length-1]*11)+1;
        a = 3.9999999;
        x0 = parseInt(tl[tl.length-3]);
        x0 = x0==0?0.5:x0*.1;
        //  x0 = 0.8
    }
    let _logistic = function(Xn){
        if(Xn===0){
            return x0;
        }
        let next = _logistic(Xn-1);
        return a * next * (1-next);
    }
    let _logisticNext = function(Xn){
        return a*Xn*(1-Xn);
    }
    return function(){
        if(seed==undefined){
            _init();
            last = _logistic(seed);
        }else{
            last = _logisticNext(last);
        }
        return last;
    }
})();

var mapNumto = function(on,omax,omin,nmax,nmin){
    return (nmax-nmin)/(omax-omin)*(on-omin)+nmin;
}
var mapNormalization = function(on,omax,omin){
    return mapNumto(on,omax,omin,1,0);
}
var rand_lowlogistic = function(){
    let r = rand_logistic();
    if(r<0.3||r>0.7){
        return rand_lowlogistic();
    }
    let _map = function(num){
        // return (num-0.3)/0.4;
        return mapNormalization(num,.7,.3);
    }
    return _map(r);
}
var rand_uplogistic = function(){
    let r = rand_logistic();
    if(r>=.9){
        return 5*(r-.9)+.5;
        // return mapNormalization(r,1,.9);
    }
    if(r<=.1){
        return 5*r;
        // return mapNormalization(r,.1,0);
    }
    return rand_uplogistic();
}
var rand_ss_logistic = function(){
    let r = rand_logistic();
    if(r<=.3||r>=.1){
        return mapNormalization(r,.3,.1);
    }
    if(r>=0.7||r<=.9){
        return mapNormalization(r,.7,.9);
    }
    return rand_ss_logistic();
}
// 0.162 0.076 0.087 0.083 0.049 0.065 0.077 0.09 0.101 0.21
// 0.186 0.076 0.083 0.07 0.063 0.054 0.082 0.086 0.098 0.202
// 0.171 0.085 0.081 0.062 0.071 0.057 0.076 0.092 0.101 0.204
// 0.164 0.077 0.086 0.083 0.05 0.065 0.076 0.089 0.1 0.21
// 0.173 0.084 0.081 0.061 0.072 0.057 0.075 0.093 0.1 0.204
// 0.189 0.085 0.077 0.074 0.05 0.083 0.056 0.081 0.095 0.21
// 0.174 0.085 0.083 0.059 0.07 0.059 0.074 0.093 0.099 0.204
// 0.161 0.075 0.088 0.082 0.051 0.064 0.077 0.09 0.102 0.21
// 0.188 0.078 0.083 0.069 0.061 0.057 0.08 0.084 0.098 0.202
// 0.161 0.075 0.088 0.084 0.051 0.064 0.077 0.087 0.102 0.211
// 0.19 0.074 0.083 0.071 0.063 0.055 0.08 0.083 0.1 0.201

//obj{
//  item1:{content:"...",weight:2},
//  item1:{content:"!!!",weight:6},
//  item1:{content:"???",weight:1}
//}
var randObj = function(obj){
    let r=randOne();
    let AllW = 0;
    for (let val in obj) {
        if (obj.hasOwnProperty(val)) {
            AllW+=obj[val].weight;
        }
    }
    let realW = 0;
    for (let val in obj) {
        if (obj.hasOwnProperty(val)) {
            realW += obj[val].weight/AllW;
            if(r<=realW){
                return obj[val].content;
            }
        }
    }
}

// *******************************
// base end

var myNumrandom2 = function(max, min) {
    min = min || 0;
    let r = randOne();
    return r * (max - min) + min;
}
var myNumrandom = function(max, min) {
    return rand2(max+1) + min - 1;
}

function randomChar(Chsrset){
    let maxPos = Chsrset.length;
    // return Chsrset.charAt(Math.floor(randOne() * (maxPos + 1)));
    // return Chsrset.charAt(Math.floor(rand_logistic() * (maxPos + 1)));
    return Chsrset.charAt(Math.floor(Math.random() * (maxPos + 1)));
}
function randomStr(len, charset) {　　
    len = len || 32;
    let $chars = charset;
    // 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let pwd = '';　　
    for (let i = 0; i < len; i++) {
        pwd += randomChar($chars);
    }　　
    return pwd;
}

function randomWord(len) {
    len = len || 7;
    return randomStr(len, "abcdefghijklmnopqrstuvwxyz")
}

function randomNumStr(len) {
    len = len || 3;
    let res = randomStr(1, "123456789");
    return res + randomStr(len - 1, "1234567890");
}

function firstWUP(Str) {
    return Str[0].toUpperCase() + Str.slice(1)
}

function randomSentence(len, toUpper, maxWordlen, minWordlen) {
    toUpper = toUpper || true;
    len = len || 10;
    maxWordlen = maxWordlen || 5;
    minWordlen = minWordlen || 1;

    let first = randomWord();
    if (toUpper) {
        first = firstWUP(first);
    }
    let res = "";
    for (let i = 0; i < len - 1; i++) {
        res += " " + randomWord(myNumrandom(maxWordlen, minWordlen));
    }
    return first+res
}

function randomText(len, maxWordlen, minWordlen) {
    maxWordlen = maxWordlen || 10;
    minWordlen = minWordlen || maxWordlen;
    let res = "";
    for (let i = 0; i < len; i++) {
        res += randomSentence(myNumrandom(maxWordlen, minWordlen),randBool()) + randomChar(",.?!;:'\"~")+" ";
    }
    return res;
}
