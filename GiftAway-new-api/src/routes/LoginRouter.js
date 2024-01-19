const express = require('express')
const User = require('../db/register.models')
const bcrypt = require('bcrypt')


const loginRouter = express.Router()

// POST: User Login
loginRouter.post('/', async (req, res) => {
    const { username, password } = req.body

    // Fill out all fields
    if (!username || !password) {
        throw new Error('Username or password is not provided');
    }

    // Check DB for existing User
    const isUserPresent = await User.findOne({ username })
    if (!isUserPresent) {
        throw new Error('User does not exist')
    }
    
    // Check DB: if PW correct
    const isPasswordCorrect = await bcrypt.compare(password, isUserPresent.password)
    if (!isPasswordCorrect) {
        throw new Error('Password is not correct')
    }

     const cookieOption = {
        httpOnly: true,
        secure: true
    } 
    res.status(200).cookie("userId", isUserPresent._id, cookieOption).json(isUserPresent._id)
    
})

module.exports = loginRouter 