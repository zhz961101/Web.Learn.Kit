'use strict';
log("log tools runing!!");

let diff = (sequence1, sequence2) => {
    let dfChar = (text, target) => {
        let res = [];
        for (let i in text) {
            if (text[i] == target) {
                res.push(1);
            } else {
                res.push(0);
            }
        }
        return res;
    }
    let comArr = {};
    let ans = [];
    for (let index_a in sequence1) {
        let row = dfChar(sequence2, sequence1[index_a]);
        if (ans.length != 0) {
            for (let i = 0; i < row.length; i++) {
                if (row[i] == 1 && ans[i - 1] != 0) {
                    row[i] = ans[i - 1] + 1;
                }
            }
        }
        for (var i = 0; i < row.length; i++) {
            if (row[i] != 0) {
                let lens = row[i];
                let indexA = index_a - lens + 1;
                if (lens != 0) {
                    if (comArr[indexA] == undefined) {
                        comArr[indexA] = {
                            len: lens,
                            index: i - lens + 1
                        }
                    } else if (lens > comArr[indexA].len) {
                        comArr[indexA] = {
                            len: lens,
                            index: i - lens + 1
                        }
                    }
                }
            }
        }
        ans = row;
    }
    // delet not max part
    for (let sub in comArr) {
        if (comArr[sub].len != 1) {
            for (let _sub in comArr) {
                if (comArr[_sub].index < comArr[sub].index && comArr[_sub].len + comArr[_sub].index > comArr[sub].index) {
                    delete comArr[sub];
                    break;
                }
                if (parseInt(_sub) < parseInt(sub) + comArr[sub].len && parseInt(_sub) > parseInt(sub)) {
                    delete comArr[_sub];
                    continue;
                }
            }
        }
    }
    return comArr;
}

let difText = (ta, tb) => {
    let splitArr = diff(ta, tb),
        resA = "",
        resB = "",
        lastA = -1,
        lastB = -1;
    for (let a_index in splitArr) {
        let ai = parseInt(a_index),
            bi = parseInt(splitArr[a_index].index),
            lens = parseInt(splitArr[a_index].len);

        if (lastA != ai - 1 && lastA < ai) {
            let templen = ai - lastA + 1;
            resB += "_".repeat(templen);
            resA += ta.substring(lastA + 1, ai);
        }
        if (lastB != bi - 1 && lastB < bi) {
            let templen = bi - lastB + 1;
            resA += "_".repeat(templen);
            resB += tb.substring(lastB + 1, bi);
        }

        resA += ta.substring(ai, ai + lens);
        lastA = ai;
        resB += tb.substring(bi, bi + lens);
        lastB = bi;
    }
    return [resA, resB]
}

let LCCS = (sequence1, sequence2) => {
    let dfChar = (text, target) => {
        let res = [];
        for (let i in text) {
            if (text[i] == target) {
                res.push(1);
            } else {
                res.push(0);
            }
        }
        return res;
    }
    let ans = [];
    let maxIndex = 0;
    let maxLength = 0;
    for (let str_a of sequence1) {
        let row = dfChar(sequence2, str_a);
        if (ans.length == 0) {
            ans = row;
        } else {
            for (let i = 0; i < row.length; i++) {
                if (row[i] != 0 && ans[i - 1] != 0 && ans[i - 1] > maxLength) {
                    maxLength = ans[i - 1] + 1;
                    maxIndex = i - ans[i - 1];
                }
                if (row[i] == 1 && ans[i - 1] != 0) {
                    row[i] = ans[i - 1] + 1;
                }
            }
            ans = row;
        }
    }
    return sequence2.substring(maxIndex, maxIndex + maxLength);
}

let LCS = (sequence1, sequence2) => {
    let lcsArr = [];
    for (let indexA in sequence1) {
        let countNum = 0,
            rowArr = [],
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
    let res = [],
        ans = "",
        i = lcsArr.length - 1,
        j = lcsArr[0].length - 1;
    while (!(i == -1 || j == -1)) {
        let lv = j == 0 ? 0 : lcsArr[i][j - 1],
            tv = i == 0 ? 0 : lcsArr[i - 1][j],
            ltv = j != 0 && i != 0 ? lcsArr[i - 1][j - 1] : 0,
            nv = lcsArr[i][j];
        if (lv == tv) {
            res.unshift({
                indexA: i,
                indexB: j
            })
            ans = sequence1.charAt(i) + ans;
            i -= 1;
            j -= 1;
        } else {
            if (lv > tv) {
                j -= 1;
            } else {
                i -= 1;
            }
        }
    }
    console.log(lcsArr)
    console.log(res)
    console.log(ans)
    return {
        res,
        ans
    }
}

function ToDBC(txtstring) {
    var tmp = "";
    for (var i = 0; i < txtstring.length; i++) {
        if (txtstring.charCodeAt(i) == 32) {
            tmp = tmp + String.fromCharCode(12288);
        }
        if (txtstring.charCodeAt(i) < 127) {
            tmp = tmp + String.fromCharCode(txtstring.charCodeAt(i) + 65248);
        }
    }
    return tmp;
}
let lcsDiff = (ta, tb) => {
    let lcsobj = LCS(ta, tb),
        difA = "",
        difB = "";
    for (let i = 0; i < lcsobj.res.length; i++) {
        let ia = lcsobj.res[i].indexA,
            ib = lcsobj.res[i].indexB;
        if (lcsobj.res[i].indexA != lcsobj.res[i].indexB) {
            let tlen = ib - difA.length;
            difB += tb.substring(difA.length, ib);
            difA += "_".repeat(tlen);
        }
        difB += tb[ib];
        difA += ta[ia];
    }
    difA = ToDBC(difA);
    difB = ToDBC(difB);
    console.log(difA,difB);
    return {
        difA,
        difB
    }
}
