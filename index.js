const express = require('express');
const fs = require('fs');
const cors = require('cors');
const dotenv = require('dotenv').config();
const logger = require('./utils/logger')

const categories = require('./modules/categories')
const traffic = require('./modules/traffic')
const statisticsRoutes = require('./modules/statistics')
const productRoutes = require('./modules/products')
const customerRoutes = require('./modules/customers')


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/categories', categories);
app.use('/traffic', traffic);
app.use('/statistics', statisticsRoutes);
app.use('/products', productRoutes);
app.use('/customers', customerRoutes);

app.get('/', (req, res) => {
    res.send('Nagyapáti Szilárd 13.A katica api');
});

app.listen(process.env.PORT, () => {
    logger.info('Server listening on http://localhost:' + process.env.PORT)
})