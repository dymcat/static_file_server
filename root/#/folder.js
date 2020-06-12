$.redirect=null;
$.cookie=null;

var type=$.pars["Content-Type"];
if(type=="text/json"||type=="application/json"){
	$.type=type;
	$.content={root:$.uriview,list:function(){
		var trs=[];
		var list=$.folder.listFiles();
		for(var i=0,last=0;i<list.length;i++){
			var tr={
				name:list[i].getName()
				,type:for_type(list[i])
				,size:for_size(list[i])
				,time:for_time(list[i])
			};
			if(list[i].isFile()){
				trs.push(tr);
			}else if(list[i].isDirectory()&&list[i].getName()!="#"){
				trs.splice(last++,0,tr);
			}
		}
		return trs;
	}()};
}else{
	var trs="?";
	var list=$.folder.listFiles();
	var note=template.note();
	for(var i=0;i<list.length;i++){
		var tr=note[1]
		.replace("{target}",list[i].isFile()?" target='_blank'":"")
		.replace("{root}",$.uriview?"/"+$.uriview:"")
		.replace("{name}",list[i].getName())
		.replace("{name}",list[i].getName())
		.replace("{type}",for_type(list[i]))
		.replace("{size}",for_size(list[i]))
		.replace("{time}",for_time(list[i]));
		if(list[i].isFile()){
			trs+=tr;
		}else if(list[i].isDirectory()&&list[i].getName()!="#"){
			trs=trs.replace("?",tr+"?");
		}
	}
	$.content=note[0]
	.replace("{title}",function(){
		var at=$.server.at();
		var html=at==""||at=="/"||at=="\\"?"<a href='/'>#</a>":"";
		if(!$.uriview){return html;}
		var last="";
		var root=$.uriview.split("/");
		for(var i=0;i<root.length;i++){
			if(html!=""){html+="<span style='margin:0 5px;'>/</span>";}
			html+="<a href='"+(last+="/"+root[i])+"'>"+root[i]+"</a>";
		}
		return html;
	}())
	.replace("{file-info-trs}",trs.replace("?",""));
}

function for_type(file){
	return file.isFile()?$.server.mime(file.getName())||"":"文件夹";
}

function for_size(file){
	if(!file.isFile()){return "";}
	var length=file.length();
	if(length<1024){return length+" B";}
	if(length<1024*1024){return (length/1024).toFixed(3)+" KB";}
	if(length<1024*1024*1024){return (length/1024/1024).toFixed(3)+" MB";}
	if(length<1024*1024*1024*1024){return (length/1024/1024/1024).toFixed(3)+" GB";}
	return (length/1024/1024/1024/1024).toFixed(3)+" TB";
}

function for_time(file){
	return Tool.strify(new java.util.Date(file.lastModified()));
}

function template(){
/*
<html>
<head>
<style>
	body{font-family:等线,宋体,Arial,Tahoma,Verdana;}
	table{width:100%;border-collapse:collapse;text-align:center;}
	th,td{padding:5px;border:solid 1px LightBlue;}
	th{background-color:Azure;}
	a{text-decoration:none;color:blue;}
	a:visited{color:green;}
	a:hover{color:red;}
</style>
</head>
</body>
<table>
	<caption><h3>{title}</h3></caption>
	<tr>
		<th>名称</th>
		<th>类型</th>
		<th>大小</th>
		<th>时间</th>
	</tr>
	{file-info-trs}
</table>
</body>
</html>
*/
/*
<tr>
	<td><a{target} href="{root}/{name}">{name}</a></td>
	<td>{type}</td>
	<td>{size}</td>
	<td>{time}</td>
</tr>
*/
}