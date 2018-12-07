function clear_timer() {
    let cur = setTimeout(function() {}, 0);
    let start = (cur - 100) > 0 ? cur - 100 : 0;
    for (let i = start; i <= cur; i++) {
        clearTimeout(i);
    }
}

const del_dom = dom => dom.parentNode.removeChild(dom);
