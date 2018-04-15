var count = 0;
var templ=function(){return `
    <div class="item" data-gheight='${Math.floor((Math.random()*40)%20+10)}'>${count++}</div>
`}
var text = "";
for (var i = 0; i < 200; i++) {
    text+=templ();
}

$(".grid").html(text);
