const mongoose = require('mongoose');

const User = new mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    mail: {
        type: String,
        require: true,   
    },
    phone: {
        type: String,
        require: true,
    },
    pickUplocation: {
        type: String,
        require: true,
    },
})

module.exports = mongoose.model("Users", User)