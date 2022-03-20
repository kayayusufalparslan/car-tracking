const mysql = require('mysql');

// Connnection To DB For User Auth
const connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'test12345',
	database : 'userlogin'
});

module.exports = connection;