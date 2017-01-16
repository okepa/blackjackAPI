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
        validate: [dateValidator, 'You must be over 18']
    }
});


// function that validates the dob - checks if user is over 18
function dateValidator(dob) {
    let years = moment().diff(moment(dob), 'years');
    return years;
    // if (years < '18') {
        
    // }
}

module.exports = mongoose.model("User", UserSchema);