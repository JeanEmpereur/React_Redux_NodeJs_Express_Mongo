const jwt = require('jsonwebtoken');

exports.verify_token = (req, res, next) => {
  let token = req.headers['x-access-token'];

  if(typeof token !== 'undefined'){
    console.log(token);
    jwt.verify(token, process.env.JWT_KEY, (error, authData) => {
      if(error){
        res.status(401);
        res.json({message: "Accès interdit"})
      }
      else{
        console.log('token verify');
        next();
      }
    })
  }
  else{
    res.status(401);
    res.json({message: "Accès interdit"})
  }
}
