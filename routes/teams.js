var data = require("../models/database.js").database

exports.newTeam = function(req, res){
  // should check to see if team already exists 
  // (we can just assume names must be unique?)

  // then add team to database
  // res.render('main', { name: req.body.name, coach: req.body.coach, city: req.body.city });

};

exports.listTeams = function(req,res){
console.log(data)
  res.render('main', { name: data[0].name, coach: data[0].coach, city: data[0].city, players: data[0].players });
}

exports.getTeam = function(req, res){
  
};

exports.editTeam = function(req, res){
  
};

exports.deleteTeam = function(req, res){
  // should also delete any players associated with that team

};