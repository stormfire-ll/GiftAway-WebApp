const mongoose = require('mongoose')

const Category = new mongoose.Schema({
    categoryname: {
        type: String,
        //T require: true,
    },
})

module.exports = mongoose.model("Category", Category)