/*
var queue=[];

var addMe_button = $("#addMe");

addMe_button.click(function(){

	var date = new Date();//Creates obj w/current date and time
	
	var getval = ($("#nameField").val());
	var getval2 = ($("#labNum").val());
	
	
	var tst = $("#test");
	var tst2 = $("#test2");
	
	tst.text(getval);
	tst2.text(getval2);
	
	queue.push(getval);
	queue.push(getval2);

	alert(queue);
	alert(date);
	
});

*/

var rowCount; 


function addRow(){

	var time = new Date();//Creates obj w/current date and time
	
	var name = document.getElementById("nameField");
	var labNum = document.getElementById("labNum");
	var terminalNum = document.getElementById("terminalNum");
	var table = document.getElementById("cse12Table");
	
	rowCount = table.rows.length;//number of rows
	
	var row = table.insertRow(rowCount);//insert new row into index of rowCount


	row.insertCell(0).innerHTML = rowCount;
	row.insertCell(1).innerHTML = name.value;
	row.insertCell(2).innerHTML = labNum.value;
	row.insertCell(3).innerHTML = terminalNum.value;
	row.insertCell(4).innerHTML = time;
	row.insertCell(5).innerHTML = '<button class="btn btn-danger" onclick="Javascript:deleteRow(this)">Remove</button>';
			
}		

function deleteRow(object){

alert("rowCount = "+rowCount);

	var i = object.parentNode.parentNode.rowIndex;

	document.getElementById("cse12Table").deleteRow(i);
	
	rowCount = rowCount - 1;
alert("rowCount = "+rowCount);
	


}




function load(){
	console.log("page load finished bitch!");
}




