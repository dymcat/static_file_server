var config=Tool.mapify(Tool.readString("HttpServer.json"));
var HttpServer=Java.extend(com.dymcat.netty.HttpServer);
var server=new HttpServer(){
	http:function(){return config.http==undefined?Java.super(server).http():config.http;}
	,https:function(){return config.https==undefined?Java.super(server).https():config.https;}
	,proxy:function(){return config.proxy==undefined?Java.super(server).proxy():config.proxy;}
	,debug:function(){return config.debug==undefined?Java.super(server).debug():config.debug;}
	,print:function(){return config.print==undefined?Java.super(server).print():config.print;}
	,i18n:function(){return config.i18n==undefined?Java.super(server).i18n():config.i18n;}
	,mime:function(){return config.mime==undefined?Java.super(server).mime():config.mime;}
	,type:function(){return config.type==undefined?Java.super(server).type():config.type;}
	,charset:function(){return config.charset==undefined?Java.super(server).charset():config.charset;}
	,mobile:function(){return config.mobile==undefined?Java.super(server).mobile():config.mobile;}
	,babel:function(){return config.babel==undefined?Java.super(server).babel():config.babel;}
	,eval:function(){return config.eval==undefined?Java.super(server).eval():config.eval;}
	,into:function(){return config.into==undefined?Java.super(server).into():config.into;}
	,maxage:function(){return config.maxage==undefined?Java.super(server).maxage():config.maxage;}
	,timeout:function(){return config.timeout==undefined?Java.super(server).timeout():config.timeout;}
	,user:function(){return config.user==undefined?Java.super(server).user():config.user;}
	,index:function(){return config.index==undefined?Java.super(server).index():config.index;}
	,favicon:function(){return config.favicon==undefined?Java.super(server).favicon():config.favicon;}
	,err:function(){return config.err==undefined?Java.super(server).err():config.err;}
	,parse:function(){return config.parse==undefined?Java.super(server).parse():config.parse;}
	,mvc:function(){return config.mvc==undefined?Java.super(server).mvc():config.mvc;}
	,web:function(){return config.web==undefined?Java.super(server).web():config.web;}
	,at:function(){return config.at==undefined?Java.super(server).at():config.at;}
	,air:function(){return config.air==undefined?Java.super(server).air():config.air;}
	,file:function(){return config.file==undefined?Java.super(server).file():config.file;}
	,folder:function(){return config.folder==undefined?Java.super(server).folder():config.folder;}
	,backup:function(){return config.backup==undefined?Java.super(server).backup():config.backup;}
	,filter:function(){return config.filter==undefined?Java.super(server).filter():config.filter;}
	,source:function(){return config.source==undefined?Java.super(server).source():config.source;}
	,upload:function(){return config.upload==undefined?Java.super(server).upload():config.upload;}
	,level:function(){return config.level==undefined?Java.super(server).level():config.level;}
	,setup:function(){return config.setup==undefined?Java.super(server).setup():config.setup;}
	,context:function(){return config.context==undefined?Java.super(server).context():config.context;}
	,init:function(ssl,host,port){Java.super(server).init(ssl,host,port);}
	,done:function(ssl,host,port){
		Java.super(server).done(ssl,host,port);
		var file=new java.io.File("java/jar");
		if(file.isDirectory()){Tool.joinJavaFiles(file);}
		file=new java.io.File("java/class");
		if(file.isDirectory()){Tool.joinJavaFiles(file);}
		if(config.browser){new java.lang.Thread(function(){Tool.commandLine((java.lang.System.getProperty("os.name").startsWith("Windows ")?"start ":"xdg-open ")+server.getGlobal("url"),"GBK");}).start();}
	}
	,maxstep:function(context,request,parameter,end){return config.maxstep==undefined?Java.super(server).maxstep(context,request,parameter,end):config.maxstep;}
	,downname:function(context,request,parameter,file){return config.downname==undefined?Java.super(server).downname(context,request,parameter,file):config.downname;}
	,cacheset:function(context,request,parameter,file){return config.cacheset==undefined?Java.super(server).cacheset(context,request,parameter,file):config.cacheset;}
	,chunkset:function(context,request,parameter,file){return config.chunkset==undefined?Java.super(server).chunkset(context,request,parameter,file):config.chunkset;}
	,brush:function(context,request,parameter,fileUpload,configField){return Java.super(server).brush(context,request,parameter,fileUpload,configField);}
	,subprotocols:function(context,request){return config.subprotocols==undefined?Java.super(server).subprotocols(context,request):config.subprotocols;}
	,allowExtensions:function(context,request){return config.allowExtensions==undefined?Java.super(server).allowExtensions(context,request):config.allowExtensions;}
	,maxFramePayloadLength:function(context,request){return config.maxFramePayloadLength==undefined?Java.super(server).maxFramePayloadLength(context,request):config.maxFramePayloadLength;}
	,allowMaskMismatch:function(context,request){return config.allowMaskMismatch==undefined?Java.super(server).allowMaskMismatch(context,request):config.allowMaskMismatch;}
	,active:function(context,request,parameter){Java.super(server).active(context,request,parameter);}
	,inactive:function(context,request,parameter){Java.super(server).inactive(context,request,parameter);}
	,onOpen:function(context,request,parameter){Java.super(server).onOpen(context,request,parameter);}
	,onBefore:function(context,frame){Java.super(server).onBefore(context,frame);}
	,onClose:function(context,frame){return Java.super(server).onClose(context,frame);}
	,onPing:function(context,frame){return Java.super(server).onPing(context,frame);}
	,onBytes:function(context,frame){context.writeAndFlush(frame.retain());}
	,onString:function(context,frame){
		if(config.push&&config.push.status){
			var data=Tool.mapify(frame.text());
			if(data!=null){
				var func=data.remove("<-<()()>->");
				if(!func){func=config.push.func||"";}
				var index=func.indexOf(">");
				var path=(config.push.root||"push")+"/";
				if(index==-1){
					path+=config.push.file||"echo";
				}else{
					path+=func.substring(0,index);
					func=func.substring(index+1);
				}
				Tool.runScript(config.into,new java.io.File(path+".js"),func||"run",{
					config:config
					,channel:context
					,data:data
				});
			}
		}else{
			context.writeAndFlush(frame.retain());
		}
	}
	,onAfter:function(context,frame){Java.super(server).onAfter(context,frame);}
	,censor:function(context,request,parameter){return Java.super(server).censor(context,request,parameter);}
	,logging:function(context,channel){Java.super(server).logging(context,channel);}
	,error:function(context,request,parameter,cause){}
	,scan:function(context,request){return true;}
	,snap:function(response,content){}
};
server.setGlobal("config",config);
server.setGlobal("end",$_FILE_PATH_$.contains(".")?$_FILE_PATH_$.substring($_FILE_PATH_$.lastIndexOf(".")):".js");
new java.lang.Thread(function(){server.start();}).start();