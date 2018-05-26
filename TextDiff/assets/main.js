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
        if (ans.length != 0){
            for (let i = 0; i < row.length; i++) {
                if (row[i] == 1 && ans[i - 1] != 0) {
                    row[i] = ans[i - 1] + 1;
                }
            }
        }
        for (var i = 0; i < row.length; i++) {
            if(row[i]!=0){
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
    console.log(comArr);
    return comArr;
}

let LCS = (sequence1, sequence2) => {
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
