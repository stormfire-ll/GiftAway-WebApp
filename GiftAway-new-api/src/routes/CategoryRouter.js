const express = require('express');
const Category = require('../db/category.model');


const categoryRouter = express.Router();

// Definieren einer POST-Route auf dem Category-Router
categoryRouter.post('/', async (req, res) => {
    // Extrahieren des 'name' aus dem Request-Body
    const { name } = req.body;

    // Überprüfen, ob eine Kategorie mit diesem Namen bereits existiert
    const categoryPresent = await Category.findOne({ name });

    // Wenn die Kategorie noch nicht existiert
    if (!categoryPresent) {
        // Erstellen einer neuen Kategorie mit dem angegebenen Namen
        const newCategory = await Category.create({
            categoryname: name
        });

        res.status(201).json('Category created successfully');
    } else {
        res.status(200).json('Category already present');
    }
});

module.exports = categoryRouter;
