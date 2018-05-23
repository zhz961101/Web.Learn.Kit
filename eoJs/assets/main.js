'use strict';
log("log tools runing!!");

let sigla = function(name,template,data,wath,subSiglas,mixwith){
    this.id = Math.random() * 100000000000000000   
    this.name = name
    // tpl
    this.tpl = new Template(template,subSiglas);
    // data
    this.data = _init_DateValueProperty(data,wath,mixwith)
    // mixwith
    // [
    //  base - > sigle
    // ]
    // data = copyof base.data
    // _init_data(data)
    //
    // wath
    // {
    //  data1:(newVal)=>{console.log(newVal)}
    // }
    // data.data1:set:(newVal)=>{
    //      setting...
    //      wath.data1(newVal)
    // }
    //
    // data=>self.data{
    // get:()=>{}
    // set:()=>{}
    // }
    this.assemble = ()=>{
        return this.tpl.joint()
    }
}

let eo = function(id,name,template,data,wath,subSiglas,mixwith){
    let _$ = document.querySelector;
    let addHtmlFunction = function() {
        this.html = function(_newHtml) {
            if (this.empty) {
                return ''
            }
            let ele = typeof this.data[0] !== "undefined" ? this.data[0] : this.data;
            if (!_newHtml) {
                return ele.innerHTML;
            } else {
                ele.innerHTML = _newHtml;
                return _newHtml;
            }
        }
    }
    this.el = addHtmlFunction(_$(id));
    this.sigla = new sigla(name,template,data,wath,subSiglas,mixwith)
    this.render = ()=>{
        this.el.html(this.sigla.assemble())
    }
    this.rerender = ()=>{
        this.render()
    }
    // on,emit
    this.Event = (()=>{
        let subscribe = {}
        let isFunction = (obj)=>{
            return typeof obj === "function"
        }
        // channel : [function,]
        return {
            on : (channel,fn)=>{
                let old = subscribe[channel];
                subscribe[channel] = function(){
                    if(isFunction(old)){
                        old()
                    }
                    fn()
                }
            },
            emit : (channel)=>{
                if(isFunction(subscribe[channel])){
                    subscribe[channel]()
                }
            }
        }
    })()

    this.$on = this.Event.on;
    this.$emit = this.Event.emit;

    let _init_bind = (channel,fn)=>{
        let arrMerge = (a,b)=>{
            return a.push.apply(a,b);
        }
        let support_list = ["resize","load","click","change"]
        support_list = arrMerge(support_list,[
            "blur",
        ])
    }
}


// <a bind:herf="url"></a>
// <a herf="<% url %>"></a>
// <a on:click="alertLove"></a>
// <a data-event-id=random></a>
//
// upper.addlisenter("click",(e)=>{
//      e.target.getAttribute("data-event-id")==random?alertLove(e):undefined;
// })
//
// <input model="url"></input>
// <input bind:value="url" on:onchage="()=>{url=this.value}"></input>
//
