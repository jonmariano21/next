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

function addRow(){

	var time = new Date();//Creates obj w/current date and time
	
	var name = document.getElementById("nameField");
	var labNum = document.getElementById("labNum");
	var terminalNum = document.getElementById("terminalNum");
	var table = document.getElementById("cse12Table");
	
	var rowCount = table.rows.length;//number of rows
	
	var row = table.insertRow(rowCount);//insert new row into index of rowCount

	row.insertCell(0).innerHTML= rowCount;
	row.insertCell(1).innerHTML = name.value;
	row.insertCell(2).innerHTML = labNum.value;
	row.insertCell(3).innerHTML = terminalNum.value;
	row.insertCell(4).innerHTML = time;
			
}




function load(){
	console.log("page load finished bitch!");
}



/*
function addRow() {
         
    var myName = document.getElementById("name");
    var age = document.getElementById("age");
    var table = document.getElementById("myTableData");

    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);

    row.insertCell(0).innerHTML= '<input type="button" value = "Delete" onClick="Javacsript:deleteRow(this)">';
    row.insertCell(1).innerHTML= myName.value;
    row.insertCell(2).innerHTML= age.value;

}
*/
