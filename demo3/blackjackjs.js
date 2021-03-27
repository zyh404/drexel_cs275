var express = require('express');
var mysql = require('mysql');
var http = require('http');
var path = require('path');
var bodyParser = require("body-parser");

var app = express();

var con = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '1234',
	database: 'test'
});

app.use(express.static("./static"));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/players', function (req, res){	
	con.connect(function(err) {
	  if (err){ throw err};
	  con.query("SELECT * FROM players", function (err, result, fields) {
        if (err) {throw err};
		res.send(result);
	  });
	});
});

app.get('/login', function (req, res){	
	con.connect(function(err) {
	  if (err){ throw err};
	  con.query("SELECT * FROM players WHERE username = "+req.query.username, function (err, result, fields) {
        if (err) {throw err};
		res.send(result);
	  });
	});
});

app.get('/logout', function (req, res){	
	con.connect(function(err) {
	  if (err){ throw err};
	  con.query("update players set balance = "+req.query.balance+", win = "+req.query.win+", loss = "+req.query.loss+" WHERE username = "+req.query.username, function (err, result, fields) {
        if (err) {throw err};
		res.send(result);
	  });
	});
});

app.listen(8080, function (){
	console.log("server started on port 8080");
});
