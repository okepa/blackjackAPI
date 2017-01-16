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
            validator: function (value) {
                let years = moment().diff(moment(value), 'years');
                if (years < 18) {
                    console.log(years);
                    return false;
                } else {
                    console.log(years);
                    // none were found, you passed!
                    return true;
                }
            },
        }
    }
});


// // function that validates the dob - checks if user is over 18
// function dateValidator(dob) {
//     console.log("test");
//     // let dob = moment(dob).format('DD-MM-YYYY');
//     let years = moment().diff(moment(dob), 'years');
//     console.log(years)
//     return years;
//     // if (years < '18') {

//     // }
// }

module.exports = mongoose.model("User", UserSchema);