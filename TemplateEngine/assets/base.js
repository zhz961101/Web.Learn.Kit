class TemplateEngine {
    constructor(html, preMark, tailMark) {
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
