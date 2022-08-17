const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Superfoxgarfmode22!",
    database: "company_db"
});

connection.connect(err => {
    if(err) throw(err)
});

module.exports = connection