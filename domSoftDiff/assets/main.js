'use strict';
log("log tools runing!!");

let domTree = function(ele, callback) {
    let childs = ele.children;
    callback(ele);
    let index = {};
    if (ele.children.length != 0) {
        for (let cele of childs) {
            domTree(cele, callback);
        }
    }
}
let create_VdomTree = function(ele) {
    let get_attribute = ele => {
        let res = /<(.+?)( .+?)?>/g.exec(ele.outerHTML)[2];
        return res ? res : "";
    }
    let res = [];
    let index = {};

    let childs = ele.children;
    for (let cele of childs) {
        let i = index[cele.localName.toUpperCase()];
        if (cele.children.length == 0) {
            res.push({
                ele: cele,
                index: i?i:0,
                supper: cele.parentNode,
                tag: cele.localName.toUpperCase(),
                attrs: get_attribute(cele),
                value: cele.textContent
            })
        } else {
            res.push.apply(res, create_VdomTree(cele));
        }
        if (i!=undefined) {
            index[cele.localName.toUpperCase()] += 1
        } else {
            index[cele.localName.toUpperCase()] = 1;
        };
    }
    // domTree(ele, function(_ele, _supper) {
    //     if (_ele.children.length == 0) {
    //         res.push({
    //             ele: _ele,
    //             supper: _ele.parentNode,
    //             tag: _ele.localName.toUpperCase(),
    //             attrs: get_attribute(_ele),
    //             value: _ele.textContent
    //         })
    //     }
    // })
    return res;
}
let nanoVdom = function(html) {
    let domArr = html.match(/<(.+?)( [^<>]*)?>([^<>]+)?<\/\1>/g);
    let textArr = []
    for (let domhtml of domArr) {
        let reg$arr = domhtml.split(/<(.+?)( [^<>]*)?>([^<>]+)?<\/\1>/g);
        textArr.push({
            eleName: reg$arr[0].toUpperCase(),
            value: reg$arr[3]
        });
    }
    return textArr;
}
let create_nVdom = function(html, _supperName) {
    let domArr = html.match(/<(.+?)( .+?)?>([\s\S]*?)<\/\1>/g);
    let textArr = [];
    let index = {};
    for (let domhtml of domArr) {
        let reg$arr = domhtml.split(/<(.+?)( .+?)?>([\s\S]*?)<\/\1>/g);
        if (!(/<(.+?)( .+?)?>([\s\S]*?)<\/\1>/g.test(reg$arr[3]))) {
            let i = index[reg$arr[1].toUpperCase()];
            textArr.push({
                index: i ? i : 0,
                supperName: _supperName,
                attrs: reg$arr[2] ? reg$arr[2] : "",
                eleName: reg$arr[1].toUpperCase(),
                value: reg$arr[3]
            });
            if (i!=undefined) {
                index[reg$arr[1].toUpperCase()] += 1;
            } else {
                index[reg$arr[1].toUpperCase()] = 1;
            }
        } else {
            textArr.push.apply(textArr, create_nVdom(reg$arr[3], reg$arr[1].toUpperCase()))
        }
    }
    return textArr;
}

let ele = document.querySelector("#app");
// domTree(ele,_ele=>{log(_ele.innerHTML)});

let vdomtree = create_VdomTree(ele);
log(vdomtree)
console.log(vdomtree)
let afterHtml = `<ul name="yo">
    <il>001</il>
    <il>002</il>
    <il>333</il>
    <il>444</il>
    <il>555</il>
</ul>
<ul id="u2">
    <il>001</il>
    <il>333</il>
    <il>222</il>
    <il>004</il>
    <il>005</il>
</ul>`

let samaValue = (a, b) => {
    return JSON.stringify(a) == JSON.stringify(b);
}
let sameEle = (aattr, battr) => {
    aattr = aattr.replace(/ class=.+? /g, "");
    battr = battr.replace(/ class=.+? /g, "");
    return aattr == battr;
}

let domdiff = function(nanoDomT, VdomT) {
    let nanoCur = 0,
        VCur = 0,
        changeArr = [];
    while (nanoCur < nanoDomT.length || VCur < VdomT.length) {
        let nv = nanoDomT[nanoCur],
            vv = VdomT[VCur];
        if (nv.value != vv.value) {
            changeArr.push({
                ele: vv.ele,
                newValue: nv.value
            })
        }
        nanoCur += 1;
        VCur += 1;
    }
    return changeArr;
}
let changeDom = function(cArr) {
    for (let change of cArr) {
        change.ele.innerHTML = change.newValue;
    }
}
let LongestCommonSubDom = function() {

}
// old:abcc_fgh
// new:ab__ahgh


// 根据层次遍历队列，执行对比操作
// 相等无操作，插入操作看左右父级名相等就插入，替换对于删除后又插入
// 插入后判断是否有子元素，有就一起插入，并剔除遍历队列
let lcsdDiff = function(){

}

let nVdom = nanoVdom(afterHtml);
let _nVdom = create_nVdom(afterHtml);
console.log(_nVdom)
let dif = domdiff(nVdom, vdomtree);
changeDom(dif);

console.log(dif)
