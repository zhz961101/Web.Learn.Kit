'use strict';
log("log tools runing!!");

var Battery_power = 0
var ChargPow = undefined
var Charg = ()=>{Battery_power+=3}
var $ = my$
var usePower = ()=>{Battery_power-=1}
setInterval("usePower()",100)
setInterval(()=>{
    if(Battery_power<30){
        sm.cur = "Charging"
        sm.action[sm.cur]()
    }
    if(Battery_power>70){
        sm.cur = "Charged"
        sm.action[sm.cur]()
    }
    $("#app").html("Battery Power:"+Battery_power+"%<br>stat:"+sm.cur)
},100)

var sm = {}
sm.event = {
    Charging : {
        from:"enough",
        to:"close2empty"
    },
    Charged:{
        from:"close2empty",
        to:"enough"
    }
}
sm.cur = "Charging"
sm.action = {
    Charging : function(){
        if(ChargPow == undefined){
            ChargPow = setInterval("Charg()",100)
        }
    },
    Charged : function(){
        clearInterval(ChargPow)
        ChargPow = undefined
    }
}
