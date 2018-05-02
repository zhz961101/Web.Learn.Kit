'use strict';
var targetMan = D();

targetMan.on("click","a",function(){
    alert("a click!!");
})
targetMan.off("click","anonyFunction");
