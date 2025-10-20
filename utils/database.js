var mysql = require('mysql');
const logger = require('./logger');

var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: '13a_katicabufe'
});

pool.on('acquire', function (connection) {
    logger.info(`Connection ${connection.threadId} acquired`);
});

pool.on('connection', function (connection) {
    logger.info(`Connection ${connection.threadId} connected`)
});

pool.on('enqueue', function () {
    logger.info('Waiting for available connection slot');
});

pool.on('release', function (connection) {
    logger.info(`Connection ${connection.threadId} released`);
});

module.exports = pool;