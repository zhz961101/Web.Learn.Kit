const $ = q => document.querySelector.call(document,q)
var $ul = $('#lsbox')
var $inp = $('#inp')


function* flush(){
    while(true){
        for (var ch of $ul.children) {
            yield void 0;
            if(ch.innerText != $inp.value)ch.innerText = $inp.value
        }
        var len = $inp.value.length + 1
        while($ul.children.length < len){
            yield void 0;
            $ul.appendChild(document.createElement("li"))
        }
        while($ul.children.length > len){
            yield void 0;
            $ul.removeChild($ul.children[0])
        }
    }
}

function time_slicing(gen){
    var isruning = false;
    var done = false;
    function inner(){
        if(done)return void 0;
        window.requestIdleCallback((deadline)=>{
            while(deadline.timeRemaining()>0)done = gen.next().done;
            if(isruning)inner(gen);
        })
    }
    return {
        run(){
            isruning = true;
            inner()
        },
        stop(){
            isruning = false;
        }
    };
}


slicer = time_slicing(flush())

$inp.addEventListener('focus',()=>{
    slicer.run()
})
$inp.addEventListener('blur',()=>{
    slicer.stop()
})
