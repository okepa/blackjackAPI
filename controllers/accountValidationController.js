const accountValidation = require('../lib/accountValidation');
const User = require('../models/user');
//Here I need to get the token from the route and send it to the lib file
class accountValidationController {
    static accountValidationRequest(req, res){
        try { 
            accountValidation.checkValidation(token)
            .then(() => {
                 console.log ("It worked!");
                res.redirect("/");
            })
        } catch (err){

        }

    }
}

module.exports = accountValidationController;