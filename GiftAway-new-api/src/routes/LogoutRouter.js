const express = require('express');

const logoutRouter = express.Router()


logoutRouter.post('/', async (req, res) => {

    const userId = req.cookies?.userId

    if (!userId) {
        res.status(200).json('User not present')
    }
    else {
        res.status(200).clearCookie("userId").json('User logged out')
    }
})

module.exports = logoutRouter