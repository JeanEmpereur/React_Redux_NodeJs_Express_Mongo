const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.get_all_user = (req, res) => {
  User.find({}, (error, users) => {
    if(error){
      res.status(500);
      console.log(error);
      res.json({message: "Erreur serveur."});
    }
    else{
      res.status(200);
      res.json(users);
      console.log("get all user");
    }
  })
};

exports.user_register = (req, res) => {
  let new_user = new User(req.body);

  console.log(req.body);
  new_user.save()
  .then(user => {
    res.status(201);
    res.json(user);
    console.log("user saved");
  })
  .catch(error => {
    res.status(500);
    console.log(error);
    res.json({message: "Erreur serveur."})
  })
}

exports.user_login = (req, res) => {
  let {body} = req;
  // let body = req.body

  User.findOne({username: body.username})
  .then(user => {
    console.log(body.username);
    if(user.password === body.password){
      let userData = {
        username: user.username
      }
      jwt.sign({userData}, process.env.JWT_KEY, {expiresIn: '5 days'}, (error, token) => {
        if(error){
          res.status(500);
          console.log(error);
          res.json({message: "Erreur serveur."});
        }
        else {
          res.json({user: user, token: token});
          console.log("user login");
        }
      })
    }
    else{
      res.status(500);
      res.json({message: "Erreur serveur."})
    }
  })
  .catch(error => {
    res.status(500);
    console.log(error);
    res.json({message: "Erreur serveur."})
  })
}

exports.get_a_user = (req, res) => {
  let {user_id} = req.params;

  User.findById(user_id, (error, user) => {
    if(error){
      res.status(500);
      console.log(error);
      res.json({message: "Erreur serveur."})
    }
    else{
      res.status(200);
      res.json(user)
      console.log("get one user");
    }
  })
}

exports.update_a_user = (req, res) => {
  User.findByIdAndUpdate(req.params.user_id, req.body, {new: true}, (error, user) => {
    if(error){
      res.status(500);
      console.log(error);
      res.json({message: "Erreur serveur."})
    }
    else {
      res.status(200);
      res.json(user);
      console.log("updated user");
    }
  })
}

exports.delete_a_user = (req, res) => {
  User.remove({_id: req.params.user_id}, (error) => {
    if(error){
      res.status(500);
      console.log(error);
      res.json({message: "Erreur serveur."})
    }
    else {
      res.status(200);
      res.json({message: "User deleted"});
      console.log("delete a user");
    }
  })
}