'use strict';

// level
let resolveDom = function(Selector) {
    let get_attribute = ele => {
        let res = /<(.+?)( .+?)?>/g.exec(ele.outerHTML)[2];
        return res ? res : "";
    }
    let root = document.querySelector(Selector),
        resQue = [root],
        ansArr = [],
        index = {};
    while (resQue.length != 0) {
        let ele = resQue.shift();
        let childs = ele.children;
        let tagName = ele.tagName;
        let hasChilds = false;
        let i = index[tagName] ? index[tagName] : 0;
        if (childs.length != 0) {
            resQue.push.apply(resQue, childs);
            hasChilds = true;
        }
        ansArr.push({
            hasChilds: hasChilds,
            attr: get_attribute(ele),
            ele: ele,
            index: i
        });
        if (index[tagName] == undefined) {
            index[tagName] = 1;
        } else {
            index[tagName] += 1;
        }
    }
    return ansArr;
}

let resolveHtml = function(_html) {
    let resQue = [_html],
        ansArr = [],
        index = {};
    while (resQue.length != 0) {
        let ele_html = resQue.shift();
        let childs = ele_html.match(/<(.+?)( .+?)?>([\s\S]*?)<\/\1>/g);
        let reg$arr = [];
        if (childs == null) {
            continue;
        }
        for (let i = 0; i < childs.length; i++) {
            reg$arr = childs[i].split(/<(.+?)( .+?)?>([\s\S]*?)<\/\1>/g);
            let ch_html = reg$arr[3],
                ch_childs = ch_html.match(/<(.+?)( .+?)?>([\s\S]*?)<\/\1>/g),
                _i = index[reg$arr[1].toUpperCase()] ? index[reg$arr[1].toUpperCase()] : 0,
                hasChilds = false;
            if (ch_childs != null) {
                resQue.push.apply(resQue, ch_childs);
                hasChilds = true;
            }
            ansArr.push({
                hasChilds: hasChilds,
                index: _i,
                attr: reg$arr[2] ? reg$arr[2] : "",
                tag: reg$arr[1].toUpperCase(),
                html: ch_html
            });
            if (index[reg$arr[1].toUpperCase()] == undefined) {
                index[reg$arr[1].toUpperCase()] = 1;
            } else {
                index[reg$arr[1].toUpperCase()] += 1;
            }
        }
    }
    return ansArr;
}

//
// domtree = {
//     root:{
//         ele:xxx,
//         childs:[]
//     }
// }
// child = {
//     attr:"",
//     ele:xxx,
//     hasChilds:false,
//     childs:[]
// }
let createObjByDom = (Selector) => {
    let get_attribute = ele => {
        let res = /<(.+?)( .+?)?>/g.exec(ele.outerHTML)[2];
        return res ? res : "";
    }
    let root = document.querySelector(Selector);
    let eachChild = ele => {
        let res = {
            tag: ele.tagName,
            ele: ele,
            attr: get_attribute(ele),
            hasChilds: ele.children.length != 0,
            childs: []
        }
        if (!res.hasChilds) {
            res.html = res.ele.innerHTML;
            return res;
        }
        for (let child of ele.children) {
            res.childs.push(eachChild(child))
        }
        return res;
    }
    return eachChild(root);
}
let createObjByHtml = (_html) => {
    let eachChild = ele_html => {
        let reg$arr = ele_html.split(/<(.+?)( .+?)?>([\s\S]*?)<\/\1>/g);
        let childs = reg$arr[3].match(/<(.+?)( .+?)?>([\s\S]*?)<\/\1>/g);
        let res = {
            tag: reg$arr[1].toUpperCase(),
            attr: reg$arr[2] ? reg$arr[2] : "",
            hasChilds: childs != null,
            childs: []
        }
        if (res.hasChilds) {
            for (let child of childs) {
                res.childs.push(eachChild(child));
            }
        } else {
            res.html = reg$arr[3];
        }
        return res;
    }
    return eachChild(_html);
}

let compareDomTree = (newTree, oldTree) => {
    let isSameEleAttr = (aattr, battr) => {
        aattr = aattr.replace(/ class=.+? /g, "");
        battr = battr.replace(/ class=.+? /g, "");
        return aattr == battr;
    }
    let isSameEle = (eleObjA, eleObjB) => {
        return (
            eleObjA.tag == eleObjB.tag &&
            isSameEleAttr(eleObjA.attr, eleObjB.attr)
        )
    }
    let compareDom = (newD, oldD) => {
        if (isSameEle(newD, oldD)) {
            if (newD.hasChilds && oldD.hasChilds) {
                return true;
                // need continue compare
            }
            if (newD.hasChilds && !oldD.hasChilds) {
                return newD.childs;
                // append childs
            }
            if (!newD.hasChilds && oldD.hasChilds) {
                return [];
            }
            if (!newD.hasChilds && !oldD.hasChilds) {
                return newD.html;
                // change to some string
            }
        } else {
            return false;
        }
    }
    let revisePlan = [];
    let oChs = oldTree.childs, nChs = newTree.childs;
    for (let nindex in nChs) {
        let nchild = nChs[nindex]
        for (let oindex in oChs) {
            let ochild = oChs[oindex];
            if(ochild==undefined)continue;
            let comTemp = compareDom(nchild, ochild);
            if (comTemp == true) {
                revisePlan.push.apply(revisePlan, compareDomTree(nchild, ochild));
                delete oChs[oindex];
                break;
            }
            if (typeof comTemp == typeof []) {
                if (comTemp.length != 0) {
                    for (let needAdd of comTemp) {
                        revisePlan.push({
                            option: "add",
                            ele: ochild.ele
                        })
                    }
                } else {
                    for (let needDele of ochild.childs) {
                        revisePlan.push({
                            option: "delete",
                            ele: ochild.ele
                        })
                    }
                }
                delete oChs[oindex];
                break;
            }
            if (typeof comTemp == typeof "") {
                if (nchild.html != ochild.html) {
                    revisePlan.push({
                        option: "change",
                        ele: ochild.ele,
                        text: comTemp
                    })
                }
                delete oChs[oindex];
                break;
            }
            if (comTemp == false) {
                continue;
            }
        }
    }
    return revisePlan;
}
