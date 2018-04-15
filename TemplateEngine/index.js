var template =
    'My skills:' +
    '<%if(this.showSkills) {%>' +
    '<%for(var index in skills) {%>' +
    '<a href="#"><%skills[index]%></a><span><% 9%4 %>_</span>' +
    '<% } %>' +
    '<%} else {%>' +
    '<p>none</p>' +
    '<% } %>';
var tE1 = new TemplateEngine(template);
var templ = tE1.joint({
    skills: ["js", "html", "css"],
    showSkills: true
});

var temp2 = `
	<br/>
	<% var func = function(text){return "<i>text:</i><span style='color:"+data.color+"'>"+text+"</span>"}; %>
	<% (function(text){return "<span>text:"+text+"</span>"})("this is a func runing!!!") %>
	<br/>
	<% func("var func runing!") %>
`

$('#app').html(templ);
var temp2obj = new TemplateEngine(temp2);
$('#app2').html(temp2obj.joint({
		data:{
			color:"#666",

		}
	}
));
$('#app2').html($('#app2').html()+temp2obj.joint({
		data:{
			color:"rgba(255,0,0,0.7)",

		}
	}
));

// with(obj) {
//     var r = [];
//     r.push("My skills:");
//     if (this.showSkills) {
//         for (var index in skills) {
//             r.push("<a href=\"#\">");
//             r.push(skills[index]);
//             r.push("</a><span>");
//             0 / 1 r.push("_</span>");
//             r.push(
//             });
//     } else {
//         r.push("<p>none</p>");
//         r.push(
//         });
//     return r.join("");
// }
