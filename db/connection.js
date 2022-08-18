const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: "localhost",
    database: "company_db",
    user: "root",
    password: "Superfoxgarfmode22!"
});

module.exports = connection