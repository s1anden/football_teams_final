$("#button").click( function() {
	alert("poop")
	var obj = $(this).serializeArray();
	$.put("/teams/" + obj.name, obj, function(){
		console.log("Added team successfully!");
	});
});