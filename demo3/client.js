function displayTablesPage(){
	var URL = 'http://localhost:8080/tables';	
	$.ajax({
		type: 'GET',
		url: URL,
		data: '{}',
		dataType: 'html',
		success: function(msg){
			$('#content').html(msg);
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert('Error contacting server!');
		}
	});
}

function getTable(){
	var dropdown = $('#opts').get(0);
	var opt = dropdown.options[dropdown.selectedIndex].value;
	var URL = 'http://localhost:8080/gettable';
	$.ajax({
		type: 'GET',
		url: URL,
		data: {'t':opt},
		dataType: 'html',
		success: function(msg){
			$('#out').html(msg);
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert('Error contacting server!');
		}
	});
}


function displayTransPage(){
	
	var URL = 'http://localhost:8080/transcripts';
	$.ajax({
		type: 'GET',
		url: URL,
		data: '{}',
		dataType: 'html',
		success: function(msg){
			$('#content').html(msg);
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert('Error contacting server!');
		}
	});
}


function getTranscript(){
	var stud_dropdown = $('#s_opts').get(0);
	var term_dropdown = $('#t_opts').get(0);
	var s_opt = stud_dropdown.options[stud_dropdown.selectedIndex].value; 
	var t_opt = term_dropdown.options[term_dropdown.selectedIndex].value;
	var URL = 'http://localhost:8080/gettrans';
	
	$.ajax({
		type: 'GET',
		url: URL,
		data: {'s':s_opt, 't':t_opt},
		dataType: 'html',
		success: function(msg){
			$('#out').html(msg);
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert('Error contacting server!');
		}
	});
}

function displayStudentPage(){
	var URL = 'http://localhost:8080/student';
	
	$.ajax({
		type: 'GET',
		url: URL,
		data: '{}',
		dataType: 'html',
		success: function(msg){
			$('#content').html(msg);
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert('Error contacting server!');
		}
	});
}
function refresh(){
location.reload();
}