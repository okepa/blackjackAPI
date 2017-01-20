const mongoose = require("mongoose");
const moment = require("moment");

//create user schema
let UserSchema = mongoose.Schema({
        fullName: {
        type: String,
        required: true,
        validate: {
            validator: function(fullName){
                let re = /^[a-zA-Z]+$/;
                return re.test(fullName)
            }
        }
        // validate: nodemvd.$notEmpty({ msg: 'Please enter your full name.' })
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
    },
    access: {
        type: Boolean,
    },

    balance:{
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model("user", UserSchema);