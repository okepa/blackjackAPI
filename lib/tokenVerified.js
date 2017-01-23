const jwt = require('jsonwebtoken');


class VerifiedToken {
//user authentication
static verifyToken(req) {
    return new Promise(
        (resolve, reject) => {
            let token = req.headers['x-access-token'];

            if (token) {
                jwt.verify(token, "blackJackUserToken", function (err, decoded) {
                    if (err) {
                        reject(err);
                    } else {
                        req.decoded = decoded;
                        resolve();
                    }
                });
            } else {
                reject({
                    success: false,
                    message: "No token provided"
                });
            }
        }
    )
}
}

module.exports = VerifiedToken;