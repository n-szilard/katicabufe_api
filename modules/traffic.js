const express = require('express');
const router = express.Router();
const pool = require('../utils/database')

// Get all traffic
router.get('/', (req, res) => {
    pool.query(`SELECT * FROM forgalom
                INNER JOIN kategoria ON kategoria.id = forgalom.kategoriaId`,
        (error, results) => {
            if (error) throw error;
            res.send(results)
        })
});

// Select one traffic by id
router.get('/:id', (req, res) => {
    let id = req.params.id;
    pool.query(`SELECT * FROM forgalom
        INNER JOIN kategoria ON kategoria.id = forgalom.kategoriaId
        WHERE forgalom.id=?`, [id], (error, results) => {
        if (error) return res.status(500).json({errno: error.errno, msg: 'Hiba történt az adatbázis lekérdezése közben.', error: error.message});
        res.send(results)
    })
});

// POST new traffic
router.post('/', (req, res) => {
    let {termek, vevo, kategoriaId, egyseg, nettoar, mennyiseg, kiadva} = req.body;
    pool.query(`INSERT INTO forgalom (termek, vevo, kategoriaId, egyseg, nettoar, mennyiseg, kiadva)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [termek, vevo, kategoriaId, egyseg, nettoar, mennyiseg, kiadva], (error, results) => {
        if (error) return res.status(500).json({errno: error.errno, msg: 'Hiba történt az adatbázis lekérdezése közben.', error: error.message});
        res.send(results)
    })
});

// Update traffic
router.patch('/:id', (req, res) => {
    let id = req.params.id;
    let {termek, vevo, kategoriaId, egyseg, nettoar, mennyiseg, kiadva} = req.body;
    pool.query(`UPDATE forgalom SET termek=?, vevo=?, kategoriaId=?, egyseg=?, nettoar=?, mennyiseg=?, kiadva=?
        WHERE forgalom.id=?`,
        [termek, vevo, kategoriaId, egyseg, nettoar, mennyiseg, kiadva, id], (error, results) => {
        if (error) return res.status(500).json({errno: error.errno, msg: 'Hiba történt az adatbázis lekérdezése közben.', error: error.message});
        res.send(results)
    })
});


// Delete traffic
router.delete('/:id', (req, res) => {
    let id = req.params.id;
    pool.query(`DELETE FROM forgalom WHERE id=?`, [id], (error, results) => {
        if (error) return res.status(500).json({errno: error.errno, msg: 'Hiba történt az adatbázis lekérdezése közben.', error: error.message});
        res.send(results)
    })
})


module.exports = router;