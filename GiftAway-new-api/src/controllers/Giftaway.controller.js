const cloudinary = require('cloudinary').v2; // Das 'cloudinary'-Modul wird importiert, um Bilder zu verarbeiten
const uploadOnCloudinary = require("../utils/cloudinary"); // Funktion zum Hochladen von Bildern auf Cloudinary
const Giftaway = require('../db/giftAway.models'); 
const Category = require('../db/category.model'); 
const User = require('../db/register.models');

// Funktion zum Erstellen eines Giftaways
const createGiftaway = async (req, res) => {
    const publisherId = req.cookies.userId; // Die Benutzer-ID des Erstellers wird aus den Cookies extrahiert

    const { title, description, categoryName, pickUpLocation } = req.body; // Daten des  Giftaways werden aus der Anfrage extrahiert
    console.log(req.files); 
    const avatar = req.files.image[0].path; // Der Dateipfad des Avatar-Bilds wird aus der Anfrage extrahiert

    // Überprüfung, ob erforderliche Felder (Titel und Beschreibung) ausgefüllt sind
    if ([title, description].some(item => !item || (typeof item === 'string' && item.trim() === ""))) {
        return res.status(400).json({ message: 'All fields are required' });
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
        const createdGiftaway = await Giftaway.create({ avatar: avatarPath, title, description, categoryId, publisherId, pickUpLocation })
        console.log("Newly Created Giftaway:",createdGiftaway)
        res.status(201).json({ createdGiftaway });
    } else {
        res.status(200).json('Giftaway exists');
    }
}

// Funktion zum Löschen eines  Giftaways
const deleteGiftaway = async (req, res) => {
    const giftawayId = req.query.giftawayId; // Die  Giftaway-ID wird aus der Anfrage extrahiert

    try {
        const result = await Giftaway.deleteOne({ _id: giftawayId });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Giftaway not found' });
        }
        res.status(200).json('Deleted successfully');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// const getGiftaways = async (req, res) => {
//     const userId = req.cookies.userId; // Die Benutzer-ID wird aus den Cookies extrahiert

//     const myGiftaways = await Giftaway.aggregate([
//         {
//             $match: { publisherId: userId }
//         },
//         {
//             $lookup: {
//                 from: 'Users',
//                 localField: 'publisherId',
//                 foreignField: '_id',
//                 as: 'userDetails'
//             }
//         },
//         {
//             $unwind: '$userDetails'
//         },
//         {
//             $project: {
//                 // Include all fields from Giftaway schema
//                 avatar: 1,
//                 title: 1,
//                 description: 1,
//                 categoryId: 1,
//                 consumerId: 1,
//                 publisherId: 1,
//                 pickUpLocation: '$userDetails.pickUpLocation'
//                 // Add other fields you need from the Giftaway model
//             }
//         }
//     ]);

//     res.status(200).json({ giftaways: myGiftaways });
// };
// Funktion zum Abrufen der  Giftaways eines bestimmten Benutzers

const userpickuplocation = async (req, res) => {
    const userId = req.cookies.userId;

    try {
        const user = await User.findById(userId, 'pickUpLocation'); // Fetch only the pickUpLocation field

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ pickUpLocation: user.pickUpLocation }); 
    } catch (error) {
        console.error('Error fetching user pickUpLocation:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getGiftaways = async (req, res) => {
    const userId = req.cookies.userId // Die Benutzer-ID wird aus den Cookies extrahiert

    const allGiftaways = await Giftaway.find(); // Alle  Giftaways werden aus der Datenbank abgerufen

    const myGiftaways = [];

    if(userId){

    for (giftaway of allGiftaways) {
        if (giftaway.publisherId == userId) {
            myGiftaways.push(giftaway);
        }
    }

    res.status(200).json({ giftaways: myGiftaways });
}
else {
    res.status(200).json({ giftaways: myGiftaways })
}
}



module.exports = { createGiftaway, deleteGiftaway, getGiftaways, userpickuplocation };
