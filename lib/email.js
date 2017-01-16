const sg = require('sendgrid').SendGrid("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");

const request = sg.emptyRequest();

class Email {

    static generateString(){
        let urlString = process.env.URL;
        console.log(urlString);
        return urlString;
    }

    static sendEmail(obj){
        return new Promise(
            (resolve, reject) => {
                request.body = {
                    "from": {
                        "email": obj.email,
                        "name": `${obj.firstName} ${obj.lastName}`
                    },
                    "subject": "Registration Validation",
                    "content": [
                        {
                            "type": "text/html",
                            "value": `
                            <html>
                            <p>
                                Hello ${obj.firstName}
                            </p>
                            <p>
                                You have registered for BlackJack, click the link to validate your account:
                            </p>
                            <p>
                               
                            </p>
                            </html>`
                        }
                    ],
                    "personalizations": [
                        {
                            "to": [
                                {
                                    "email": "llhcostello@gmail.com"
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
                    if (response.statusCode === 202){
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