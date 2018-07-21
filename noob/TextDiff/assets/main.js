'use strict';
log("log tools runing!!");

let _lcs = (sequence1, sequence2) => {
    let lcsArr = [];
    for (let indexA in sequence1) {
        let rowArr = [],
            charA = sequence1[indexA];
        for (let indexB in sequence2) {
            let charB = sequence2[indexB],
                lv = indexB == 0 ? 0 : rowArr[indexB - 1],
                tv = indexA == 0 ? 0 : lcsArr[indexA - 1][indexB],
                ltv = indexB != 0 && indexA != 0 ? lcsArr[indexA - 1][indexB - 1] : 0;
            if (charA == charB) {
                rowArr.push(ltv + 1);
            } else {
                rowArr.push(lv > tv ? lv : tv);
            }
        }
        lcsArr.push(rowArr);
    }
    return lcsArr;
}
let _lcsdiff = (ta, tb) => {
    let lcsArr = _lcs(ta, tb),
        difA = "",
        difB = "",
        curA = ta.length - 1,
        curB = tb.length - 1,
        action = [];
    while (!(curA <= 0 && curB <= 0)) {
        let lv = curB <= 0 ? 0 : lcsArr[curA][curB - 1],
            tv = curA <= 0 ? 0 : lcsArr[curA - 1][curB],
            ltv = (curA <= 0 || curB <= 0) ? 0 : lcsArr[curA - 1][curB - 1],
            nv = lcsArr[curA][curB];
        // if (ta[curA]==tb[curB]) {
        if (ltv >= tv && ltv >= lv && ltv + 1 == nv) {
            // same char
            // console.log(curA,curB,ltv,nv,ltv+1==nv)
            difA = ta[curA] + difA;
            difB = tb[curB] + difB;
            curA -= 1;
            curB -= 1;
            action = "|" + action;
        } else if (lv == tv) {
            difA = ta[curA] + difA;
            difB = tb[curB] + difB;
            curA -= 1;
            curB -= 1;
            action = "x" + action;
        } else if (lv > tv) {
            // ta+1"_" tb+1cahr
            difA = "-" + difA;
            difB = tb[curB] + difB;
            curB -= 1;
            action = "-" + action;
        } else {
            // tb+1"_" ta+1char
            difA = ta[curA] + difA;
            difB = "-" + difB;
            curA -= 1;
            action = "-" + action;
        }
    }
    difA = ta[0] + difA;
    action = (ta[0] == tb[0] ? "|" : "x") + action;
    difB = tb[0] + difB;
    return [difA, action, difB]
}

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
