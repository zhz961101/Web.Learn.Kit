class TemplateEngine {
    constructor(html, preMark, tailMark) {
        html = this.prehtml(html)
        let fixRegKeyWord = str => str===undefined?null:str.replace(/([$|{|}|(|)|.|\\|*|+|?|^|\||\[|\]])/g, "\\$1");
        preMark = fixRegKeyWord(preMark) || "<%";
        tailMark = fixRegKeyWord(tailMark) || "%>";
        let re = new RegExp(preMark + "(.+?)" + tailMark, "g"),
            reExp = /(^( )?(var|let|if|for|else|switch|case|break|{|}|;))(.*)?/g,
            cursor = 0,
            code = 'with(obj) { var r=[];\n',
            match;
        let add = function(line, js) {
            js ? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
                (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
            return add;
        }
        while (match = re.exec(html)) {
            add(html.slice(cursor, match.index))(match[1], true);
            cursor = match.index + match[0].length;
        }
        add(html.substr(cursor, html.length - cursor));
        this.code = (code + 'return r.join(""); }').replace(/[\r\t\n]/g, ' ');
    }
    prehtml(html){
        let ml = html.match(/>[\s\S]*?</g)
        let sl = html.split(/>[\s\S]*?</g)
        let temp = sl[sl.length-1].split(">")
        if(temp[1] !== ""){
            sl[sl.length-1] = temp[0]
            ml.push(">"+temp[1])
        }
        let res = ""
        for (let i = 0; i < sl.length; i++) {
            res += sl[i].replace(/ (bind):(.+?)=(\\?('|")(.+?)\\?('|"))/g," $2=\"<% $5 %>\"") + ml[i]
        }
        return res
    }
    joint(options) {
        let result;
        try {
            result = new Function('obj', this.code).apply(options, [options]);
        } catch (err) {
            console.error("'" + err.message + "'", " in \n\nCode:\n", this.code, "\n");
        }
        return result;
    }
}
