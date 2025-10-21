const express = require('express');
const router = express.Router();
const { query } = require('../utils/database')

// Get all traffic
router.get('/', (req, res) => {
    query(`SELECT * FROM forgalom
                INNER JOIN kategoria ON kategoria.id = forgalom.kategoriaId`, [],
        (error, results) => {
            if (error) throw error;
            res.send(results)
        }, req)
});

// Select one traffic by id
router.get('/:id', (req, res) => {
    let id = req.params.id;
    query(`SELECT * FROM forgalom
        INNER JOIN kategoria ON kategoria.id = forgalom.kategoriaId
        WHERE forgalom.id=?`, [id], (error, results) => {
        if (error) return res.status(500).json({ errno: error.errno, msg: 'Hiba történt az adatbázis lekérdezése közben.', error: error.message });
        res.send(results)
    }, req)
});

// POST new traffic
router.post('/', (req, res) => {
    let { termek, vevo, kategoriaId, egyseg, nettoar, mennyiseg, kiadva } = req.body;
    query(`INSERT INTO forgalom (termek, vevo, kategoriaId, egyseg, nettoar, mennyiseg, kiadva)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [termek, vevo, kategoriaId, egyseg, nettoar, mennyiseg, kiadva], (error, results) => {
            if (error) return res.status(500).json({ errno: error.errno, msg: 'Hiba történt az adatbázis lekérdezése közben.', error: error.message });
            res.send(results)
        }, req)
});

// Update traffic
router.patch('/:id', (req, res) => {
    let id = req.params.id;
    let { termek, vevo, kategoriaId, egyseg, nettoar, mennyiseg, kiadva } = req.body;
    query(`UPDATE forgalom SET termek=?, vevo=?, kategoriaId=?, egyseg=?, nettoar=?, mennyiseg=?, kiadva=?
        WHERE forgalom.id=?`,
        [termek, vevo, kategoriaId, egyseg, nettoar, mennyiseg, kiadva, id], (error, results) => {
            if (error) return res.status(500).json({ errno: error.errno, msg: 'Hiba történt az adatbázis lekérdezése közben.', error: error.message });
            res.send(results)
        }, req)
});


// Delete traffic
router.delete('/:id', (req, res) => {
    let id = req.params.id;
    query(`DELETE FROM forgalom WHERE id=?`, [id], (error, results) => {
        if (error) return res.status(500).json({ errno: error.errno, msg: 'Hiba történt az adatbázis lekérdezése közben.', error: error.message });
        res.send(results)
    }, req)
})


module.exports = router;