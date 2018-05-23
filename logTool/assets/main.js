'use strict';
var logging = document.getElementById('test-log');
if(!logging){
    throw new Error("Pls define an element of id as test-log");
}
while (logging.children.length > 1) {
    logging.removeChild(logging.children[logging.children.length - 1]);
}
let _startTimeStamp = new Date().getTime();

/**
 * print text-log in logging element
 * @param  {[string|object]} s - logging content
 * @return void
 */
function log(s) {
    var p = document.createElement('p');
    let preLog = (msg)=>{
        return msg.replace(/</g,"&lt;").replace(/>/g,"&gt;")
    }
    s = preLog(s)
    let isObject = (obj) => {
        return typeof obj === typeof {};
    }
    let printLine = (msg, brOn) => {
        p.innerHTML += (brOn !== false ? "<br/>⇒ " : "") + "<span style='font-weight:bold'>" + msg + "</span>";
    }
    /**
     * logging object and indent
     * @param  {object|string} obj  - end or start object
     * @param  {Number} level    - iteration level
     * @param  {Number} upStrNum - upper indent times
     * @return {void}
     */
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
                    printObj(obj[variable],level+1,variable.length + upStrNum);
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
    p.innerHTML += "<br/> >> <small>EOF</small><hr/>";
    logging.appendChild(p);
    window.scrollTo(0, document.body.scrollHeight);
}
// log tools end
