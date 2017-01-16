const User = require("../models/user");
const hash = require("password-hash");

class RegisterController {

static newUser(req, res){
  // create an empty post
  let newUser = {
    id: "",
    title: "",
    body: ""
  }
  //find correct render from blackjackgui
  res.render("" , {
    title: "",
    user: newUser
  });
}

static createUser(req,res){
  req.body.password = hash.generate(req.body.password);
    User.create( req.body , function(err, post){
    
        // check for errors and return 500 if there was a problem
        if(err) return res.status(500).send(err);
    
        // redirect the user to a GET route. We'll go back to the INDEX.
        res.redirect("/");
    
    });

}
}

module.exports = RegisterController;