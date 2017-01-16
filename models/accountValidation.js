var mongoose = require('mongoose');

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