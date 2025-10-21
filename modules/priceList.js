const express = require('express');
const router = express.Router();
const pool = require('../utils/database');

router.get('/', (req, res) => {
    let vegeredmeny = [];
    pool.query('SELECT * FROM kategoria', (error, catResults) => {
        pool.query('SELECT * from termek', (error, prodResults) => {
            catResults = JSON.parse(JSON.stringify(catResults));
            prodResults = JSON.parse(JSON.stringify(prodResults));
            console.log(catResults);
            console.log(prodResults)

            catResults.forEach(category => {
                stimmtermekek = []
                prodResults.forEach(product => {
                    if (category.id == product.kategoriaId) {
                        stimmtermekek.push({
                            termekNev: product.termekNev,
                            termekAr: product.nettoAr
                        })
                    }
                })
                vegeredmeny.push({
                    kategoria: category.kategoriaNev,
                    termekek: stimmtermekek
                })
            });
            res.send(vegeredmeny)
        })
        if (error) return res.status(500).json({errno: error.errno, msg: 'Hiba történt az adatbázis lekérdezése közben.', error: error.message});
    })
});

module.exports = router;