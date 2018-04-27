'use strict';
var logging = document.getElementById('test-log');
while (logging.children.length > 1) {
    logging.removeChild(logging.children[logging.children.length - 1]);
}
let _startTimeStamp = new Date().getTime();

function log(s) {
    var p = document.createElement('p');

    let isObject = (obj) => {
        return typeof obj === typeof {};
    }
    let printLine = (msg, brOn) => {
        p.innerHTML += (brOn !== false ? "<br/>⇒ " : "") + "<span style='font-weight:bold'>" + msg + "</span>";
    }
    let printObj = (obj, level,upStrNum) => {
        level = level || 0;
        upStrNum = upStrNum || 0;
        let Nxtemp = function(num, ele) {
            ele = ele || " ";
            let res = "";
            for (let i = 0; i < num; i++) {
                res += ele;
            }
            return res
        }
        if (isObject(obj)) {
            for (let variable in obj) {
                if (obj.hasOwnProperty(variable)) {
                    printLine(`${Nxtemp(level+upStrNum,"&nbsp&nbsp")}[${variable}] : `);
                    if(obj[variable]=="japen"){
                        console.log(obj[variable]);
                    }
                    printObj(obj[variable],level+1,variable.length + upStrNum);
                    // console.log(variable, obj[variable], level);
                }
            }
        } else {
            if (level === 0) {
                printLine(obj);
            } else {
                printLine(obj,false);
            }
        }
    }

    function getTimeStamp() {
        return new Date().getTime() - _startTimeStamp;
    }
    p.innerHTML = "## <small>TimeStamp:</small>" + getTimeStamp()
    printObj(s);
    p.innerHTML += "<br/> >> <small>EOF</small>";
    logging.appendChild(p);
    window.scrollTo(0, document.body.scrollHeight);
}
// log tools end
