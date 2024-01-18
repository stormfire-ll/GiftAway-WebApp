const express = require('express');
const {fetchUnclaimedGiftaways, claimGiftaway, unclaimGiftaway, fetchUser} = require('../controllers/Dashboard.controller')



const dashboardRouter = express.Router()

dashboardRouter.get('/', fetchUnclaimedGiftaways)
dashboardRouter.post('/getuser', fetchUser)

dashboardRouter.patch('/claimit', claimGiftaway)
dashboardRouter.patch('/unclaimit', unclaimGiftaway)


module.exports = dashboardRouter