const mongoose = require("mongoose");
const moment = require("moment");

//create user schema
let UserSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        require: true,
        validate: {
            //a validation function that uses moment to find the diff in years (value)
            //checks to see if a users is older than 18
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
    }
});

module.exports = mongoose.model("User", UserSchema);