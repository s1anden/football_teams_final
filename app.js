var express = require('express'),
	teams = require('./routes/teams'),
	players = require('./routes/players');

var app = express();

app.configure(function(){
  app.use(express.favicon());	// Return a favicon if requested
  app.use(express.logger('tiny'));	// Log requests to the console.log
  app.use(express.bodyParser());	// Parse the request body into req.body object
  app.use(express.methodOverride()); // Allows you to override HTTP methods on old browsers
  app.use(app.router); // Do the routes defined below
  app.use(express.static(path.join(__dirname, 'public')));	// Process static files
});

app.put('/teams/:team_id',teams.newTeam);
app.get('/teams/:team_id',teams.getTeam);
app.post('/teams/:team_id',teams.editTeam);
app.delete('/teams/:team_id',teams.deleteTeam);