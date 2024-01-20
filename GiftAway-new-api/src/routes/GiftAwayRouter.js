const express = require('express');
const storage = require('../middlewares/multer.middleware')
const {createGiftaway, deleteGiftaway, getGiftaways, editGiftaway, receivedGiftaway } = require('../controllers/Giftaway.controller')


const giftAwayRouter = express.Router();


giftAwayRouter.route('/').post(storage.fields([{ name: "image", maxCount: 1 }]), createGiftaway)

giftAwayRouter.delete('/', deleteGiftaway)

giftAwayRouter.get('/', getGiftaways)

giftAwayRouter.patch('/', receivedGiftaway) //T

module.exports = giftAwayRouter;
