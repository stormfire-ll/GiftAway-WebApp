const cloudinary = require('cloudinary').v2
const uploadOnCloudinary = require("../utils/cloudinary")
const Giftaway = require('../db/giftAway.models')
const Category = require('../db/category.model')


const createGiftaway = async (req, res) => {

    const publisherId = req.cookies.userId

    const { title, description, categoryName } = req.body;
    // all the values are provided in postman extension form-data, how to receive them?
    console.log(req.files)
    const avatar = req.files.image[0].path


    if ([title, description].some(item => !item || (typeof item === 'string' && item.trim() === ""))) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const avatarObject = await uploadOnCloudinary(avatar)
    const avatarPath = avatarObject.url


    const giftawayPresent = await Giftaway.findOne({ $and: [{ title }, { description }] })

    const categories = await Category.find()

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

    if (!giftawayPresent) {


        console.log(publisherId)

        const createdGiftaway = await Giftaway.create({ avatar: avatarPath, title, description, categoryId, publisherId })
        console.log({ avatarPath, title, description, categoryId })
        res.status(201).json({ createdGiftaway })
    }
    else {
        res.status(200).json('Giftaway exists')
    }
}

const deleteGiftaway = async (req, res) => {

    const giftawayId = req.query.giftawayId


    try {
        const result = await Giftaway.deleteOne({ _id: giftawayId });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Giftaway not found' });
        }
        res.status(200).json('Deleted successfully');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getGiftaways = async (req, res) => {

    const userId = req.cookies["userId"]

    const allGiftaways = await Giftaway.find()

    const myGiftaways = []
    for (giftaway of allGiftaways) {

        if (giftaway.publisherId == userId) {
            myGiftaways.push(giftaway)
        }
        console.log(myGiftaways)
    }
    res.status(200).json({ giftaways: myGiftaways })


}

module.exports = { createGiftaway, deleteGiftaway, getGiftaways }