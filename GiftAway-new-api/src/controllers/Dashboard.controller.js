const { accessSync } = require('fs')
const Giftaway = require('../db/giftAway.models')
const User = require('../db/register.models')

// All-Gifts List (by logged-in userId) & Claimed List with Contact Info
const fetchUnclaimedGiftaways = async (req, res) => {

    const userId = req.cookies.userId || req.body.userId
    console.log(`Dashboard: ${userId}`)

    // Arrays
    const allGiftaways = await Giftaway.find()

    const allUsers = await User.find()

    const unclaimedGiftaways = allGiftaways.filter(giftaway => !giftaway?.consumerId || !giftaway.consumerId.equals(userId)); // not claimed or claimed by diff user

    const claimedGiftaways = allGiftaways.filter(giftaway => giftaway?.consumerId && giftaway.consumerId.equals(userId)); // claimed & by userID

    // Claimed Entries with ContactInfo (from userSchema)
    const newClaimedGiftaways = []

    for (let item of claimedGiftaways) {

        console.log(claimedGiftaways.length, userId)
        if (item.consumerId == userId) {

            const consumerId = item.consumerId;
            const user = allUsers.find(u => u._id.equals(consumerId));

            if (user) {

                newClaimedGiftaways.push({
                    _id: item._id,
                    avatar: item.avatar,
                    title: item.title,
                    description: item.description,
                    phone: user.phone,
                    mail: user.mail
                })
            }
        }
    }

    res.status(200).json({ "unclaimedGiftaways": unclaimedGiftaways, "claimedGiftaways": newClaimedGiftaways })
}
// Assign consumerId to entry
const claimGiftaway = async (req, res) => {
    const { giftawayId } = req.body
    const consumerId = req.cookies.userId
    const giftaway = await Giftaway.findById(giftawayId)

    giftaway.consumerId = consumerId

    await giftaway.save({ validateBeforeSave: false }) // validateBeforeSave: skip validation

    res.status(201).json('Updated successfully')
}

const unclaimGiftaway = async (req, res) => {
    const { giftawayId } = req.body

    const giftaway = await Giftaway.findByIdAndUpdate(giftawayId, {
        $unset: {
            consumerId: 1
        }
    }, {
        new: true
    })
    
    res.status(201).json('Updated successfully')
}

module.exports = { fetchUnclaimedGiftaways, claimGiftaway, unclaimGiftaway }