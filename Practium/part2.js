var express = require('express');
var app = express();
app.use(express.static("."));
app.get('/part2', function(req,res){
	var i;
	i = req.query.count;
	var p = parseInt(i);
	var a = req.query.message;
	var b =" ";
	 if(p>0){
        res.writeHead(200, {'Content-Type': 'text/plain'});
        for(var i=0;i<p;i++){
            b+=a;
        }
    }else{
        b="error";
    }
    res.end(b);
});
app.listen(8080);
