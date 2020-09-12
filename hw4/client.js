function displayCalc(){
	var URL = "http://localhost:8080/calculate";	
	$.ajax({
		type: "GET",
		url: URL,
		data:{},
		dataType: "html",
		success: function(msg){
			$("#content").html(msg);
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert("Error contacting server!");
		}
	});
}
function calculation(){
	var value = $("#seed").val();
	var way = $("#mySelect").val();
	params = {
		number: value
	};
	var URL = "http://localhost:8080/" + way
	$.ajax({
		type : "GET",
		url : URL,
		dataType : "html",
		data : params,
		success : function(msg){
		document.getElementById("current").innerHTML = msg;
		
	},
		error: function(jgXHR, textStatus,errorThrown){
		alert("Error: " + textStatus + " " + errorThrown);
		}
	
	});
}	

function displayWeather(){
	var URL = "http://localhost:8080/weather";	
	$.ajax({
		type: "GET",
		url: URL,
		data: "{}",
		dataType: "html",
		success: function(msg){
			$("#content").html(msg);
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert("Error contacting server!");
		}
	});
}

function getWeather(){
	var URL = "http://localhost:8080/getWeather";	
	
	$.ajax({
		type: "GET",
		url: URL,
		data: "{}",
		dataType: "html",
		success: function(msg){
			$("#current").html(msg);
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert("Error contacting server!");
		}
	});
}
function refresh(){
location.reload();
}