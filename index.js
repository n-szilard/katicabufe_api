const express = require('express');
const fs = require('fs');
const cors = require('cors');

const categories = require('./modules/categories')
const traffic = require('./modules/traffic')



const app = express();

var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: '13a_katicabufe'
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/categories', categories);
app.use('/traffic', traffic);


app.get('/', (req, res) => {
    res.send('Nagyapáti Szilárd 13.A időjárás api');
});

app.get('/kategories', (req, res) => {
    pool.query('SELECT * FROM kategoria', (error, results) => {
        if (error) throw error;
        res.send(results)
    })
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