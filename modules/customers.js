const express = require('express');
const router = express.Router();
const {query} = require('../utils/database');


// get vevok
router.get('/', (req, res) => {
    query('SELECT * FROM vevo', [], (error, results) => {
        if (error) throw error;
        res.send(results);
    }, req)
})

// post vevo
router.post('/', (req, res) => {
    let {nev} = req.body;
    query('INSERT INTO `vevo` (`nev`) VALUES (?)', [nev] ,(error, results) => {
        if (error) throw error;
        res.send(results);
    }, req)
})

// get vevo by id
router.get('/:id', (req, res) => {
    let id = req.params.id;
    query('SELECT * FROM vevo WHERE id=?', [id] , (error, results) => {
        if (error) throw error;
        res.send(results);
    }, req)
})

// delete vevo
router.delete('/:id', (req, res) => {
    let id = req.params.id;
    query('DELETE FROM vevo WHERE id=?', [id] , (error, results) => {
        if (error) throw error;
        res.send(results);
    }, req)
})

// patch vevo
router.patch('/:id', (req, res) => {
    let id = req.params.id;
    let {nev} = req.body;
    query('UPDATE `vevo` SET `nev`=? WHERE id=?', [nev, id] , (error, results) => {
        if (error) throw error;
        res.send(results);
    }, req)
})


module.exports = router;