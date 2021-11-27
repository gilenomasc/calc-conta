
const mysql = require('mysql2');
const db = mysql.createConnection({
    host: 'us-cdbr-east-04.cleardb.com',
    user: 'b7c6317eab1cef',
    password: '796f7a47',
    port: 3306,
    database: 'heroku_7b2ad30fa60e245',
    multipleStatements: true
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Conectado ao MySQL');
});

global.db = db;

module.exports = db;