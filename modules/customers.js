const express = require('express');
const router = express.Router();
const pool = require('../utils/database');


// get vevok
router.get('/', (req, res) => {
    pool.query('SELECT * FROM vevo',  (error, results) => {
        if (error) throw error;
        res.send(results);
    })
})

// delete vevo
router.delete('/:id', (req, res) => {
    let id = req.params.id;
    pool.query('DELETE FROM vevo WHERE id=?', [id] , (error, results) => {
        if (error) throw error;
        res.send(results);
    })
})

// patch vevo
router.patch('/:id', (req, res) => {
    let id = req.params.id;
    let ujNev = req.body.ujNev;
    pool.query('UPDATE `vevo` SET `nev`=? WHERE id=?', [ujNev, id] , (error, results) => {
        if (error) throw error;
        res.send(results);
    })
})


module.exports = router;