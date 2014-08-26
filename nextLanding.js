
var TABLE_SIZE = 3;//limit number of students displayed in table

//FIREBASE Reference: 
//===================================================================================================
	var myFB = new Firebase("https://brilliant-fire-8581.firebaseIO.com");
	var studentListFB = myFB.child("STuDenTs");//STuDenTs directory in FB


var studentRef = '';

//mapping of firebase locations to HTML elements, so we can move / remove elements as necessary.
var students = {};


/*
var table = document.getElementById("cse12Table");
var rowCount = table.rows.length;//number of rows
*/

/*
var rowCounter;

//Count all children
myFB.on("value", function(snapshot){
	rowCounter = 0;
	snapshot.forEach(function(){
		rowCounter += 1;
	});
});
*/



//FUNCTION: 
//	takes a new student snapshot and adds an appropriate row to table.
//===================================================================================================

//Press button to add student to list.
$("#addMe").click(function(){
 	alert("addMe button clicked");
	//getDate() returns the day of the month from (1-31)
	//getTime() returns the number of milliseconds since midnight Jan 1, 1970
	var timeStamp = new Date().getTime();
	
	//CONVERT the timeStamp number to a string
	var timeString = timeStamp.toString();
	
	var labNum = Number( $("#labNum").val() );//has to be a NUMBER
	var name = $("#nameField").val();
	var terminalNum = Number( $("#terminalNum").val() );//has to be a NUMBER
	
	if (name.length === 0){
		alert("Please enter your NAME.")
		return;
	}
	
	studentRef = studentListFB.child(name);
	alert("studentRef = "+studentRef);

	alert("studentRef.toString() = "+studentRef.toString());
	
	
	// Use setWithPriority to put the name / lab# / terminal# in Firebase, and set the priority to be the time.
	studentRef.setWithPriority({ NAME:name, LAB_NUMBER:labNum, TERMINAL_NUMBER:terminalNum, TIME:timeString },  timeString);
  
  
});

function addNewStudent(studentSnapshot, prevstudentSnapshot) {
	alert("Inside addNewStudent(studentSnapshot):: studentSnapshot.name() = "+studentSnapshot.name());
	var newRow = $("<tr/>");	
	
	newRow.append($("<td/>").text("fix"));    
	newRow.append($("<td/>").text(studentSnapshot.val().NAME));
	newRow.append($("<td/>").text(studentSnapshot.val().LAB_NUMBER));
	newRow.append($("<td/>").text(studentSnapshot.val().TERMINAL_NUMBER));
	
	//append takes in a htmlstring so have to convert time as a number to a string using toString()
	newRow.append($("<td/>").text(studentSnapshot.val().TIME));
	
	newRow.append($("<td/>").innerHTML = '<button id="removeButton" onclick="removeStudent()"> x </button>');

	
/*
	var one = "<td>fix</td>";    
	var two = "<td>"+studentSnapshot.val().NAME+"</td>";
	var three = "<td>" + studentSnapshot.val().LAB_NUMBER + "</td>";
	var four = "<td>" + studentSnapshot.val().TERMINAL_NUMBER + "</td>";
	
	//append takes in a htmlstring so have to convert time as a number to a string using toString()
	var five = "<td>" + studentSnapshot.val().TIME + "</td>";
	
	var six = "<td class='removeButton'> x </td>";
	
*/	

	studentRef = studentSnapshot.name();
	alert("studentRef = "+studentRef);
		
	//Store student reference to the table row.
	alert("studentSnapshot.name() = "+studentSnapshot.name());
	students[studentSnapshot.name()] = newRow;
	
	$("#cse12Table").append(newRow);		
	//$("#cse12Table").append("<tr id=id"+ snapshot.name() + ">" + one+two+three+four+five+six+ "</tr>");
	
}//Close: addNewStudent(studentSnapshot)


// Create a view to only receive callbacks for the first students
var studentListView = studentListFB.startAt().limit(TABLE_SIZE);

//callback to handle when a new student is added.
studentListView.on('child_added', function (newstudentSnapshot, prevstudentSnapshot) {
	addNewStudent(newstudentSnapshot, prevstudentSnapshot);

});




function removeStudent(studentSnapshot) {
	alert("Inside removeStudent(studentSnapshot)");
	
	alert("studentRef = "+studentRef);
	//studentListFB == STuDenTs in FB
	//studentRef == name that is typed into field
	studentListFB.child(studentRef).once('value', function(snapshot){
		snapshot.ref().remove();
	});
	
	
}

// Add a callback to handle when a score is removed
studentListView.on('child_removed', function (oldstudentSnapshot) {
	removeStudent(oldstudentSnapshot);
});



//FUNCTION: Clear Entire Student WaitList
//	delete all rows from table.
//BUG--> does not clear rows from table unless page is refreshed 
//===================================================================================================

$(document).on('click', '#clearStudentList_YES', function () {
     
    //var id = studentRef.name(); //id=name from name input
    var id = studentListFB.name();//id=STuDenTs in FB

    myFB.child(id).once('value', function (snapshot) { 
        snapshot.ref().remove();
    });

});

myFB.limit(20).on("child_removed", function (snapshot) {
    console.log('deleting ' + snapshot.name());
    $( "#id" + snapshot.name() ).remove();
});
//==================================================================================================







//LOGIN: 
//===================================================================================================

//var emailField = $("#tutorEmailField");
//var passwordField = $("#tutorPasswordField");

var myUser = -1;


