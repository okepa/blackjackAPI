const email = require("../lib/email");

class RegisterController {
    static sendEmailRequest(req, res) {
        //const contactRequest = new Email(req.body);
        email.sendEmail(req.body)
            .then(() => {
                res.status(200).send({
                    success: "Email has been sent"
                })
                //res.redirect("/login");
            })
            .catch(error => {
                res.status(400).send(err.message);
                //res.redirect("/login");
            });
    }
}

module.exports = RegisterController;