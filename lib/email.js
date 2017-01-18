const jwt = require('jsonwebtoken');
const sg = require('sendgrid').SendGrid(process.env.SENDGRID);

const request = sg.emptyRequest();

class Email {

    static sendEmail(obj) {
        return new Promise(
            (resolve, reject) => {
                let token = jwt.sign(obj, "emailValidation", {
                    expiresIn: "12h"
                });
                let urlString = `${process.env.URL}/success/${obj.username}/${token}`;
                request.body = {
                    "from": {
                        "email": "<no-reply@blackjack.com>",
                        "name": "Blackjack team"                      
                    },
                    "subject": "Registration Validation",
                    "content": [
                        {
                            "type": "text/html",
                            "value": `
                            <html>
                            <p>
                                Hello ${obj.fullName}
                            </p>
                            <p>
                                You have registered for BlackJack, click the link to validate your account:
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
                                    "email": `${obj.email}`
                                }
                            ]
                        }
                    ]
                };

                request.method = 'POST';
                request.path = '/v3/mail/send';

                sg.API(request, function (response) {
                    console.log(response.statusCode);
                    console.log(response.body);
                    console.log(response.headers);
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

module.exports = Email;