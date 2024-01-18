const { accessSync } = require('fs')
const Giftaway = require('../db/giftAway.models')
const User = require('../db/register.models')
const ObjectId = require('mongodb')

const fetchUser = async (req, res) => {
    console.log(req.body)
    const users = await User.find()

    const user = users.filter(item => item.id.toString() == req.body.id)

    console.log({ mail: user[0].mail, phone: user[0].phone })
    res.status(200).json({ mail: user[0].mail, phone: user[0].phone })
}

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
    const giftaway = await Giftaway.findByIdAndUpdate(giftawayId, {
        $set:
            { consumerId: consumerId }
    }
        , {
            new: true,
            runValidators: true
        })
    res.status(201).json(giftaway)

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


module.exports = { fetchUnclaimedGiftaways, claimGiftaway, unclaimGiftaway, fetchUser }