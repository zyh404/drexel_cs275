var fs = require('fs');
var http = require('http');
var EventEmitter = require('events').EventEmitter;
var utils = require('util');
var key = fs.readFileSync('key.txt','utf8');
function Weather(){
	EventEmitter.call(this);
}

utils.inherits(Weather,EventEmitter);

Weather.prototype.render = function(){
		var html=`
		<button class="ui-btn" onclick="getWeather()">Get the weather!</button>
        	<div id ="current"></div>`;
		return html;
}

Weather.prototype.getZip = function(){
	var options = {
		host: 'api.wunderground.com',
		path: '/api/' + key + '/geolookup/q/autoip.json'
	};
	var self = this;
	console.log("Requesting geolocated zipcode from " + options.host);
	//send http request to wunderground
	http.request(options, function(response){
		var str = '';
		var html = '';
		response.on('data', function(chunk){
			str += chunk;
		});
		response.on('end', function(){
			var zip = JSON.parse(str).location.zip;
			console.log("Got zipcode");
			self.emit('zipEvent',zip);
		});
	}).end();
}

Weather.prototype.getWeather = function(zip){
	var options = {
		host: 'api.wunderground.com',
		path: '/api/' + key + '/hourly/q/' + zip + '.json'
	};
	var self = this;
	console.log("Requesting hourly forecast from " + options.host);
	http.request(options, function(response){
		var str = '';
		var html = '<h2>Hourly Forecast for ZIP code ' + zip + ':</h2>';
		response.on('data', function(chunk){
			str += chunk;
		});
		response.on('end', function(){
			var data = JSON.parse(str).hourly_forecast;
			for(i=0; i<data.length; i++){
				html += '<b>' + data[i].FCTTIME.pretty + ':</b><br/>' + '<img src="' + data[i].icon_url + '">'
					+ data[i].condition + '<br/>Temperature: ' + data[i].temp.english + '<br/>Humidity: '
					+ data[i].humidity + '<br/><br/>';
			}
			console.log('Got hourly forecast');
			self.emit('forecastEvent',html);
		});
	}).end();
}

module.exports = Weather;


