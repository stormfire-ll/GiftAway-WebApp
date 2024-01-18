const express = require('express');
const {fetchUnclaimedGiftaways, claimGiftaway, unclaimGiftaway} = require('../controllers/Dashboard.controller')



const dashboardRouter = express.Router()

dashboardRouter.get('/', fetchUnclaimedGiftaways)

dashboardRouter.patch('/claimit', claimGiftaway)
dashboardRouter.patch('/unclaimit', unclaimGiftaway)


module.exports = dashboardRouter