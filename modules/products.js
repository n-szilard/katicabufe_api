const express = require('express');
const router = express.Router();
const pool = require('../utils/database')

// termekek lista lekeres
router.get('/', (req, res) => {
    pool.query('SELECT DISTINCT termek, nettoar, egyseg, kategoria.kategoriaNev FROM `forgalom` INNER JOIN kategoria ON kategoria.id = forgalom.kategoriaId',  (error, results) => {
        if (error) throw error;
        res.send(results);
    })
})


module.exports = router;