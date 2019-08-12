function css_load(text) {
    var ret = {}
    for (var row of text.split(";")) {
        if (row != "") {
            var t = row.split(":")
            ret[t[0].trim()] = t[1].trim();
        }
    }
    return ret
}

function css_dump(obj) {
    var ret = ""
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            ret += `${key}:${obj[key]};`
        }
    }
    return ret
}

function rotate_vid() {
    const $ = q => document.querySelector.call(document, q)
    const $el = $(".html5-main-video")
    var css = css_load($el.style.cssText)
    if($el.rstate == undefined || css.transform == undefined)
        $el.rstate = 0
    var state = $el.rstate
    state = (state + 1) % 4
    $el.rstate = state
    var deg = state * 90

    if(css.left == "0px" || css.left == "calc(0px)"){
        css.left = `calc( ( ${css.width} - ${css.height} ) / 2)`
        css.width = css.height
    }else{
        css.width = `calc( ${css.left} * 2 + ${css.width} )`
        css.left = "0px"
    }

    css["transform"] = `rotate(${deg}deg)`

    $el.style.cssText = css_dump(css)
}


res = css_load("width: 1317px; height: 741px; top: 4.59375px; left: 0px;")

console.log(res)
