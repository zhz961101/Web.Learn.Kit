'use strict';
let lcsText = (rows1, rows2) => {
    let lcsArr = [];
    for (let indexA in rows1) {
        let rowArr = [],
            rowA = rows1[indexA];
        for (let indexB in rows2) {
            let rowB = rows2[indexB],
                lv = indexB == 0 ? 0 : rowArr[indexB - 1],
                tv = indexA == 0 ? 0 : lcsArr[indexA - 1][indexB],
                ltv = indexB != 0 && indexA != 0 ? lcsArr[indexA - 1][indexB - 1] : 0;
            if (rowA == rowB) {
                rowArr.push(ltv + 1);
            } else {
                rowArr.push(lv > tv ? lv : tv);
            }
        }
        lcsArr.push(rowArr);
    }
    return lcsArr;
}
let lcsDom = (newDom, oldDom) => {
    let d1Html = document.querySelector(newDom).innerHTML,
        d2Html = document.querySelector(oldDom).innerHTML;
    let subDom1 = d1Html.match(/<(.+?)( .+?)?>([\s\S]*?)<\/\1>/g),
        subDom2 = d2Html.match(/<(.+?)( .+?)?>([\s\S]*?)<\/\1>/g)
    let lcsArr = lcsText(subDom1, subDom2),
        curA = subDom1.length -1,
        curB = subDom2.length -1,
        planArr = [];
    while (!(curA <= 0 && curB <= 0)) {
        let lv = curB <= 0 ? 0 : lcsArr[curA][curB - 1],
            tv = curA <= 0 ? 0 : lcsArr[curA - 1][curB],
            ltv = (curA <= 0 || curB <= 0) ? 0 : lcsArr[curA - 1][curB - 1],
            nv = lcsArr[curA][curB];
        // if (ta[curA]==tb[curB]) {
        if (ltv >= tv && ltv >= lv && ltv + 1 == nv) {
            // same char
            // console.log(curA,curB,ltv,nv,ltv+1==nv)
            curA -= 1;
            curB -= 1;
        } else if (lv > tv) {
            // ta+1"_" tb+1cahr
            planArr.push({
                option: "delete",
                index: curB
            })
            curB -= 1;
        } else {
            // tb+1"_" ta+1char
            planArr.push({
                option: "add",
                index: curB,
                content: subDom1[curA]
            })
            curA -= 1;
        }
    }
    if(subDom1[0]!=subDom2[0]){
        planArr.push({
            option: "add",
            index: 0,
            content: subDom1[0]
        })
    }
    return planArr
}
