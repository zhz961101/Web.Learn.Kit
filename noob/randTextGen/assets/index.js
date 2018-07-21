'use strict';
var print = function(msg,title){
    log(title+" : "+msg);
}
print("hi console!","Hi");
print("some one error msg!","error","error");
// print(rand2(100),"rand2(100)");
// print(rand2(100),"rand2(100)");
// var rList = ["This is","What are","Hi","Yahoo","Cool","Swag!"];
// print(randList(rList),"randList(rList)");
// print(randOne(),"randOne()");
// print(randOne(),"randOne()");
// print(randomWord(),"randomWord()");
// print(randomNumStr(),"randomNumStr()");
// print(randomSentence(),"randomSentence()")
// print(randomText(10,9,2),"randomText(20,9,2)");
//
// print(logistic(3.999999,113,0.6),"logistic(3.999999,113,0.6)");
// var res = [0,0,0,0,0,0,0,0,0,0];
// var testNum = 1000;
// // for (let i = 0; i < testNum; i++) {
// //     let r = rand_logistic();
// //     setlist(r);
// // };
// for (let i = 0; i < testNum; i++) {
//     let r = rand_lowlogistic();
//     setlist(r);
// };
// // for (let i = 0; i < testNum; i++) {
// //     let r = Math.random();
// //     setlist(r);
// // };
// function setlist(n){
//     if(n<0.1){
//         res[1]++;
//         return;
//     }
//     if(n<0.2){
//         res[2]++;
//         return;
//     }
//     if(n<0.3){
//         res[3]++;
//         return;
//     }
//     if(n<0.4){
//         res[4]++;
//         return;
//     }
//     if(n<0.5){
//         res[5]++;
//         return;
//     }
//     if(n<0.6){
//         res[6]++;
//         return;
//     }
//     if(n<0.7){
//         res[7]++;
//         return;
//     }
//     if(n<0.8){
//         res[8]++;
//         return;
//     }
//     if(n<0.9){
//         res[9]++;
//         return;
//     }
//     res[0]++;
// }
// print(res,"list");
// // var vari = 0;
// // for (var i = 0; i < res.length; i++) {
// //     if(res[i]==0){
// //         continue;
// //     }
// //     vari+=Math.pow(.1-res[i]/10,2);
// // }
// // print(vari/testNum,"variance");
// var resStr = "";
// for (var i = 1; i < res.length; i++) {
//     resStr+=res[i]/testNum+" ";
//     // print(((res[i]/testNum)-0.045)/Math.pow(i-5.5,2),"a=(y-0.05)/x^2");
// }
// resStr+=res[0]/testNum;
// print(resStr,"string");

//****************************
function setCanvRand(randfunc,canvasId,binOn){
    let c = document.getElementById(canvasId).getContext('2d');
    let data = c.createImageData(300,300);
    for(let x=0; x<data.width; x++) {
        for(let y=0; y<data.height; y++) {
            let index = (y*data.width+x)*4;  //calculate index
            data.data[index] = 255*randfunc();   // red
            data.data[index+1] = binOn? data.data[index]: 255*randfunc(); // green
            data.data[index+2] = binOn? data.data[index]: 255*randfunc(); // blue
            data.data[index+3] = 255; // force alpha to 100%
        }
    }
    //set the data back
    c.putImageData(data,0,0);
}

var testHtml = `<div class="testblock">
    <span><% name %></span>
    <canvas id="canvas<% id %>" width="300" height="300"></canvas>
</div>`
var testtempl = new TemplateEngine(testHtml);
var count = 0;
function testRand(func,name,binis){
    binis = binis || false;
    $('.mainblock').append(testtempl.joint({
        name:name,
        id:count
    }));
    let date1=new Date();
    setCanvRand(func,"canvas"+count,binis);
    let date2=new Date();
    print(date2.getTime()-date1.getTime(),"function "+name+" use time");
    count++;
}

///
function pow2rand(func){
    return (func()+func())/2
}
function logist2(){
    return pow2rand(rand_logistic);
}
function randone2(){
    return pow2rand(randOne);
}
function mathrand2(){
    return pow2rand(Math.random);
}

testRand(rand_logistic,"rand_logistic");
// testRand(logist2,"logist2");
testRand(rand_lowlogistic,"rand_lowlogistic");
// testRand(rand_uplogistic,"rand_uplogistic");
// testRand(rand_ss_logistic,"rand_ss_logistic");
testRand(randOne,"randOne_liner");
// testRand(randone2,"randone2");
testRand(Math.random,"Math.random");
// testRand(mathrand2,"mathrand2");
//*******************************


// randList.sort((a,b)=>b-a);
// print(randList[0],"maxRand");
// print(randList[randList.length-1],"minRand");
// var randtest = function(max,min){
//     let temp = (new Date().getTime())+"";
//     let tl = temp.split('');
//     let r =parseInt( tl[tl.length-1]+tl[tl.length-2]+tl[tl.length-3]);
//     let randnum = logistic(3.9,r,0.5+r*0.00001);
//     let mapped = map021(max-.1,min-.1,randnum);
//     return mapped<=0?0:mapped>=1?1:mapped;
// }
// var map021 = function(max,min,num){
//     return (num-min)/(max-min);
// };
// var randllll = [];
// for (let i = 0; i < 10; i++) {
//     randllll.push(randtest(randList[0],randList[randList.length-1]));
// };
// randllll.sort((a,b)=>b-a);
// max=>5 min=>1 map(3)=>0.5

//
// let obj = {
//     item1:{content:"...",weight:2},//0.222
//     item2:{content:"!!!",weight:6},//0.6666
//     item3:{content:"???",weight:1}//0.12
// }
// let count = [0,0,0];
// let bugNum = 1000;
// for (let i = 0; i < bugNum; i++) {
//     let r = randObj(obj);
//     //print(r,"randObj(obj)");
//     if(r == "..."){
//         count[0]++;
//     }
//     if(r == "!!!"){
//         count[1]++;
//     }
//     if(r == "???"){
//         count[2]++;
//     }
// }
// print((count[0]/bugNum)+" "+(count[1]/bugNum)+" "+(count[2]/bugNum) ,"count[]")
