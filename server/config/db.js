const mysql = require('mysql');

const db = mysql.createConnection({
   user: 'root',
   host: 'local',
   password: 'Boothman',
   database: 'RestaurantApp'
});

module.exports = db