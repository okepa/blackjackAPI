const jwt = require('jsonwebtoken');
const sg = require('sendgrid').SendGrid("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");

const request = sg.emptyRequest();

class Email {

    //use jwt-token instead of own
    //no need to put token in db we can use jwt-verify
    static generateString() {

        // let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        // let token = '';
        // for (let i = 0; i < 16; i++) {
        //     token += chars[Math.round(Math.random() * (chars.length - 1))];
        // }
        // let urlString = `${process.env.URL}/accountValidation?${token}`;

        // return urlString;
    }

    static sendEmail(obj) {
        return new Promise(
            (resolve, reject) => {
                let testObj = {};
                let token = jwt.sign(obj, "blackjack", {
                    expiresIn: "12h"
                });

                let urlString = `${process.env.URL}/accountValidation?${token}`;

                request.body = {
                    "from": {
                        "email": "<no-reply@blackjack.com>"
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
                               <a href="${urlString}"></a>
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