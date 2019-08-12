
function web_debug(){
    [].forEach.call($$("*"),function(a){a.style.outline="1px solid #"+(~~(Math.random()*(1<<24))).toString(16)});
}

function star_render(rate = 0){
    return "★★★★★☆☆☆☆☆".slice(5 - rate, 10 - rate);
}

function randStr(length = 16){
    Math.random().toString(36).substring(2)
}
