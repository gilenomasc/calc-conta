
const mysql = require('mysql2');

let db;

const db_config = {
    host: 'us-cdbr-east-04.cleardb.com',
    user: 'b7c6317eab1cef',
    password: '796f7a47',
    port: 3306,
    database: 'heroku_7b2ad30fa60e245',
    multipleStatements: true
};

   db = mysql.createPool(db_config);
  
console.log("Essa merda de merda");

global.db = db;

module.exports = db;