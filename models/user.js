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
        validate: [dateValidator, 'Start Date must be less than End Date']
    }
});


// function that validate the startDate and endDate
function dateValidator(value) {
  // `this` is the mongoose document
  return this.dob <= value;
}

module.exports = mongoose.model("User", UserSchema);