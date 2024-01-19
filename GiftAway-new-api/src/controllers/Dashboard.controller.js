// Importieren der benötigten Module und Modelle
const { accessSync } = require('fs'); // Das 'fs'-Modul wird für Dateisystemzugriffe verwendet
const Giftaway = require('../db/giftAway.models'); // Das Giftaway-Modell wird importiert
const User = require('../db/register.models'); // Das User-Modell wird importiert
const ObjectId = require('mongodb'); // Das 'mongodb'-Modul wird importiert, um ObjectIds zu verwenden

// Funktion zum Abrufen eines Benutzers anhand seiner ID
const fetchUser = async (req, res) => {
    
    // Alle Benutzer werden aus der DB abgerufen
    const users = await User.find();

    // Der Benutzer wird anhand der übergebenen ID gefunden
    const user = users.filter(item => item.id.toString() == req.body.id);

    // Die Benutzerinformationen (phone, mail) werden in der response gesendet
    if (user.length > 0) {
        res.status(200).json({ mail: user[0].mail, phone: user[0].phone });
    } else {
        res.status(404).json({ message: "User not found" });
    }
}

// Funktion zum Abrufen unclaimed Giftaways
const fetchUnclaimedGiftaways = async (req, res) => {
    const userId = req.cookies.userId || req.body.userId; // Die Benutzer-ID wird aus den Cookies oder der Anfrage extrahiert
   
    // Alle Giftaways werden aus der Datenbank abgerufen
    const allGiftaways = await Giftaway.find();

    // Alle Benutzer werden aus der Datenbank abgerufen
    const allUsers = await User.find();

    // Unclaimed Giftaways werden gefiltert
    const unclaimedGiftaways = allGiftaways.filter(giftaway => !giftaway?.consumerId || !giftaway.consumerId.equals(userId));

    // Neue Informationen zu den beanspruchten Geschenken werden erstellt
    var newClaimedGiftaways = [];
    
    if(userId){
    // Claimed Giftaways werden gefiltert
    const claimedGiftaways = allGiftaways.filter(giftaway => giftaway?.consumerId && giftaway.consumerId.equals(userId));


    for (let item of claimedGiftaways) {

        if (item.consumerId == userId) {
            const consumerId = item.consumerId;
            const user = allUsers.find(u => u._id.equals(consumerId));

            if (user) {
                // Informationen zu den beanspruchten Geschenken werden hinzugefügt
                newClaimedGiftaways.push({
                    _id: item._id,
                    avatar: item.avatar,
                    title: item.title,
                    description: item.description,
                    phone: user.phone,
                    mail: user.mail
                });
            }
        }
    }
    }
    // Die unclaimed und claimed Giftaways werden in der response gesendet
    res.status(200).json({ "unclaimedGiftaways": unclaimedGiftaways, "claimedGiftaways": newClaimedGiftaways });
}

// Funktion zum claimen eines Giftaways
const claimGiftaway = async (req, res) => {
    const { giftawayId } = req.body;// Die Giftaway-ID wird aus der Anfrage extrahiert
    const consumerId = req.cookies.userId; // Die Benutzer-ID wird aus den Cookies extrahiert

    // Das Giftaway wird in der Datenbank aktualisiert, um den Benutzer als Claimer festzulegen
    const giftaway = await Giftaway.findByIdAndUpdate(giftawayId, {
        $set: { consumerId: consumerId }
    }, {
        new: true,
        runValidators: true
    });


    res.status(201).json(giftaway);
}

// Funktion zum unclaimen eines Giftaways
const unclaimGiftaway = async (req, res) => {
    const { giftawayId } = req.body; // Die Giftaway-ID wird aus der Anfrage extrahiert

    // Das Giftaway wird in der Datenbank aktualisiert, um den Benutzer als Claimer aufzuheben
    const giftaway = await Giftaway.findByIdAndUpdate(giftawayId, {
        $unset: { consumerId: 1 }
    }, {
        new: true
    });

    res.status(201).json('Updated successfully');
}

module.exports = { fetchUnclaimedGiftaways, claimGiftaway, unclaimGiftaway, fetchUser };
