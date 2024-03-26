const mysql = require('mysql2');

const db = mysql.createConnection({
   user: 'root',
   host: 'localhost',
   password: 'Boothman',
   database: 'RestaurantApp'
});

module.exports = db