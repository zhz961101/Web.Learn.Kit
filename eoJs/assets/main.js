'use strict';
log("log tools runing!!");

let sigla = (name,template,data,wath,subSiglas)=>{
    this.name = name
    // tpl
    this.tpl = new Template2Code(template,subSiglas);
    // data
    this.data = {}

    // wath
    // {
    //  data1:(newVal)=>{console.log(newVal)}
    // }
    // set:(newVal)=>{
    //      setting...
    //      data1(newVal)
    // }
    _init_DateValueProperty(data,wath)

    // render
    // rerender
    // mixwith
}


// <a bind:herf="url"></a>
// <a herf="<% url %>"></a>
// <a on:click="alertLove"></a>
// <a data-event-id=random></a>
//
// upper.addlisenter("click",(e)=>{
//      e.target.getAttribute("data-event-id")==random?alertLove():undefined;
// })
//
// <input model="url"></input>
// <input bind:value="url" on:onchage="()=>{url=this.value}"></input>
//
