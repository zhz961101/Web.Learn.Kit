'use strict';


var funcobj = {
    logstr : function(){
        log("funcobj say:pls use some arguments!!!");
    }
}

overloadMethod_1(funcobj,funcobj.logstr,function(str){
    log(str);
})

funcobj.logstr();
funcobj.logstr("123");
funcobj.logstr("3333");

// var alertMan = function(){
//     log("0 arguments func");
// }
//
// alertMan = function(){
//    log("1 arguments func");
// }
//
// overloadMethod_1(alertMan,function(str){
//     log(str);
// })
//
// alertMan();
// alertMan("2 arguments func!");


overloadMethod_2(window,"overloadMethod_2",function(a,b,c){
    log("overload go!")
})

overloadMethod_2(log,function(str){
    console.log(str);
})

var funcobj2 = {
    logstr : function(){
        log("funcobj2 say:Pls use some arguments!!!");
    }
}
funcobj2.logstr("yahoo!!!");
overloadMethod_2(funcobj2,"logstr",function(str){
    log(str);
})
funcobj2.logstr("yooo!!!");
overloadMethod_2(funcobj2,"logstr",function(str){
    log(str);
})
funcobj2.logstr("wow!!!");

funcobj2.logstr("wow!!!","");
