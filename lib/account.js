//mongoose look up
//find person by id
//sends a promise back depending on result
//send result to controller 
const User = require("../models/user");

class Account {
    static getAccDetails(req){
        return new Promise(
            (resolve, reject) => {
                User.findById({_id: req.params.id},{ password: 0}, (err, user) => {
                    if (err) reject(err);
                    if (!user) reject("User not found");
                    resolve(user);
                });
            }
        )
    }
}


module.exports = Account;