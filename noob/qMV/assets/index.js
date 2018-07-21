'use strict';
log("log tools runing!!");

var randHash = H_length => {
    H_length = H_length || 10;
    let res = "",
        $chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
    let maxPos = $chars.length;　　
    for (let i = 0; i < H_length; i++) {
        res += $chars.charAt(Math.floor(Math.random() * maxPos));　　
    }
    return res
}

console.log(randHash(10))

let tpl_text2 = `
<br><span style="color:red"><% typeName %>Now time:<% time %><span><br>
<input type="text" name="" bind:value="time"><br>u can use cmd like: bind:value="time"
`
// var prehtml = html => {
//     let ml = html.match(/>[\s\S]*?</g)
//     let sl = html.split(/>[\s\S]*?</g)
//     let res = sl[0]
//     for (let i = 1; i < sl.length; i++) {
//         res += (ml[i]===undefined?"><":ml[i]) + sl[i].replace(/ (bind):(.+?)=(\\?('|")(.+?)\\?('|"))( |>)/g," $2=\"<% $5 %>\"$7")
//     }
//     return res
// }
//
// console.log(prehtml(tpl_text2))

let ele1 = new Ele("#app2", {
    typeName: "Clock!!!",
    lastName: "",
    time: (self) => {
        return self.lastName + "<br>" + new Date().toLocaleTimeString()
    }
}, tpl_text2)
//
// setInterval(()=>{
//     ele1.data.time = new Date().toLocaleTimeString();
// },1000)

setInterval(() => {
    ele1.data.lastName = ele1.data.typeName;
    ele1.data.typeName = "NOW!!!";
}, 1000)

setInterval(() => {
    ele1.data.lastName = ele1.data.typeName;
    ele1.data.typeName = "HAPPY!!!";
}, 3000)
