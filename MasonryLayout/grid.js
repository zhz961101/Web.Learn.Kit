'use strict';

var itemwidth = 150;
var colMingap = 10;
var rowgap = 1;//=>rowHeight*rowgap + "px"
var rowgapOn = true;
var rowHeight = 30;//==rowMingap,dont <= 15
var lastcols = 0;

var initDiv = function(Griddiv,config){
    $(Griddiv).data("itemwidth",itemwidth);
    $(Griddiv).data("colMingap",colMingap);
    $(Griddiv).data("rowHeight",rowHeight);
    $(Griddiv).data("lastcols",0);
    $(Griddiv).data("colsCurVal",[]);
}

var setDivCss = function(Griddiv){
    $(Griddiv).css("grid-gap",$(Griddiv).data("itemwidth")+"px");
    $(Griddiv).css("display","grid");
    $(Griddiv).css("grid-auto-rows","minmax(50px, auto)");
}

var preGrid = function(){
    $('.grid .item').each(function(i,val){
        if($(val).data("gheight")!==undefined){
            return;
        }
        var w = $(val).height();
        var ght = w/rowHeight;
        var gap = (Math.ceil(ght)-ght)<=0.4?true:false;
        $(val).data("gheight", Math.ceil(ght));
        $(val).data("gapOn", gap);
        // console.log($(val).data("gheight"));
    })
}

var girdAll = function(){
    let parentw = $('.grid').width();
    let cols = Math.floor(parentw/(itemwidth+colMingap));
    cols = cols===0?1:cols;
    if(cols === lastcols){
        return;
    }
    // n=>cols;m=>parentw;g=>colMingap;w=>itemwidth;
    // n=(m-g*n)/w
    // nw=m-g*n
    // w=m/n-g
    // w+g=m/n
    // n=m/(w+g)
    // $('.grid').css("grid-gap",itemgap+"px");
    $('.grid').css("display","grid");
    $('.grid').css("grid-auto-rows",rowHeight+"px");
    $(".grid").css("grid-template-columns","repeat("+cols*2+", 1fr)")
    $(".grid").css("grid-column-gap",colMingap+"px")
    let rowcur = [];
    for(let i =0;i<cols;i++){
        rowcur[i]=1;
    }
    let curcols = 0;
    $('.grid>.item').each(function(index,val){
        var h = $(val).data('gheight');
        let nowcol=cols-1;
        for(let j =cols-1;j>0;j--){
            if(rowcur[nowcol]>=rowcur[j-1]){
                nowcol=j-1;
            }
        }
        $(val).css("grid-column-start",(((1+nowcol)*2-1)+""));
        // 1->1 2->3 3->5
        $(val).css("grid-column-end",(((1+nowcol)*2+1)+""));
        // 1->2 2->4 3->6
        $(val).css("grid-row-start",rowcur[nowcol]+"");
        $(val).css("grid-row-end",(rowcur[nowcol]+h)+"");
        rowcur[nowcol]+=h+((rowgapOn&&$(val).data("gapOn"))?rowgap:0);
    });
}

window.onresize=girdAll;
window.onload=function(){
    preGrid();
    girdAll();
};
