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

/* ADD Row in Table
================================================== 	*/

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





////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
 
 var LEADERBOARD_SIZE = 3;

  // Build some firebase references.
  var rootRef = new Firebase("https://brilliant-fire-8581.firebaseIO.com");
  var studentListRef = rootRef.child("students");
  //var highestScoreRef = rootRef.child("highestScore");

  // Keep a mapping of firebase locations to HTML elements, so we can move / remove elements as necessary.
  var htmlForPath = {};

  // Helper function that takes a new score snapshot and adds an appropriate row to our leaderboard table.
  function handleScoreAdded(scoreSnapshot) {
    var newScoreRow = $("<tr/>");
    
    newScoreRow.append($("<td/>").text("fix this"));    
    newScoreRow.append($("<td/>").append($("<em/>").text(scoreSnapshot.val().name)));
    newScoreRow.append($("<td/>").text(scoreSnapshot.val().lab_number));
    newScoreRow.append($("<td/>").text(scoreSnapshot.val().terminal_number));
    
    // Store a reference to the table row so we can get it again later.
    htmlForPath[scoreSnapshot.name()] = newScoreRow;
    
    $("#cse12Table").append(newScoreRow);

    // Insert the new score in the appropriate place in the table.
    /*
    if (prevScoreName === null) {
      $("#leaderboardTable").append(newScoreRow);
    }
    else {
      var lowerScoreRow = htmlForPath[prevScoreName];
      lowerScoreRow.before(newScoreRow);
    }
    */
  }

  // Helper function to handle a score object being removed; just removes the corresponding table row.
/*  function handleScoreRemoved(scoreSnapshot) {
    var removedScoreRow = htmlForPath[scoreSnapshot.name()];
    removedScoreRow.remove();
    delete htmlForPath[scoreSnapshot.name()];
  }
*/
  // Create a view to only receive callbacks for the last LEADERBOARD_SIZE scores
  var scoreListView = studentListRef.limit(LEADERBOARD_SIZE);

  // Add a callback to handle when a new score is added.
  scoreListView.on('child_added', function (newScoreSnapshot) {
    handleScoreAdded(newScoreSnapshot);
  });

  // Add a callback to handle when a score is removed
  /*scoreListView.on('child_removed', function (oldScoreSnapshot) {
    handleScoreRemoved(oldScoreSnapshot);
  });

  // Add a callback to handle when a score changes or moves positions.
  var changedCallback = function (scoreSnapshot) {
    handleScoreRemoved(scoreSnapshot);
    handleScoreAdded(scoreSnapshot);
  };
  
  scoreListView.on('child_moved', changedCallback);
  scoreListView.on('child_changed', changedCallback);
*/
  // When the user presses enter on scoreInput, add the score, and update the highest score.
  $("#terminalNumInput").keypress(function (e) {
    if (e.keyCode == 13) {
      var date = new Date();
      
      var newScore = Number($("#labNumInput").val());
      var name = $("#nameInput").val();
      var terminal = $("#terminalNumInput").val();

      
      //$("#terminalNumInput").val("");

      if (name.length === 0)
        return;

      var userScoreRef = studentListRef.child(name);

      // Use setWithPriority to put the name / score in Firebase, and set the priority to be the score.
      userScoreRef.setWithPriority({ name:name, lab_number:newScore, terminal_number:terminal }, name);

      // Track the highest score using a transaction.  A transaction guarantees that the code inside the block is
      // executed on the latest data from the server, so transactions should be used if you have multiple
      // clients writing to the same data and you want to avoid conflicting changes.
    /*  highestScoreRef.transaction(function (currentHighestScore) {
        if (currentHighestScore === null || newScore > currentHighestScore) {
          // The return value of this function gets saved to the server as the new highest score.
          return newScore;
        }
        // if we return with no arguments, it cancels the transaction.
        return;
      });*/
    }
  });
 

  // Add a callback to the highest score in Firebase so we can update the GUI any time it changes.
/*  highestScoreRef.on('value', function (newHighestScore) {
    $("#highestScoreDiv").text(newHighestScore.val());
  });*/

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
