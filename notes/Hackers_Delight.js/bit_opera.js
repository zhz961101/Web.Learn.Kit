var dolist = []

function bin2text(b,n,j){
    j = j || " ";
    n = n || 4;
    let ret = [];
    let repeat=(str , n)=>new Array(n+1).join(str)
    b = b.split("").reverse().join("");
    for (var i = 0; i < b.length/n; i++) {
        ret.push(b.slice(i*n,n*(i+1)));
    }
    ret.reverse()
    for (var i = 0; i < ret.length; i++) {
        ret[i]=ret[i].split("").reverse().join("");
    }
    if(ret[0].length!=4)ret[0]= repeat("0",4-ret[0].length)+ret[0];
    if(ret.length==1)ret.unshift("0000");
    return ret.join(j);
}

function _TEST_(){
    var TEST_count = 0;
    return (t,tfn,fix,name)=>{
        TEST_count++;
        name = name || tfn.name;
        fix = fix || 10;
        if(dolist.length!=0&&dolist.indexOf(TEST_count)==-1&&dolist.indexOf(name)==-1)return;
        let ret = tfn(t);
        console.log(name," \t:",bin2text(t.toString(fix))," => ",bin2text(ret.toString(fix)));
    }
}

// ~ is a bitwise inversion in JavaScript,
// but it is not literal, its function is
// based on 32-bit inversion, very inexplicable.
//    So if you want to get a bitwise negation of
//    an eight-bit binary number you can
//    use 0xFF ^ x (binary number)

var test = new _TEST_();

function close_r(x){return x&(x-1)}
test(0b01011110,close_r,2)

function open_r(x){return x|(x+1)}
test(0b01010111,open_r,2)

function close_rp(x){return x&(x+1)}
test(0b01010111,close_rp,2)

function opend_rp(x){return x|(x-1)}
test(0b01010111,opend_rp,2)

function test_r0(x){return 0xFF^x&(x+1)}
test(0b01010111,test_r0,2)

function test_r1(x){return 0xFF^x|(x-1)}
test(0b01011000,test_r1,2)

function test_rp0(x){return 0xFF^x&(x-1)} // ~(x|-x) or (x&-x)-1
test(0b01011000,test_rp0,2)

function test_rp1(x){return 0xFF^x|(x+1)}
test(0b01010111,test_rp1,2)

function save_r1(x){return x&(-x)}
test(0b01011000,save_r1,2)

function save_r1l(x){return x^(x-1)}
test(0b01011000,save_r1l,2)

function save_r0l(x){return x^(x+1)}
test(0b01010111,save_r0l,2)

function close_r11(x){return ((x&-x)+x)&x} // ((x|(x-1))+1)&x
test(0b01011100,close_r11,2)
