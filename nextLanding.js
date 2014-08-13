var queue=[];

var click_button = $("#clickMe");

click_button.click(function(){
	var getval = ($("#nameField").val());
	var getval2 = ($("#labNum").val());
	
	
	var tst = $("#test");
	var tst2 = $("#test2");
	
	tst.text(getval);
	tst2.text(getval2);
	
	queue.push(getval);
	queue.push(getval2);

	alert(queue);
});
