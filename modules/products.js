const express = require('express');
const router = express.Router();
const pool = require('../utils/database')

// termekek lista lekeres
router.get('/', (req, res) => {
    pool.query('SELECT termek.id, `termekNev`,`nettoAr`,`egyseg`,`kategoriaId`, kategoria.kategoriaNev FROM `termek` INNER JOIN kategoria ON termek.kategoriaId = kategoria.id',  (error, results) => {
        if (error) throw error;
        res.send(results);
    })
})

router.post('/', (req, res) => {
    const {termekNev, nettoAr, egyseg, kategoriaId} = req.body;
    pool.query("INSERT INTO `termek`(`termekNev`, `nettoAr`, `egyseg`, `kategoriaId`) VALUES (?,?,?,?)",[termekNev, nettoAr, egyseg, kategoriaId], (error, results) => {
        if (error) return res.status(500).json({errno: error.errno, msg: 'Hiba történt az adatbázis lekérdezése közben.', error: error.message});
        res.send(results)
    })
})

// get product by id
router.get('/:id', (req, res) => {
    let id = req.params.id;
    pool.query(`SELECT * FROM termek WHERE id=?`, [id], (error, results) => {
        if (error) return res.status(500).json({errno: error.errno, msg: 'Hiba történt az adatbázis lekérdezése közben.', error: error.message});
        res.send(results)
    })
})

// delete product by id
router.delete('/:id', (req, res) => {
    let id = req.params.id;
    pool.query('DELETE FROM termek WHERE id = ?', [id], (error, results) => {
        if (error) throw error;
        res.send(results);
    })
})

// patch product by id
router.patch('/:id', (req, res) => {
    let id = req.params.id;
    const {termekNev, nettoAr, egyseg, kategoriaId} = req.body;
    pool.query("UPDATE `termek` SET `termekNev`=?,`nettoAr`=?,`egyseg`=?,`kategoriaId`=? WHERE id = ?", [termekNev, nettoAr, egyseg, kategoriaId, id],(error, results) => {
        if (error) return res.status(500).json({errno: error.errno, msg: 'Hiba történt az adatbázis lekérdezése közben.', error: error.message});
        res.send(results);
    })
})


module.exports = router;