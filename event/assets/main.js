let $ = my$;

let myEvent = (()=>{
    let subscribe = {}
    let isFunction = (obj)=>{
        return typeof obj === "function"
    }
    // channel : [function,]
    return {
        on : (channel,fn)=>{
            let old = subscribe[channel];
            subscribe[channel] = function(_event){
                if(isFunction(old)){
                    old(_event);
                }
                fn(_event);
            }
        },
        emit : (channel,_event)=>{
            if(isFunction(subscribe[channel])){
                subscribe[channel](_event);
            }
        }
    }
})()

let _init_native = (_ele,eventManger)=>{
    let arrMerge = (a,b)=>{
        a.push.apply(a,b);
    }
    let support_list = ["resize","load","click","dblclick","change"]
    arrMerge(support_list,[
        "blur","focus","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup"
    ])
    arrMerge(support_list,[
        "select"
    ])

    support_list.forEach((val,index)=>{
        _ele.addEventListener(val,e => {
            myEvent.emit(val,e);
        })
    })
}
