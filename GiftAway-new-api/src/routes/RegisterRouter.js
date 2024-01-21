const jwt = require('jsonwebtoken');
const User = require('../db/register.models'); // Assuming this exports a Mongoose model named "User"
const bcrypt = require('bcrypt'); 
const express = require('express')

const registerRouter = express.Router();

registerRouter.post("/", async (req, res) => {
    const { username, password, mail, phone, pickuplocation } = req.body;

    // Überprüfen, ob einer der Eingabewerte leer oder nur aus Leerzeichen besteht
    if ([username, password, mail, phone, pickuplocation ].some(item => !item || (typeof item === 'string' && item.trim() === ""))) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    
    try {
        // Überprüfen, ob der Benutzer bereits existiert
        const userExists = await User.findOne({ $or: [{ username }, { mail }] });
        if (userExists) {
            return res.status(409).json({ message: 'User already exists' });
        }

        // Verschlüsseln des Passworts
        const hashedPassword = await bcrypt.hash(password, 10);

        // Erstellen eines neuen Benutzers mit dem gehashten Passwort
        const user = await User.create({
            username,
            password: hashedPassword, 
            mail,
            phone,
            pickuplocation,
        });

        // Erstellen eines Access-Tokens
        const accessToken = await jwt.sign(
            { username, mail, phone },
            process.env.ACCESS_SECRET_KEY,
            { expiresIn: "22h" }
        );

        // Konfigurieren der Cookie-Optionen
        const cookieOption = {
            httpOnly: true,
            secure: true
        };

        // Senden einer Antwort mit Statuscode 201 (Created), Setzen eines Cookies und Zurücksenden der Benutzer-ID
        res.status(201).cookie("userId", user._id, cookieOption).json(user._id);
    } catch (error) {
        // Senden einer Antwort mit Statuscode 500 (Internal Server Error) im Fehlerfall
        res.status(500).json({ message: 'Error registering new user' });
    }
});

module.exports = registerRouter;
