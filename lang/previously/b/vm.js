const debugMODE = false;

var REG = Object.create(null);
REG.AX=0;
REG.BX=0;
REG.CX=0;
REG.DX=0;
REG.IP=0;
REG.IR=true;
REG.CF=0;

// var REG = {
//     AX: 0,
//     BX: 0,
//     CX: 0,
//     DX: 0,
//     IP: 0,
//     IR: true,
//     CF: 0
// }

var STACK = []

var code2Line = _c => _c.match(/[A-Z]+( \w+( \w+?)?)?/gi)
var splitLineVal = _l => {
    let ret = /[A-Z]+ ((\w+?) ?(\w+?)?)?/gi.exec(_l);
    console.log(ret, _l);
    return [ret[2], ret[3], ret[1]];
}

// var code = "PSH 5 PSH 5 ADD POP SET AX 9 HTL".split(" ")
var code = `SET AX 1
SET BX 1
SET CX 10
ADD AX BX
DIS AX
ADD BX AX
DIS BX
SUB CX 1
CMP CX 0
JE 11
JMP 3
HTL`.split("\n")

// var code = `PSH 5
//     PSH 5
//     ADD
//     POP BX
//     ADD DX BX
//     SET AX 9
//     HTL`.split("\n")

var log = () => {
    var _s = "REG\t=> "
    for (var key in REG) {
        _s += key + " : " + REG[key] + "; "
    }
    _s += "\nSTACK\t=> " + STACK;
    console.log(_s)
}

var _fetch = () => code[REG.IP].trim()
var line_fetch = () => _fetch().split(" ").slice(1)
var jump = f => REG.IP = parseInt(f) - 1;

var _eval = function(_inst_) {
    // console.log("\n:"+_inst_+"\n",_inst_.split(" ")[0]);
    let push = val => STACK.push(val);
    let pop = () => parseInt(STACK.pop());
    switch (_inst_.split(" ")[0]) {
        case "PSH":
            let psh_gett = line_fetch()[0];
            push(/[A-Z]/g.test(psh_gett) ? REG[psh_gett] : psh_gett);
            break;
        case "POP":
            let p = pop();
            let pop_gett = line_fetch()[0];
            if (pop_gett && /[A-Z]+/g.test(pop_gett)) REG[pop_gett] = p;
            // console.log(p,_inst_)
            break;
        case "ADD":
            let add_gett = line_fetch();
            if (add_gett.length != 0) {
                REG[add_gett[0]] += /[A-Z]+/g.test(add_gett[1]) ? parseInt(REG[add_gett[1]]) : parseInt(add_gett[1])
            } else push(pop() + pop())
            break;
        case "SUB":
            let sub_gett = line_fetch();
            if (sub_gett.length != 0) {
                REG[sub_gett[0]] -= /[A-Z]+/g.test(sub_gett[1]) ? parseInt(REG[sub_gett[1]]) : parseInt(sub_gett[1])
            } else push(pop() - pop())
            break;
        case "SET":
            let _kv = line_fetch();
            REG[_kv[0]] = parseInt(_kv[1]);
            break;
        case "DIS":
            let _disp = line_fetch();
            if (/[A-Z]+/g.test(_disp[0])) console.log(REG[_disp[0]])
            else console.log(_disp[0])
            break;
        case "CMP":
            let _cmp = line_fetch();
            let c_a = 0,
                c_b = 0;
            if (/[A-Z]+/g.test(_cmp[0])) c_a = REG[_cmp[0]];
            else c_a = _cmp[0];
            if (/[A-Z]+/g.test(_cmp[1])) c_b = REG[_cmp[1]];
            else c_b = _cmp[1];
            REG.CF = c_a - c_b;
            break;
        case "JMP":
            jump(line_fetch()[0]);
            break;
        case "JE":
            let _je = line_fetch();
            if (REG.CF == 0) jump(_je[0]);
            break;
        case "JG":
            let _jg = line_fetch();
            if (REG.CF < 0) jump(_jg[0]);
            break;
        case "HTL":
            REG.IR = false;
            break;
    }
}

var run = function() {
    while (REG.IR) {
        _eval(_fetch());
        REG.IP += 1;
        debugMODE && log();
    }
}

run()
