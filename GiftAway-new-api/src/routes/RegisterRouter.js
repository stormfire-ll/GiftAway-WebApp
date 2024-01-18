const express = require('express');
const User = require('../db/register.models'); // Assuming this exports a Mongoose model named "User"
const bcrypt = require('bcrypt'); // You will need to install bcrypt if not already done

const jwt = require('jsonwebtoken')

const registerRouter = express.Router();



registerRouter.post("/", async (req, res) => {
    const { username, password, mail, phone } = req.body;

    // Trim the inputs and check if any are empty
    if ([username, password, mail, phone].some(item => !item || (typeof item === 'string' && item.trim() === ""))) {
        return res.status(400).json({ message: 'All fields are required' });

        throw new Error()
    }
    
    try {
        // Check if the user already exists
        const userExists = await User.findOne({ $or: [{ username }, { mail }] });
        if (userExists) {
            return res.status(409).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new user
        const user = await User.create({
            username,
            password: hashedPassword, // Save the hashed password
            mail,
            phone
        });

        const accessToken = await jwt.sign({ username, mail, phone }
            ,
            process.env.ACCESS_SECRET_KEY,
            {
                expiresIn: "22h"
            }
        )


        const cookieOption = {
            httpOnly: true,
            secure: true
        }

        res.status(201).cookie("userId", user._id, cookieOption).json(user._id);
    } catch (error) {

        res.status(500).json({ message: 'Error registering new user' });
    }
});
module.exports = registerRouter;
