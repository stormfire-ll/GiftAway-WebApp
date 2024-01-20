const mongoose = require('mongoose');
const {Schema} = require('mongoose')

const Giftaway = new mongoose.Schema({
    avatar: {
        type: String,
        //T require: true,
    },
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        require: true
    },
    consumerId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    publisherId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    receiverId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    deactivate: {
        type: Boolean,
        default: false, // default: undefined
    },
})

module.exports = new mongoose.model('Giftaway', Giftaway)