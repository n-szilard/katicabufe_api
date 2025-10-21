const express = require('express');
const router = express.Router();
const {query} = require('../utils/database')

// Select All categories
router.get('/', (req, res) => {
    query('SELECT * FROM kategoria', [],(error, results) => {
        if (error) return res.status(500).json({errno: error.errno, msg: 'Hiba történt az adatbázis lekérdezése közben.', error: error.message});
        res.send(results)
    }, req)
});

// Select one category by id
router.get('/:id', (req, res) => {
    let id = req.params.id;
    query(`SELECT * FROM kategoria WHERE id=?`, [id], (error, results) => {
        if (error) return res.status(500).json({errno: error.errno, msg: 'Hiba történt az adatbázis lekérdezése közben.', error: error.message});
        res.send(results)
    }, req)
});

// Post new category
router.post('/', (req, res) => {
    const { kategoriaNev } = req.body;
    query(`INSERT INTO kategoria (kategoriaNev) VALUES (?)`,[kategoriaNev], (error, results) => {
        if (error) return res.status(500).json({errno: error.errno, msg: 'Hiba történt az adatbázis lekérdezése közben.', error: error.message});
        res.send(results)
    }, req)
});

// Update category
router.patch('/:id', (req, res) => {
    let id = req.params.id;
    const { kategoriaNev } = req.body;
    query(`UPDATE kategoria SET kategoriaNev=? WHERE id=?`, [kategoriaNev, id],(error, results) => {
        if (error) return res.status(500).json({errno: error.errno, msg: 'Hiba történt az adatbázis lekérdezése közben.', error: error.message});
        res.send(results);
    }, req)
}); 
 
// Delete category
router.delete('/:id' , (req, res) => {
    let id = req.params.id;
    query(`DELETE FROM kategoria WHERE id=?`, [id] , (error, results) => {
        if (error) return res.status(500).json({errno: error.errno, msg: 'Hiba történt az adatbázis lekérdezése közben.', error: error.message});
        res.send(results)
    }, req)
});


module.exports = router;