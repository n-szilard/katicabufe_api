const express = require('express');
const fs = require('fs');
const cors = require('cors');

const categories = require('./modules/categories')
const traffic = require('./modules/traffic')

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/categories', categories);
app.use('/traffic', traffic);


app.get('/', (req, res) => {
    res.send('Nagyapáti Szilárd 13.A időjárás api');
});

app.get('/traffic', (req, res) => {
    pool.query(`SELECT * FROM forgalom
                INNER JOIN kategoria ON kategoria.id = forgalom.kategoriaId`,
        (error, results) => {
            if (error) throw error;
            res.send(results)
        })
});


app.listen(3000, () => {
    console.log('Server listening on http://localhost:3000');
})