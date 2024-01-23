const mongoose = require('mongoose');


const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add the Username"]
    },
    email: {
        type: String,
        required: [true, "Please add user email Address"],
        unique: [true, "This Email Address is already taken"]
    },
    password: {
        type: String,
        required: [true, "Please add the user password"]
    }
},
    {
        timestamps: true,
    }
);


module.exports = mongoose.model('User', UserSchema);