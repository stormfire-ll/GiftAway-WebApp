const { accessSync } = require('fs')
const Giftaway = require('../db/giftAway.models')
const User = require('../db/register.models')


const fetchUnclaimedGiftaways = async (req, res) => {

    const userId = req.cookies.userId || req.body.userId
    console.log(`Dashboard: ${userId}`)

    const allGiftaways = await Giftaway.find()

    const allUsers = await User.find()

    const unclaimedGiftaways = allGiftaways.filter(giftaway => !giftaway?.consumerId || !giftaway.consumerId.equals(userId));

    const claimedGiftaways = allGiftaways.filter(giftaway => giftaway?.consumerId && giftaway.consumerId.equals(userId));


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

const claimGiftaway = async (req, res) => {
    const { giftawayId } = req.body
    const consumerId = req.cookies.userId
    const giftaway = await Giftaway.findById(giftawayId)

    giftaway.consumerId = consumerId

    await giftaway.save({ validateBeforeSave: false })

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