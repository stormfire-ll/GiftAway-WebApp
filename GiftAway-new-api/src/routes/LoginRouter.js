const express = require('express')
const User = require('../db/register.models')
const bcrypt = require('bcrypt')


const loginRouter = express.Router()

loginRouter.post('/', async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        throw new Error('Username or password is not provided');
    }
    const isUserPresent = await User.findOne({ username })

    if (!isUserPresent) {
        throw new Error('User does not exist')
    }
    
   
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