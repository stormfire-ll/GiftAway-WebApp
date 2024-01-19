const express = require('express');
const User = require('../db/register.models');
// Importieren des bcrypt-Moduls für Passwort-Verschlüsselung
const bcrypt = require('bcrypt');

const loginRouter = express.Router();

// Definieren einer POST-Route auf dem Login-Router
loginRouter.post('/', async (req, res) => {
    // Extrahieren von Benutzername und Passwort aus dem Request-Body
    const { username, password } = req.body;

    // Überprüfen, ob Benutzername und Passwort im Request-Body vorhanden sind
    if (!username || !password) {
        return res.status(400).json({ message: 'Username or password is not provided' });
    }

    try{
    // Überprüfen, ob ein Benutzer mit dem angegebenen Benutzernamen existiert
    const isUserPresent = await User.findOne({ username });

    // Wenn kein Benutzer gefunden wird, wird eine Fehlermeldung geworfen
    if (!isUserPresent) {
        return res.status(404).json({ message: 'User does not exist' });
    }

    // Überprüfen, ob das eingegebene Passwort mit dem gespeicherten Passwort übereinstimmt
    const isPasswordCorrect = await bcrypt.compare(password, isUserPresent.password);

    // Wenn das Passwort nicht korrekt ist, wird eine Fehlermeldung geworfen
    if (!isPasswordCorrect) {
        return res.status(401).json({ message: 'Password is not correct' });
    }

    // Konfiguration der Cookie-Optionen
    const cookieOption = {
        httpOnly: true, // Cookie ist nur über HTTP zugänglich, nicht über Client-Skripte
        secure: true    // Cookie wird nur über sichere Verbindungen gesendet
    }; 

    // Senden einer Antwort mit Statuscode 200 (OK), Setzen eines Cookies und Zurücksenden der Benutzer-ID
    res.status(200).cookie("userId", isUserPresent._id, cookieOption).json({ message: "Login successful", userId: isUserPresent._id });
}catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while logging in' });
}});

module.exports = loginRouter;
