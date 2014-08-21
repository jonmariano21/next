
var TABLE_SIZE = 3;//limit number of students displayed in table

//FireBase reference
var myFB = new Firebase("https://brilliant-fire-8581.firebaseIO.com");
var studentListRef = myFB.child("students");

//mapping of firebase locations to HTML elements, so we can move / remove elements as necessary.
var students = {};

//FUNCTION: 
//	takes a new student snapshot and adds an appropriate row to table.
//===================================================================================================
function addNewStudent(studentSnapshot) {

	var newRow = $("<tr/>");
	
	newRow.append($("<td/>").text("fix this"));    
	newRow.append($("<td/>").text(studentSnapshot.val().NAME));
	newRow.append($("<td/>").text(studentSnapshot.val().LAB_NUMBER));
	newRow.append($("<td/>").text(studentSnapshot.val().TERMINAL_NUMBER));
	
	//append takes in a htmlstring so have to convert time as a number to a string using toString()
	newRow.append($("<td/>").text(studentSnapshot.val().TIME));
	
	newRow.append($("<td/>").innerHTML = '<button class="btn btn-danger" onclick="removeButton()">Remove</button>');
	
	//Store student reference to the table row.
	students[studentSnapshot.name()] = newRow;
	
	$("#cse12Table").append(newRow);
	
}//Close: addNewStudent(studentSnapshot)


// Create a view to only receive callbacks for the first students
var studentListView = studentListRef.startAt().limit(TABLE_SIZE);

//callback to handle when a new student is added.
studentListView.on('child_added', function (newstudentSnapshot) {
	addNewStudent(newstudentSnapshot);
});


//Press button to add student to list.
$("#fuckMe").click(function(){
 
	 //getDate() returns the day of the month from (1-31)
	 //getTime() returns the number of milliseconds since midnight Jan 1, 1970
	 var timeStamp = new Date().getTime();
	 //alert("time in ms: "+timeStamp);
	 
	 //CONVERT the timeStamp number to a string
	 var timeString = timeStamp.toString();
	 //alert("time converted to string: "+timeString);
	
	  var labNum = Number( $("#labNumInput").val() );//has to be a NUMBER
	  var name = $("#nameInput").val();
	  var terminalNum = Number( $("#terminalNumInput").val() );//has to be a NUMBER
	
	  if (name.length === 0){
	  	alert("Please enter your NAME.")
	    return;
	  }
	
	  var studentRef = studentListRef.child(name);
	
	  // Use setWithPriority to put the name / lab# / terminal# in Firebase, and set the priority to be the time.
	  studentRef.setWithPriority({ NAME:name, LAB_NUMBER:labNum, TERMINAL_NUMBER:terminalNum, TIME:timeString },  timeString);
  
});

//REMOVE
function removeButton(){
	document.getElementById("cse12Table").deleteRow();
}




// Helper function to handle a score object being removed; just removes the corresponding table row.
  function handleScoreRemoved(studentSnapshot) {
    var removedScoreRow = students[studentSnapshot.name()];
    removedScoreRow.remove();
    delete students[studentSnapshot.name()];
  }


  // Add a callback to handle when a score is removed
  studentListView.on('child_removed', function (oldstudentSnapshot) {
    handleScoreRemoved(oldstudentSnapshot);
  });

  // Add a callback to handle when a score changes or moves positions.
  var changedCallback = function (studentSnapshot) {
    handleScoreRemoved(studentSnapshot);
    addNewStudent(studentSnapshot);
  };
  
  studentListView.on('child_moved', changedCallback);
  studentListView.on('child_changed', changedCallback);




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




/*
var rowCount; 

// ADD Row in Table
================================================== 	//

function addRow(){
	
	var date = new Date();//Creates obj w/current date and time
	
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
	row.insertCell(4).innerHTML = date;
	row.insertCell(5).innerHTML = '<button class="btn btn-danger" onclick="deleteRow(this)">Remove</button>';







			
}		
*/




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
 



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////









/* Delete Row in Table
================================================== 	*/

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
