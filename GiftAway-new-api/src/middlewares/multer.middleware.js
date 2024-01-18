// Importieren des Multer-Moduls für den Datei-Upload
const multer = require('multer');

// Konfiguration des Speicherorts und Dateinamens für hochgeladene Dateien
const storage = multer.diskStorage({
    // Funktion zur Definition des Zielverzeichnisses für hochgeladene Dateien
    destination: function (req, res, cb) {
        // Setzt den Zielordner auf './public/temp'
        cb(null, './public/temp');
    },
    // Funktion zur Definition des Dateinamens für hochgeladene Dateien
    filename: function(req, file, cb) {
        // Verwendet den ursprünglichen Dateinamen als Speichername
        cb(null, file.originalname);
    }
});

// Exportieren der konfigurierten Multer-Instanz für die Verwendung in anderen Teilen der Anwendung
module.exports = multer({storage});
