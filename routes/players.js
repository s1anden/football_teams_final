var data = require("../models/database.js").database

exports.newPlayer = function(req, res){
  // in app.js aint nobody got time for this
};

exports.listPlayers = function(req,res){
	var url = req.url.split("/");
	var id = url[2];
	if (id >= data.length) {res.render('teams',{teams:false});};
  	res.render('players', {team:data[id], index:id, playerid: undefined});
}

exports.getPlayer = function(req, res){
  	var url = req.url.split("/");
	var teamid = url[2];
	var pid = url[4];
	if (teamid >= data.length) {res.render('teams',{teams:false});};
	res.render('players', {team:data[teamid], playerid:pid, teamid:teamid});
};

exports.editPlayer = function(req, res){
	var url = req.url.split("/");
	var teamid = url[2];
	var pid = url[4];
	if (teamid >= data.length) {res.render('teams',{teams:false});};
	res.render('players', {team:data[teamid], playerid:pid, teamid:teamid});
};

exports.deletePlayer = function(req, res){
  // in app.js aint nobody got time for this
};