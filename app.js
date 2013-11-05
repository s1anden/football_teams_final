var express = require('express'),
	teams = require('./routes/teams'),
	players = require('./routes/players'),
  routes = require('./routes/slash'),
	data = require('./models/database').database;
	// path = require('path');

var fs = require("fs");
var app = express();

app.configure(function(){
  app.set('views', __dirname + '/views'); // Set the directory for views
  app.set('view engine', 'ejs');  // Set the view engine to EJS
  app.use(express.favicon());	// Return a favicon if requested
  app.use(express.logger('tiny'));	// Log requests to the console.log
  app.use(express.bodyParser());	// Parse the request body into req.body object
  app.use(express.methodOverride()); // Allows you to override HTTP methods on old browsers
  app.use(app.router); // Do the routes defined below
  app.use(express.static(__dirname + '/public'));	// Process static files
});

// reading db file
function readFile(filename, defaultData, callbackFn) {
  fs.readFile(filename, function(err, data) {
    if (err) {
      console.log("Error reading file: ", filename);
      data = defaultData;
    } else {
      console.log("Success reading file: ", filename);
    }
    if (callbackFn) callbackFn(err, data);
  });
}

// writing to db file
function writeFile(filename, data, callbackFn) {
  fs.writeFile(filename, data, function(err) {
    if (err) {
      console.log("Error writing file: ", filename);
    } else {
      console.log("Success writing file: ", filename);
    }
    if (callbackFn) callbackFn(err);
  });
}

// index page
app.get('/', routes.pathless);

// new team
// app.put('/teams',teams.newTeam);
app.put("/teams", function(request, response) {
  console.log("stuff in app.js"); 

  var item = {"name": request.body.name,
              "players": [],
              "coach": request.body.coach,
              "city": request.body.city};
  console.log(item);

  var successful = 
      (item.name !== undefined) &&
      (item.city !== undefined) &&
      (item.players !== undefined) &&
      (item.coach !== undefined);

  if (successful) {
    data.push(item);
    writeFile("./models/database.js", "var data = " + JSON.stringify(data) + "\n exports.database = data;");
    console.log(data);
  } else {
    item = undefined;
  }

  response.send({ 
    item: item,
    success: successful
  });
});

// edit team
app.post('/teams/:team_id',function(request,response,next){
  console.log("stuff in app.js"); 
  console.log(request.params.team_id);

  var item = {"name": request.body.name,
              "coach": request.body.coach,
              "city": request.body.city};
  console.log(item);

  var successful = 
      (item.name !== undefined) &&
      (item.city !== undefined) &&
      (item.coach !== undefined);

  if (successful) {
    data[request.params.team_id].name = item.name;
    data[request.params.team_id].coach = item.coach;
    data[request.params.team_id].city = item.city;
    writeFile("./models/database.js", "var data = " + JSON.stringify(data) + "\n exports.database = data;");
    console.log(data);
  } else {
    item = undefined;
  }

  response.send({ 
    item: item,
    success: successful
  });
  response.render('teams', {teams:[data[request.params.team_id]], index:request.params.team_id})
});

// app.post('teams/:team_id',teams.editTeam);

// list teams
app.get('/teams',teams.listTeams);

// show one team
app.get('/teams/:team_id',teams.getTeam);

// delete one team - delete contained in body
app.delete('/teams/:team_id',function(request, response) {
	console.log("DELETING!!");

	var url = request.url.split("/");
	var id = url[2];
	console.log("id is "+id);
	if (id >= data.length) {response.render('teams',{teams:false});};
	var team = [data[id]];  
	console.log("team is "+team);

	var temp = [];
	while (data.length>id){
		console.log("before pop, length of data is "+data.length);
		temp.push(data.pop());
	}

  temp.pop();
	while (temp.length>0){
		console.log("before push, length of data is "+data.length);
		data.push(temp.pop());
	}	

  writeFile("./models/database.js", "var data = " + JSON.stringify(data) + "\n exports.database = data;");
  console.log(data);
	response.render('main', {teams: team});
	// window.alert("Team deleted");

});

// new players
app.put('/players', function(request, response) {
  console.log("stuff in app.js"); 

  var item = {"name": request.body.name,
              "team": request.body.team};
  console.log(item);

  var teamnames = [];
  for(var i=0; i<data.length; i++) {
      teamnames.push(data[i].name);
    }

  var successful = 
      (item.name !== undefined) &&
      (item.team !== undefined && teamnames.indexOf(item.team) >= 0);

  if (successful) {
    console.log("successful " + data);
    for(var i=0; i<data.length; i++) {
      if (data[i].name == item.team) {
        data[i].players.push(item.name)
      }
    }
    writeFile("./models/database.js", "var data = " + JSON.stringify(data) + "\n exports.database = data;");
    console.log(data);
  } else {
    item = undefined;
  }

  response.send({ 
    item: item,
    success: successful
  });
});

// get players list by team
app.get('/teams/:team_id/players',players.listPlayers);

// get players by team and id
app.get('/teams/:team_id/players/:player_id',players.getPlayer);  

// edit players
app.post('/teams/:team_id/players/:player_id',function(request,response,next){
  console.log("stuff in app.js"); 
  console.log(request.params.team_id);
  console.log("wtfmate" + request.params.player_id);

  var teamid = request.params.team_id;
  var playid = request.params.player_id;
  var teamnames = [];
  for(var i=0; i<data.length; i++) {
      teamnames.push(data[i].name);
  }

  var item = {"name": request.body.name,
              "players": request.body.players,
              "coach": request.body.coach,
              "city": request.body.city};
  console.log(item);

  var successful = 
      (item.name !== undefined && teamnames.indexOf(item.name) >= 0) &&
      (item.city !== undefined) &&
      (item.coach !== undefined) && 
      (item.players !== undefined && typeof(item.players) == "object");

  if (successful) {
    data[teamid].name = item.name;
    data[teamid].coach = item.coach;
    data[teamid].city = item.city;
    data[teamid].players = item.players;
    writeFile("./models/database.js", "var data = " + JSON.stringify(data) + "\n exports.database = data;");
  } else {
    item = undefined;
  }

  response.send({ 
    item: item,
    success: successful
  });
  response.send('/teams/'+teamid+'/players/'+playid, {"team":data[teamid], "playerid":playid})
});

// delete players
app.delete('/teams/:team_id/players/:player_id',function(request, response) {
  console.log("DELETING!!");

  var teamid = request.params.team_id;
  var playid = request.params.player_id;

  if (teamid >= data.length) {response.render('teams',{teams:false});};
  if (playid >= data[teamid].players.length) {response.render('players',{teams:false});};

  var temp = [];
  while (data[teamid].players.length > playid) {
    console.log("before pop, length of data is "+data.length);
    temp.push(data[teamid].players.pop());
  }

  temp.pop();
  while (temp.length > 0){
    console.log("before push, length of data is "+data.length);
    data[teamid].players.push(temp.pop());
  } 

  var team = data[teamid];  

  writeFile("./models/database.js", "var data = " + JSON.stringify(data) + "\n exports.database = data;");
  console.log(data);
  response.render('main', {teams: team});
  // window.alert("Team deleted");

});

app.listen(44445);
console.log("Express server running on port 44445");