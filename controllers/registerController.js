const mailer = require("../lib/email");

class RegisterController {
    static sendContactRequest(req, res){
        try {
            const contactRequest = new Email(req.body);
            mailer.sendEmail(contactRequest)
             .then(() => {
                 console.log ("It worked!");
                res.redirect("/");
            })
            .catch(error => {
                console.log(`It didnt work becaue %{erorr}`);
                res.redirect("/");
            });
        } catch (err){
            console.log(err);
            res.redirect("/");
        }

    }
}

module.exports = RegisterController;