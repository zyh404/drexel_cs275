var express = require('express');
var http = require('http');
var app = express();
var calc = require('./calculator');
var c = new calc();
var WeatherController = require('./weather');
var wc = new WeatherController();
app.use(express.static("."));

app.get('/calculate', function (req,res){
	var html = c.render();
	console.log("Rendering calculation page");
	res.end(html);
})

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

app.get('/weather', function (req,res){
	var html = wc.render();
	console.log("Rendering weather page");
	res.end(html);
})
app.get('/getWeather', function (req,res){
	wc.once('zipEvent', function(zip){
		wc.once('forecastEvent', function(msg){
			res.end(msg);
		});
		wc.getWeather(zip);
	});
	wc.getZip();
})


app.listen(8080);