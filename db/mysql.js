var mysql = require('mysql')
module.exports = mysql.createPool({
    connectionLimit: 10,
    host     : 'localhost',
    user     : 'root',
    password : 'gvt123',
    database : 'Apparel_Store'
});
