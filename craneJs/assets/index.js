'use strict';

var alertman = function(str){
    str = str || "args null !";
    alert(str.msagess)
}

D().on("click","a",function(){
    alert("a click!!");
})
// D().off("click","a","anonyFunction");

D().on("click","a",alertman);

D().off("click","a","alertman");
