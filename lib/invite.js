const sg = require('sendgrid').SendGrid(process.env.SENDGRID);
const request = sg.emptyRequest();
const InviteModel = require("../models/invite");


class Invite {
    //WORKS
    static insertFriend(req) {
        return new Promise(
            (resolve, reject) => {
                InviteModel.create(req.body, function (err, invite) {
                    if (err) {
                        reject(err);
                    } else {
                        console.log
                        console.log("print invite");
                        console.log(invite);
                        resolve();
                    }
                });
            }
        )

    }

    //works
    static createInviteEmail(obj) {
        return new Promise(
            (resolve, reject) => {
                let urlString = `${process.env.URL}/registration`;
                request.body = {
                    "from": {
                        "email": "<no-reply@blackjack.com>",
                        "name": "Blackjack team"
                    },
                    "subject": "Blackjack Invitation - £10 Free Credit!",
                    "content": [
                        {
                            "type": "text/html",
                            "value": `
                            <html>
                            <p>
                                Hello ${obj.friendEmail}
                            </p>
                            <p>
                                You have been invited to :
                            </p>
                            <p>
                               <a href="${urlString}">${urlString}</a>
                            </p>
                            </html>`
                        }
                    ],
                    "personalizations": [
                        {
                            "to": [
                                {
                                    "email": `${obj.friendEmail}`
                                
                                }
                            ]
                        }
                    ]
                };
                console.log("print email");
                console.log(request.body);
                request.method = 'POST';
                request.path = '/v3/mail/send';

                sg.API(request, function (response) {
                    if (response.statusCode === 202) {
                        resolve();
                    } else {
                        reject("An error has occurred");
                    }
                });
            }
        )
    }
    
}

module.exports = Invite;