$(function() {

	//========== Login USER ===========================================================================
	$("#tutorLoginButton").click(function(){
	
		alert("Tutor login button clicked");
		
		var emAil = $("#tutorEmailField").val();
		var passWord = $("#tutorPasswordField").val();
		
		alert("EmAiL: "+emAil+", "+"PaSsWoRd: "+passWord);
		
		doLogin(emAil, passWord);
		
		alert("End of doLogin()");
	
		/* Should be for Register Button b/c were trying to CREATE a user
		authClient.createUser(email, password, function(error, user) {
		
			alert("Inside auth.createUser w/our email & password");
			alert("email: "+email);
			alert("password: "+password);
			
			alert("error: "+error);
	
			if (error === null) {
				console.log("User created successfully:", user);
				alert("User created successfully:", user);
	
			} else {
				console.log("Error creating user:", error);
				alert("Error creating user:", error);
	
			}
		});
		*/
	});
	
	$("#tutorLogoutButton").click(function(){
		alert("Tutor LOGOUT button clicked");
		authClient.logout();
	});
	
});

function doLogin(emAil, passWord){

	alert("Inside doLogin()");
	
	authClient.login("password",{
		email: emAil,
		password: passWord
	});	
};


//========== MONITORING AUTHENTICATION ==============================================================

/* Initialize Simple Login:
 * First--> Create a FirebaseSimpleLogin object. This object takes in a Firebase reference 
 *		and a callback function.
 * 		The callback is triggered anytime that the user's authentication state is changed.
 */
 
var isNewUser = true;

var authClient = new FirebaseSimpleLogin(myFB, function(error, user) { //myFB is FB reference declared at top of file

alert("Inside FBSimpleLogin ");
alert("UsEr: "+ user);
alert("ErrOr: "+ error);

  if (error) {
    // an error occurred while attempting login
    console.log("ErRoR: "+error);
    alert("ErRoR: "+error);

  } else if (user) {
    // user is LOGGED in
    console.log("User ID: " + user.uid + ", Provider: " + user.provider);
    alert("User ID: " + user.uid + ", Provider: " + user.provider);
    
    myUser = user;
    
    console.log("LOGGED IN");
    alert("LOGGED IN");
    
    $("#tutorLoginButton").attr("disabled", true);//hides login button when logged in
    $("#tutorLogoutButton").attr("disabled", false);//shows logout button when logged in
    
    $("#clearStudentList").attr("disabled", false);
    
    
  } else {
    // user is logged out
    alert("LOGGED OUT HELP Mee AhHAHH");
    $("#tutorLoginButton").attr("disabled", false);//shows logout button when logged out
    $("#tutorLogoutButton").attr("disabled", true); //hides logout button when logged out 
    
    $("#clearStudentList").attr("disabled", true);
  
    
  }
}); 


/*
var isNewUser = true;

var authClient = new FirebaseSimpleLogin(loginFB, function(error, user) {
  if (error) { ... }
  else if (user) {
    if( isNewUser ) {
      // save new user's profile into Firebase so we can
      // list users, use them in security rules, and show profiles
      myFB.child('users').child(user.uid).set({
        displayName: user.displayName,
        provider: user.provider,
        provider_id: user.id
      });
    }
  }
  else { ... }
} 
 
*/




/* In addition to using the FirebaseSimpleLogin object, we can also use the Firebase API 
 *		to monitor a user's authentication status. 
 *		By attaching an event listener on the location /.info/authenticated we'll be able 
 *			to observe any changes to a user's authentication status.
 */
 
/*
var authRef = new Firebase("https://brilliant-fire-8581.firebaseIO.com/.info/authenticated");

alert("authRef: "+authRef)

authRef.on("value", function(snap) {
 
  alert("SnAp: "+snap.val());

  alert("Inside authRef function ");


  if (snap.val() === true) {
    alert("authenticated");
  } else {
    alert("not authenticated");
  }
});
*/










//========== LOGGING USERS IN  ======================================================================
/*authClient.login("password",{
	email: email,
	password: password
});
*/



/*
function tutorLogin(email, password){

	console.log("inside tutorLogin");
	authClient.login('password', {
		email: temail,
		password: password
	});
	console.log("email: "+email+" "+ "password: "+password);

};
*/



//========== STORING USER DATA  =====================================================================

/* Internally, Simple Login generates JWT auth tokens after authenticating against the 
 *		appropriate provider. It then calls Firebase.auth() with those tokens. 
 *		It does not store profile or state information in Firebase. In order to persist user data 
 *		we'll have to save it to our Firebase.
 *	Saving a user when they log in through Simple Login:
 */
// we would probably save a profile when we register new users on our site
// we could also read the profile to see if it's null
// here we will just simulate this with an isNewUser boolean

/*
var isNewUser = true;

var authClient = new FirebaseSimpleLogin(loginFB, function(error, user) {
  if (error) { ... }
  else if (user) {
    if( isNewUser ) {
      // save new user's profile into Firebase so we can
      // list users, use them in security rules, and show profiles
      myFB.child('users').child(user.uid).set({
        displayName: user.displayName,
        provider: user.provider,
        provider_id: user.id
      });
    }
  }
  else { ... }
} 
 
*/












/*
//REMOVE
function removeButton(){
	document.getElementById("cse12Table").deleteRow(1);

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





*/








/////////////////////////////////////////////////////// PRACTICE PRACTICE ////////////////////////////////////////////////////////////////////





////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////






function load(){
	console.log("page load finished bitch!");
	$("#clearStudentList").attr("disabled", true);

}
