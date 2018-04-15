'use strict';
class pinterestLayout{
    var defaultConfig={
        rowgap:10,
        resize:true,
        width:200,
        floatLeft:true
    };
    var $eleDiv;
    constructor(DivEle,config){
        // set css style like posint width
        this.rowHeight = [];//
        this.rowgap = config.rowgap || defaultConfig.rowgap;
        this.resizeOn = config.resize || defaultConfig.resize;
        this.colWidth = config.width || defaultConfig.width;
        this.floatLeft = config.floatLeft || defaultConfig.floatLeft;
        this.oldResizeEvent = window.resize;
        init_childEle();
        SetResizeEvent();
    }
    config(config){
        this.rowgap = config.rowgap || this.rowgap;
        this.resizeOn = config.resize || this.resizeOn;
        this.colWidth = config.width || this.colWidth;
        this.floatLeft = config.floatLeft || this.floatLeft;
        SetResizeEvent();
    }
    ReszieLayout(){
        init_childEle();
    }
    SetResizeEvent(){
        if(this.resizeOn){
            window.resize = ReszieLayout;
        }else{
            window.resize = this.oldResizeEvent;
        }
    }
    init_childEle(){
        for (let variable in childEleList) {
            if (object.hasOwnProperty(variable)) {
                AppendEle(childEleList[variable]);
            }
        }
    }
    AppendEle(Ele){
        var minPointCol = MinLocation();//cols num
        SetLocation(Ele,minPointCol);
        this.rowHeight[minPointCol]+=1;
    }
    AppendEle(Elelist){
        for (let i = 0; i < Elelist.length; i++) {
            AppendEle(Elelist[i]);
        }
    }
    SetLocation(Ele,Cols){
        //set css style
    }
    MinLocation(){
        var res = 0;
        if(this.floatLeft){
            for (let i = this.rowHeight.length; i > 0; i--) {
                if(this.rowHeight[i]>=this.rowHeight[i-1]){
                    res = i-1;
                }
            }
        }else{
            for (let i = 0; i < this.rowHeight.length; i--) {
                if(this.rowHeight[i]>=this.rowHeight[i+1]){
                    res = i-1;
                }
            }
        }
        return res;
    }
}
