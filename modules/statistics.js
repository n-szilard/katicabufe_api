const express = require('express');
const router = express.Router();
const {query} = require('../utils/database');

// GET customerscount, productsCount -> sales
// hany vendeg volt, hany fajta termek, abbol mennyi lett eladva, arak summa

// SELECT COUNT(DISTINCT vevo) AS 'customersCount', COUNT(DISTINCT termek) AS 'productsCount', SUM(nettoar*mennyiseg) as `priceSum` FROM forgalom WHERE 1;
// SELECT termek, sum(mennyiseg) as 'count', sum(nettoar*mennyiseg) as 'price' FROM forgalom WHERE 1 GROUP BY termek; 

router.get('/', (req, res) => {
    query(`SELECT COUNT(DISTINCT vevo) AS 'customersCount', COUNT(DISTINCT termek) AS 'productsCount', SUM(nettoar*mennyiseg) as 'priceSum', SUM(mennyiseg) as salesSum FROM forgalom`, [] ,(error, sumResults) => {
        if (error) return res.status(500).json({errno: error.errno, msg: 'Hiba történt az adatbázis lekérdezése közben.', error: error.message});
        query(`SELECT termek, sum(mennyiseg) as 'count', sum(nettoar*mennyiseg) as 'price' FROM forgalom WHERE 1 GROUP BY termek;`, [] ,(error, productResults) => {
            sumResults = JSON.parse(JSON.stringify(sumResults))
            let vegeredmeny = {
                "usersCount": sumResults[0].customersCount,
                "productsCount": sumResults[0].productsCount,
                "salesSum": sumResults[0].salesSum,
                "priceSum": sumResults[0].priceSum,
                "products": productResults
            }
            res.send(vegeredmeny)
        }, req)
    
    }, req)
})

module.exports = router;