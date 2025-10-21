const express = require('express');
const router = express.Router();
const {query} = require('../utils/database');

router.get('/', (req, res) => {
    let vegeredmeny = [];
    query('SELECT * FROM kategoria', [],(error, catResults) => {
        query('SELECT * from termek', [],(error, prodResults) => {
            catResults = JSON.parse(JSON.stringify(catResults));
            prodResults = JSON.parse(JSON.stringify(prodResults));

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
        }, req)
        if (error) return res.status(500).json({errno: error.errno, msg: 'Hiba történt az adatbázis lekérdezése közben.', error: error.message});
    }, req)
});

module.exports = router;