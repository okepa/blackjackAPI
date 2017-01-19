const mongoose = require("mongoose");

let InviteSchema = mongoose.Schema({
    friendEmail: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (email) {
                let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                return re.test(email)
            }
        }
    },
    existingUserId: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("invite", InviteSchema);