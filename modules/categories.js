const express = require('express');
const router = express.Router();
const pool = require('../utils/database')

// Select All categories
router.get('/', (req, res) => {
    pool.query('SELECT * FROM kategoria', (error, results) => {
        if (error) return res.status(500).json({errno: error.errno, msg: 'Hiba történt az adatbázis lekérdezése közben.', error: error.message});
        res.send(results)
    })
});

// Select one category by id
router.get('/:id', (req, res) => {
    let id = req.params.id;
    pool.query(`SELECT * FROM kategoria WHERE id=?`, [id], (error, results) => {
        if (error) return res.status(500).json({errno: error.errno, msg: 'Hiba történt az adatbázis lekérdezése közben.', error: error.message});
        res.send(results)
    })
});

// Post new category
router.post('/', (req, res) => {
    const { kategoriaNev } = req.body;
    pool.query(`INSERT INTO kategoria (kategoriaNev) VALUES (?)`,[kategoriaNev], (error, results) => {
        if (error) return res.status(500).json({errno: error.errno, msg: 'Hiba történt az adatbázis lekérdezése közben.', error: error.message});
        res.send(results)
    })
});

// Update category
router.patch('/:id', (req, res) => {
    let id = req.params.id;
    const { kategoriaNev } = req.body;
    pool.query(`UPDATE kategoria SET kategoriaNev=? WHERE id=?`, [kategoriaNev, id],(error, results) => {
        if (error) return res.status(500).json({errno: error.errno, msg: 'Hiba történt az adatbázis lekérdezése közben.', error: error.message});
        res.send(results);
    })
}); 
 
// Delete category
router.delete('/:id' , (req, res) => {
    let id = req.params.id;
    pool.query(`DELETE FROM kategoria WHERE id=?`, [id] , (error, results) => {
        if (error) return res.status(500).json({errno: error.errno, msg: 'Hiba történt az adatbázis lekérdezése közben.', error: error.message});
        res.send(results)
    })
});


module.exports = router;