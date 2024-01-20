const cloudinary = require('cloudinary').v2; // Das 'cloudinary'-Modul wird importiert, um Bilder zu verarbeiten
const uploadOnCloudinary = require("../utils/cloudinary"); // Funktion zum Hochladen von Bildern auf Cloudinary
const Giftaway = require('../db/giftAway.models'); 
const Category = require('../db/category.model'); 

// Funktion zum Erstellen eines Giftaways
const createGiftaway = async (req, res) => {
    const publisherId = req.cookies.userId; // Die Benutzer-ID des Erstellers wird aus den Cookies extrahiert

    const { title, description, categoryName } = req.body; // Daten des  Giftaways werden aus der Anfrage extrahiert
    console.log(req.files); 
    const avatar = req.files.image[0].path; // Der Dateipfad des Avatar-Bilds wird aus der Anfrage extrahiert

    // Überprüfung, ob erforderliche Felder (Titel und Beschreibung) ausgefüllt sind
    if ([title, description].some(item => !item || (typeof item === 'string' && item.trim() === ""))) {
        return res.status(400).json({ message: 'Alle Felder sind erforderlich' });
    }

    // Hochladen des Avatar-Bilds auf Cloudinary und Abrufen des Bild-URLs
    const avatarObject = await uploadOnCloudinary(avatar)
    const avatarPath = avatarObject.url

    // Überprüfung, ob ein  Giftaway mit dem gleichen Titel und der gleichen Beschreibung bereits existiert
    const giftawayPresent = await Giftaway.findOne({ $and: [{ title }, { description }] })

    // Alle Kategorien werden aus der Datenbank abgerufen
    const categories = await Category.find()

    let categoryId = null

    // Ermitteln der Kategorie-ID anhand des Kategorienamens
    for (let category of categories) {
        if (category.categoryname === categoryName) {
            categoryId = category._id;
            break;
        }
    }

    // Wenn das  Giftaway noch nicht existiert, wird es erstellt
    if (!giftawayPresent) {
        const createdGiftaway = await Giftaway.create({ avatar: avatarPath, title, description, categoryId, publisherId })
        res.status(201).json({ createdGiftaway });
    } else {
        res.status(200).json('Geschenk existiert bereits');
    }
}

// Funktion zum Löschen eines  Giftaways
const deleteGiftaway = async (req, res) => {
    const giftawayId = req.query.giftawayId; // Die  Giftaway-ID wird aus der Anfrage extrahiert

    try {
        const result = await Giftaway.deleteOne({ _id: giftawayId });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Geschenk nicht gefunden' });
        }
        res.status(200).json('Erfolgreich gelöscht');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Funktion zum Abrufen der  Giftaways eines bestimmten Benutzers
const getGiftaways = async (req, res) => {
    const userId = req.cookies["userId"]; // Die Benutzer-ID wird aus den Cookies extrahiert

    const allGiftaways = await Giftaway.find(); // Alle  Giftaways werden aus der Datenbank abgerufen

    const myGiftaways = [];
    for (giftaway of allGiftaways) {
        if (giftaway.publisherId == userId) {
            myGiftaways.push(giftaway);
        }
    }

    res.status(200).json({ giftaways: myGiftaways });
}

const editGiftAways = async (req, res) => {
    try {
        const { title, description, categoryName, _id } = req.body;
        const giftawayPresent = await Giftaway.findOne({ _id });

        if (!giftawayPresent) {
            // Check if avatar is present in the request before trying to upload to Cloudinary
            const avatar = req.files?.image && req.files.image[0].path;

            // Upload avatar to Cloudinary if present in the request
            const avatarPath = avatar ? (await uploadOnCloudinary(avatar)).url : undefined;

            const updatedFields = {
                ...(title && { title }),
                ...(description && { description }),
                ...(avatarPath && { avatar: avatarPath }),
                ...(categoryName && { categoryName }),
            };

            const updatedGiftaway = await Giftaway.findOneAndUpdate({ _id }, updatedFields, { new: true });

            res.status(200).json({ updatedGiftaway });
        } else {
            res.status(404).json({ message: 'Giftaway not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { createGiftaway, deleteGiftaway, getGiftaways, editGiftAways };
