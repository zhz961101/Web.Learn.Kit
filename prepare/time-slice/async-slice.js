const $ = q => document.querySelector.call(document,q)
var $ul = $('#lsbox')
var $inp = $('#inp')


function* flush(){
    while(true){
        for (var ch of $ul.children) {
            yield void 0;
            if(ch.innerText != $inp.value)ch.innerText = $inp.value

            yield void 0;
            var len = $inp.value.length + 1
            if($ul.children.length < len)$ul.appendChild(document.createElement("li"))
            else if ($ul.children.length > len)$ul.removeChild($ul.children[0])
        }
    }
}

function time_slicing(gen){
    var isruning = false;
    function inner(){
        window.requestIdleCallback((deadline)=>{
            while(deadline.timeRemaining()>0)gen.next();
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
