exports.newTeam = function(req, res){
  // should check to see if team already exists 
  // (we can just assume names must be unique?)

  // then add team to database
<<<<<<< HEAD
  // data[req.body.name] = {coach:req.body.coach, city:req.body.city};
  
=======
<<<<<<< HEAD
  req.body.name
  req.body.coach
  req.body.city
  res.render('main', { name: req.body.name, coach: req.body.coach, city: req.body.city });
=======
  data[req.body.name] = {coach:req.body.coach, city:req.body.city};
>>>>>>> 10b51252be409abaec384ddcf43fd141fc5aaa74
>>>>>>> 039d8771cb56f734487cb55d9cc192dae4d817e2
};

exports.listTeams = function(req,res){
	
}

exports.getTeam = function(req, res){
  
};

exports.editTeam = function(req, res){
  
};

exports.deleteTeam = function(req, res){
  // should also delete any players associated with that team

};