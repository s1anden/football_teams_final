var data = require("../models/database.js").database

// exports.createTeam = function(req, res){
// 	res.render('create');
// };

exports.newTeam = function(req, res){
  // should check to see if team already exists 
  // (we can just assume names must be unique?)

  // then add team to database
  // res.render('main', { name: req.body.name, coach: req.body.coach, city: req.body.city });
};

exports.listTeams = function(req,res){
  res.render('teams', { teams: data });
}

exports.getTeam = function(req, res){
	var url = req.url.split("/");
	var id = url[2];
	if (id >= data.length) {res.render('teams',{teams:false});};
  res.render('teams', {teams: [data[id]], index:id});
};

exports.editTeam = function(req, res){
  var url = req.url.split("/");
  var id = url[2];
  if (id >= data.length) {res.render('teams',{teams:false});};
  res.render('teams', {teams: [data[id]], index:id});
};

exports.deleteTeam = function(req, res){
  // function defined in app.js
};