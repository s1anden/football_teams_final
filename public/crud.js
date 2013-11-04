// Debugging - console.logs run only when true
debug = true;

// Global datastore
var teams = [];
var players = [];

// add new team
function addTeam(){
	var newTeam = {};

	console.log("adding new team");	
	var tn = $('#teamname-input').val();
	var tc = $('#city-input').val();
	var tco = $('#coach-input').val();

	newTeam.name = tn;
	newTeam.players = [];
	newTeam.city = tc;
	newTeam.coach = tco;

	teams.push(newTeam);
	console.log("just before calling add/ajax");	
	window.add(tn, tco, tc);

	// Clear Inputs
	$('#teamname-input').val("");
	$('#city-input').val("");
	$('#coach-input').val("");
}
function add(name, coach, city) {
	console.log("running ajax stuff");	
  $.ajax({
    	url: "/teams",
			type: "put",
    	data: {"name": name, "players": [], "city": city, "coach": coach},
    	success: function(data) { }
  });
}

// add new team
function editTeam(index){
	console.log("working?");
	console.log(index);
	var index = index;
	var updatedTeam = {};

	console.log("updating team");	
	var tn = $('#teamname-input').val();
	var tc = $('#city-input').val();
	var tco = $('#coach-input').val();

	updatedTeam.name = tn;
	updatedTeam.city = tc;
	updatedTeam.coach = tco;

	window.edit(tn, tco, tc, index);
}
function edit(name, coach, city, index) {
	console.log(index);
	console.log("running ajax stuff");	
  $.ajax({
    	url: "/teams/" + index,
		type: "post",
    	data: {"name": name, "city": city, "coach": coach, index:index},
    	success: function(data) { location.reload() }
  });
}

// delete team
function deleteTeam(id){
	console.log("just before calling ajax-delete");
	console.log(id);		
	window.deletethis(id);
}
function deletethis(id) {
	console.log("running ajax-delete stuff");	
	console.log(id);	
  $.ajax({
    	url: "/teams/"+id,
		type: "delete",
    	success: function(data) { window.alert("You sure?"); window.location.assign('/teams'); }
  });
}

// add player
function addPlayer(){
	var newPlayer = {};

	console.log("adding new player");	
	var pn = $('#playername-input').val();
	var pt = $('#team-input').val();

	newPlayer.name = pn;
	newPlayer.team = pt;

	players.push(newPlayer);
	window.add(pn, pt);

	// Clear Inputs
	$('#playername-input').val("");
	$('#team-input').val("");
}
function add(name, team) {
	console.log("running ajax stuff");	
  $.ajax({
    	url: "/players",
		type: "put",
    	data: {"name": name, "team": team},
    	success: function(data) { }
  });
}