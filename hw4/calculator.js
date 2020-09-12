function Calc(){}
Calc.prototype.render = function(){
	var html=`
				<input type=text id="seed"/>
				</br>
				</br>
				<select id="mySelect">
				<option value="fact">n-Factorial</option>
				<option value="sum">Summation Series</option>
				</select>
				<br>
				<br>
				<button onclick="calculation()">Calculate</button>
				<div id= "current"></div>`;
	return html;
				}
				
Calc.prototype.fact = function(seed){
		if (seed>0){
		var msg = 1;
		for(var i = 1; i<=seed; i++){
			msg = msg * i;
			}
			return msg;
		}
		else {
		return "Please enter a positive";
		}
}
Calc.prototype.sum = function(seed){
		var msg=0;
	if(seed>0){
	for ( var i=1; i<=seed; i++) {
			msg = msg+i;
			}
	return msg;
	}
	else {
	return "Please enter a positive";
	}
}

module.exports= Calc;