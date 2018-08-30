// const prt = function() {
//     let appendStrDiv = (s, el) => {
//         let n = document.createElement("li");
//         n.innerText = s;
//         el.appendChild(n);
//     }
//     var argsArray = Array.prototype.slice.call(arguments);
//     const $body = document.body;
//     var $ul = document.createElement("ul");
//     for (let a of argsArray) {
//         console.log(a);
//         appendStrDiv(a, $ul);
//     }
//     $body.appendChild($ul);
//     $body.appendChild(document.createElement("hr"));
// }
const typeAT = a=>Object.prototype.toString.call(a)

const isNum = a=>typeAT(a)=="[object Number]";
const isSymbol = a=>typeAT(a)=="[object String]";
const isList = a=>typeAT(a)=="[object Array]";
const isCallable = a=>typeAT(a)=="[object Function]";


function deepClone(obj){
    let objClone = Array.isArray(obj)?[]:{};
    if(obj && typeof obj==="object"){
        for(key in obj){
            if(obj.hasOwnProperty(key)){
                //判断ojb子元素是否为对象，如果是，递归复制
                if(obj[key]&&typeof obj[key] ==="object"){
                    objClone[key] = deepClone(obj[key]);
                }else{
                    //如果不是，简单复制
                    objClone[key] = obj[key];
                }
            }
        }
    }
    return objClone;
}


var Scheme = {}

Scheme.parse = function(program){
    return Scheme.readFromTokens(Scheme.tokenize(program));
}

Scheme.tokenize = function(chars) {
    return chars.replace(/\(/g, " ( ").replace(/\)/g, " ) ").replace(/ +/g, " ").trim().split(" ");
}

Scheme.readFromTokens = function(tokens) {
    if (tokens.length == 0) throw new Error("unexpected EOF while reading");
    let token = tokens.shift();
    if (token == "(") {
        let L = []
        while (tokens[0] != ")") {
            L.push(Scheme.readFromTokens(tokens))
        }
        tokens.shift();
        return L;
    } else if (")" == token) {
        throw new Error("unexpected )");
    } else {
        return Scheme.atom(token);
    }
}

Scheme.atom = t => isNaN(t % 1) ? t : (t % 1 == 0 ? parseInt(t) : parseFloat(t));
// Scheme.atom = t=>{
//     if(!isNaN(t%1)){
//         if(t%1==0)return parseInt(t);
//         else return parseFloat(t);
//     }else return t;
// }

Scheme.base_env = function(options){
    let env = Object.create(null);
    // Object.assign(env,deepClone(Math));
    Object.assign(env,options||null);
    return env;
}
Scheme.standard_env = function(){
    const l2j = opt => (a,b) => eval(`${a}${opt}${b}`);
    const l1j = opt => a => eval(`${opt}${a}`);
    const o2j = opt => a => eval(`${a}.${opt}`)
    let built_env = {
        "+":l2j("+"),"-":l2j("-"),"/":l2j("/"),"*":l2j("*"),
        "or":l2j("||"),"and":l2j("&&"),"not":l1j("!"),

        ">":l2j(">"),"<":l2j("<"),">=":l2j(">="),
        "<=":l2j("<="),"=":l2j("=="),

        "len":o2j("length"),"car":a=>a[0],"cdr":a=>a.splice(1),
        "cons":(a,b)=>[a,b],
        "list":(...args)=>args,
        "list?":a=>typeAT(a)=="[object Array]","map":(items,fn)=>items.map(fn),
        "empty?":a=>a.length==0,

        "max":(...args)=>Math.max.apply(Math,args),
        "min":(...args)=>Math.min.apply(Math,args),

        "number?":a=>isNum(a),"procedure?":a=>isCallable(a),"symbol?":a=>isSymbol(a)
    }// built_env end
    return new Scheme.base_env(built_env);
}

Scheme.global_env = new Scheme.standard_env();

Scheme.eval = function(vals,env){
    env=env||Scheme.global_env;
    if(isList(vals)){
        if(vals[0]=="if"){
            let [t1,test,conseq,alt] = vals;
            let exp = Scheme.eval(test,env)?conseq:alt;
            return Scheme.eval(exp,env);
        }else if (vals[0]=="def") {
            let [t2,key,exp] = vals;
            env[key] = Scheme.eval(exp,env);
            return "[_DEFINED_]";
        }else{
            let proc = Scheme.eval(vals[0],env);
            let args = vals.splice(1).map(v=>Scheme.eval(v,env));
            return proc.apply(null,args);
        }
    }
    else if(isNum(vals))return vals;
    else if (isSymbol(vals))return env[vals];
}

const Tst = (fn, input, name) => {
    let p = fn(input);
    // prt(name, p)
    console.log("// ",name,input,"\n", p,"\n")
    return p;
}

~ function _TEST_() {
    // let tokens = Tst(Scheme.tokenize, "(+ 1 (* 5 9))", "tokenize TEST");
    //
    // let AST = Tst(Scheme.readFromTokens, tokens, "readFromTokens TEST");

    // console.log(new Scheme.base_env());
    // console.log(new Scheme.standard_env());

    const glo_e = program => {
        let AST = Scheme.parse(program)
        return Scheme.eval(AST)
    }

    Tst(glo_e, "(list? (list 1 2 3))", "eval TEST");
    Tst(glo_e, "(max 12 10 43 55 11 92 111)", "eval TEST");
    Tst(glo_e, "(min 12 10 43 55 11 92 111)", "eval TEST");
    Tst(glo_e, "(def r 10)", "eval TEST");
    Tst(glo_e, "(def PI 3.141592654)", "eval TEST");
    Tst(glo_e, "(* PI (* r r))", "eval TEST");
    Tst(glo_e, "(if (and (>= 3 2) (<= 3 5)) (* 3 3) (* 3 7))", "eval TEST");
}()
