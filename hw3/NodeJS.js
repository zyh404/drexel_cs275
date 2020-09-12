var http = require('http');
var express = require('express');
var app = express();
app.use(express.static("."));
app.get('/fact', function (req, res){
	var msg=1;
	if(req.query.number>0){
	for( var i=1; i<=req.query.number;i++)
			{ 
				msg= msg *i
			}
			res.writeHead(200);
			var r = "That will be "+msg;
			res.end(r);
		}
	else
		{res.end("Please enter a positive number")};
});
app.get('/sum' , function (req, res){
	var msg=0;
	if(req.query.number>0){
	for ( var i=1; i<=req.query.number; i++) {
			msg = msg+i;
			}
	
	res.writeHead(200);
			var r = "That will be "+msg;
			res.end(r);
		}
	else
		{res.end("Please enter a positive number")};
});
//var server = http.createServer(function(req, res) {
//res.writeHead(200, {content-type: ‘text/plain’});
//res.end('Hello Http\n');
//});
app.listen(8080);
