const tokenVerified = require("../lib/tokenVerified");


class TokenController {
/**
 * This function verifies a valid token is provided on each route
 * @param req
 * @param res
 * @param next
 */
static apiCheck(req, res, next) {
    console.log('Api Check');

    tokenVerified.verifyToken(req)
        .then(() => {
            console.log("it works");
            next();
        })
        .catch(err => {
            console.log(err);
            return res.status(401).send({ success: false, message: err.message });
        });



}
}

module.exports = TokenController;