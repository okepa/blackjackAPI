const mongoose = require("mongoose");
const moment = require("moment");

let UserSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },

    email: {
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

    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },

    dob: {
        type: Date,
        require: true,
        validate: {
            validator: function (value) {
                let years = moment().diff(moment(value), 'years');
                if (years < 18) {
                    console.log(years);
                    return false;
                } else {
                    console.log(years);
                    return true;
                }
            },
        }
    },

    token: {
        type: String,
    },

    access: {
        type: Boolean,
        default: false
    },

    balance: {
        type: Number,
        default: 0
    }
    
});

module.exports = mongoose.model("user", UserSchema);
