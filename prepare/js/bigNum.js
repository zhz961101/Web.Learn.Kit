
const dep_cpy = o=>JSON.parse(JSON.stringify(o));
const str_reverse = s=>s.split("").reverse().join("");
const repeat=(str , n)=>new Array(parseInt(n)+1).join(str);
const IsString = o=>Object.prototype.toString.call(o)===Object.prototype.toString.call("")

function BIG_num_(num){
    let ret = Object.create(null);
    ret.num = num;
    return ret;
}

function BIG_ten_(_pow){
    return new BIG_Int_("1"+repeat("0",_pow));
}

function BIG_Int_(num){
    let ret = new BIG_num_(num)
    Object.setPrototypeOf(ret,{
        bin(){
            let cn = str_reverse(dep_cpy(this.num))
            for (let _ni of cn) {
                
            }
        },
    })
    return ret;
}

function BIG_bin_(num){
    let ret = new BIG_num_(num)
    Object.setPrototypeOf(ret,{
        add(x){
            let cx=str_reverse(dep_cpy(IsString(x)?x:x.num)),
            cn=str_reverse(dep_cpy(this.num)),
            cf=0;
            for (var _ni in cx) {
                let _a = parseInt(cn[_ni]),_aend = parseInt(cx[_ni]);
                cn = cn.split("");
                cn[_ni] = _a^_aend^cf;
                cn = cn.join("");
                cf = (_a&_aend)|(_a&cf)|(_aend&cf);
            }
            _ni = parseInt(_ni)
            while(cf==1){
                _ni+=1;
                console.log(_ni)
                let _ac = parseInt(cn[_ni])
                if(!_ac)break;
                console.log(_ac,cf,_ac^cf,cn,_ni)
                cn = cn.split("");
                cn[_ni] = _ac^cf;
                cn = cn.join("");
                cf = _ac&cf;
            }
            if(cf==1)cn+="1";
            return new BIG_bin_(str_reverse(cn));
        },
        mul(x){
            let cx=str_reverse(dep_cpy(IsString(x)?x:x.num));
            mulTable = [];
            for (let _mi in cx) {
                if(cx[_mi]=="1"){
                    let bo = new BIG_bin_(dep_cpy(this.num)+repeat("0",_mi));
                    console.log(bo,this.num,repeat("0",_mi))
                    mulTable.push(bo);
                }
            }
            return mulTable.reduce((ret,B_b)=>B_b.add(ret));
        }
    })
    return ret;
}

function sys_tansf(a,b,as,bs){
    as = as || 10
    bs = bs || 2
}

let a = BIG_bin_("111"),b = BIG_bin_("101")
console.log(a.add(b))
console.log(a.mul(b))

// let a = BIG_bin_("111"),b = BIG_bin_("1")
// console.log(a.add(b))
