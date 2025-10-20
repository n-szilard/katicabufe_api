const express = require('express');
const fs = require('fs');
const cors = require('cors');

const categories = require('./modules/categories')
const traffic = require('./modules/traffic')
const statisticsRoutes = require('./modules/statistics')
const productRoutes = require('./modules/products')

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/categories', categories);
app.use('/traffic', traffic);
app.use('/statistics', statisticsRoutes);
app.use('/products', productRoutes)


app.get('/', (req, res) => {
    res.send('Nagyapáti Szilárd 13.A időjárás api');
});


app.listen(3000, () => {
    console.log('Server listening on http://localhost:3000');
})