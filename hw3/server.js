var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static('.'));

var mysql = require('mysql');
var con = mysql.createConnection({
	host: '127.0.0.1',
	user: 'root',
	password: '123',
	database: 'lab5'
});
con.connect(function(err){
	if(err){
		console.log('Error connecting to database');
		console.log(err);
	}
	else{
		console.log('Successfully connected to database');
	}
});


app.get('/tables', function (req,res){
	var html_str = `
		<h2 style='margin-top: 0'>Display a Table from Database</h2>
		<p>This page will allow you to query the database to display one of three possible tables: Courses, Grades, or Students. Note: all information contained within the database and displayed on this page is fictitious.</p>
		<p>To display the desired table, select the name of the table from the drop-down, then click 'Display Table'</p>
		<select id='opts'>
			<option value='course'>Courses</option>
			<option value='grades'>Grades</option>
			<option value='student'>Students</option>
		</select>
		<input type='button' onclick='getTable()' value='Display Table'>
		<br>
		<p>The selected table will appear below:</p>
		<div id='out'></div>
		<br>`;
	console.log('Rendering table display page');
	res.end(html_str);
});

app.get('/gettable', function (req,res){
	var tbl_name = req.query.t;
	console.log('Processing request for ' + tbl_name);
	con.query('SELECT * FROM lab5.' + tbl_name, function(err,rows,fields){
		if(err){
			console.log('Error during query processing');
			console.log(err);
			res.end('Error during query processing');
		}
		else{
			var html_str = '<table border="1"><tr>';
			var headers = [];
			for(i=0; i<fields.length; i++){
				headers.push(fields[i].name);
				html_str += '<th>' + fields[i].name + '</th>';
			}
			html_str += '</tr>';
			for(i=0; i<rows.length; i++){
				html_str += '<tr>';
				for(j=0; j<headers.length; j++){
					html_str += '<td>' + rows[i][headers[j]] + '</td>';
				}
				html_str += '</tr>';
			}
			html_str += '</table>'
			console.log('Sending ' + tbl_name);
			res.end(html_str);
		}
	});
});


app.get('/transcripts', function (req,res){

	con.query('SELECT STUDENT_ID, NAME_FIRST, NAME_LAST FROM student ORDER BY NAME_LAST;', function(err,rows,fields){
		if(err){
			console.log('Error during student query processing');
			console.log(err);
			res.end('Error during student query processing');
		}
		else{
			var html_str = `
				<h2 style='margin-top: 0'>Display a Student Transcript from Database</h2>
				<p>This page will allow you to query the database to display a particular student's transcripts. If a new student was added to the database, their name will appear in the drop-down below. The &lt;select&gt; html elements are dynamically created. Note: all information contained within the database and displayed on this page is fictitious.</p>
				<p>To display the desired student's transcript, select the name of the student and a term/year, then click 'Display Transcript'</p>
				<select id="s_opts">`;

			for(i=0; i<rows.length; i++){
				html_str += '<option value="' + rows[i].STUDENT_ID + '">' + rows[i].NAME_LAST + ', ' + rows[i].NAME_FIRST + '</option>';
			}
			html_str += '</select>';
			con.query('SELECT DISTINCT(TERM) FROM grades;', function(err,rows,fields){
				if(err){
					console.log('Error during term query processing');
					console.log(err);
					res.end('Error during term query processing');
				}
				else{
					html_str += '<select id="t_opts"><option value="all">All</option>';
					for(i=0; i<rows.length; i++){
						html_str += '<option value="' + rows[i].TERM + '">' + rows[i].TERM + '</option>';
					}
					html_str += `</select>
						<input type='button' onclick='getTranscript()' value='Display Transcript'>
						<br>
						<p>The transcript will appear below:</p>
						<div id='out'></div>
						<br>`;
					console.log('Rendering transcript display page');
					res.end(html_str);
				}
			});
		}
	});
});


app.get('/gettrans', function (req,res){
	var st_id = req.query.s;
	var term = req.query.t;
	console.log('Processing transcript request for student ID=' + st_id);
	
	if(term == "all"){
		var q_str = 'SELECT student.STUDENT_ID AS "Student ID", NAME_FIRST AS "First Name", NAME_LAST AS "Last Name", TERM AS "Term/Year", course.COURSE_ID AS "Course ID", COURSE_DESC AS "Description", GRADE AS "Grade" FROM course, grades, student WHERE student.STUDENT_ID = grades.STUDENT_ID AND course.COURSE_ID = grades.COURSE_ID AND student.STUDENT_ID = ' + st_id + ';';
	}
	else{
		var q_str = 'SELECT student.STUDENT_ID AS "Student ID", NAME_FIRST AS "First Name", NAME_LAST AS "Last Name", TERM AS "Term/Year", course.COURSE_ID AS "Course ID", COURSE_DESC AS "Description", GRADE AS "Grade" FROM course, grades, student WHERE student.STUDENT_ID = grades.STUDENT_ID AND course.COURSE_ID = grades.COURSE_ID AND student.STUDENT_ID = ' + st_id + ' AND TERM = "' + term + '";';
	}
	
	con.query(q_str, function(err,rows,fields){
		if(err){
			console.log('Error during transcript query processing');
			console.log(err);
			res.end('Error during transcript query processing');
		}
		else{
			var html_str = '<table border="1"><tr>';
			var headers = [];
			for(i=0; i<fields.length; i++){
				headers.push(fields[i].name);
				html_str += '<th>' + fields[i].name + '</th>';
			}
			html_str += '</tr>';
			for(i=0; i<rows.length; i++){
				html_str += '<tr>';
				for(j=0; j<headers.length; j++){
					html_str += '<td>' + rows[i][headers[j]] + '</td>';
				}
				html_str += '</tr>';
			}
			html_str += '</table>'
			console.log('Sending transcript');
			res.end(html_str);
		}
	});
});

app.listen(8080,function(){
	console.log('Server Running');
});
