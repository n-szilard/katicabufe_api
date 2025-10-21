var mysql = require('mysql');
const logger = require('./logger');

var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: '13a_katicabufe'
});

/* pool.on('acquire', function (connection) {
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
}); */

function query(sql, params = [], callback, req = '') {
    const start = Date.now();

    const context = req ? `${req.method} ${req.originalUrl}` : 'NO CONTEXT'
    const txt = req.method == 'GET' ? 'sent' : 'affected'

    pool.query(sql, params, (error, results) => {
        if (process.env.DEBUG == 1) {
            const duration = Date.now() - start;
            if (error) {
                logger.error(`[DB Error] ${error.message}`)
            } else {
                const count = Array.isArray(results) ? results.length : results.affectedRows;
                logger.info(`${context} - ${count} record(s) ${txt}. | ${duration} ms`);
            }
        }

        if (callback) callback(error, results)
    });
}

module.exports = { query };