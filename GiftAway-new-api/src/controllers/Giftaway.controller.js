const cloudinary = require('cloudinary').v2
const uploadOnCloudinary = require("../utils/cloudinary")
const Giftaway = require('../db/giftAway.models')
const Category = require('../db/category.model')

// DB - handle requests for Entry Collection

// POST - Create new Entry 
const createGiftaway = async (req, res) => {

    // HTTP: retrieve data from request object
    const publisherId = req.cookies.userId
    const { title, description, categoryName } = req.body;
    // all the values are provided in postman extension form-data, how to receive them?
    console.log(req.files)
    const avatar = req.files.image[0].path

    // User prompt: title + description
    if ([title, description].some(item => !item || (typeof item === 'string' && item.trim() === ""))) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Cloudinary: store picture
    const avatarObject = await uploadOnCloudinary(avatar)
    const avatarPath = avatarObject.url

    // DB: check prexisting entry & find matching category
    const giftawayPresent = await Giftaway.findOne({ $and: [{ title }, { description }] }) // find identical
    const categories = await Category.find()                                               // find all categories

    // assign Category, if match with DB
    let categoryId = null
    /*     for (let category in categories) {
            const categoryname = categories[category].categoryname
            console.log(categoryname)
    
            if(categoryname === categoryName) {
                 categoryId = category._id
                 
            }
            console.log(categoryname, categoryName)
        } */
    for (let category of categories) {
        if (category.categoryname === categoryName) {
            categoryId = category._id;
            break;
        }
    }
    // console.log(categoryId)

    // DB: save new Entry
    if (!giftawayPresent) {
        console.log(publisherId)
        // syntactic sugar - shorthand property syntax: omit repetition of key-value pairs when variable name matches property name
        await Giftaway.create({ avatar: avatarPath, title, description, categoryId, publisherId })
        console.log({ avatarPath, title, description, categoryId })
        res.status(201).json('Giftaway created')
    }
    else {
        res.status(200).json('Giftaway exists')
    }
}

// DELETE Entry
const deleteGiftaway = async (req, res) => {
    const { giftawayId } = req.body

    if (!giftawayID) {
        throw new Error('Giftaway empty')
    }
    await Giftaway.deleteOne({ _id: giftawayId })
    res.status(200).json('Deleted successfully')
}

// GET Entry all Entries of logged-in User for All-Gifts List // ToEdit!!!!
const  getGiftaways = async (req, res) => {

    const userId = req.cookies["userId"]

    const allGiftaways = await Giftaway.find()

    const myGiftaways = []
    for(giftaway of allGiftaways) {
        if(giftaway.publisherId == userId) {
            myGiftaways.push(giftaway)
        }
    }
    res.status(200).json({giftaways: myGiftaways})
}

module.exports = { 
    createGiftaway, 
    deleteGiftaway, 
    getGiftaways,
}