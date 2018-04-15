var consoDiv = $("#consolediv");
consoDiv.data("lineNum",0);

var print = function(msg,tagmsg,classname){
    classname = classname || "";
    var lineNum = consoDiv.data("lineNum");
    var htmlText = "<div class='consolebody "+classname+"'><span class='tag'>"+tagmsg+"</span><span class='title'>Console Line <span class='lineNum'>"+consoDiv.data("lineNum")+"</span>:</span><br/><span class='content'>"+msg+"</span></div>"
    consoDiv.data("lineNum",lineNum+1);
    consoDiv.html(consoDiv.html()+htmlText);
}
