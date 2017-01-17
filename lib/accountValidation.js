

class Email {
    static checkValidation(token) {
        return new Promise(
            (resolve, reject) => {
                //use jwt token verify
                jwt.verify(token, secretOrPublicKey, [options, callback])

        })


}

}