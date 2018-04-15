print("this console","error");


var codeText=`
	var x="";</br>
	for (var i=0;i<5;i++){</br>
		x=x + "该数字为 " + i + "<br>";</br>
	}</br>
`
print(codeText,"codeText")
print(codeText.replace(/(for.*?)(var)(.*?{)/g,"$1let$3"),"for in var => let");
