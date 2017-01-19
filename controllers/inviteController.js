const InviteLib = require("../lib/invite");
//const invitee = require("../models/invite");

class InviteController {
    static sendInviteEmail(req, res) {
        //1.
        InviteLib.insertFriend(req)
            .then(() => {
                //2. 
                InviteLib.createInviteEmail(req.body)
            })
            // .then(() => {
            //     //3.
            //     InviteLib.findAndUpdateBalance(req.body)
            //     })
            .then(() =>{
                res.status(200).send({
                    success: "email  has been sent"
                })
            })
            .catch(err => {
                console.log(err);
                res.status(400).send(err.message);
            });
    }
}


module.exports = InviteController;