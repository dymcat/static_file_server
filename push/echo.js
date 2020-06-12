var HttpServer=com.dymcat.netty.HttpServer;
function run($){
	print($.data);
	HttpServer.sendString($.channel,Math.random().toString());
}