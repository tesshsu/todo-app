// connection.js
var mysql = require('mysql');

function Connection() {
  this.pool = null;

  this.init = function() {
    this.pool = mysql.createPool({
      connectionLimit: 10,
      host:     process.env.DB_HOST,     // Use the environment variable
      user:     process.env.DB_USER,     // Use the environment variable
      password: process.env.DB_PASSWORD, // Use the environment variable
      database: process.env.DB_DATABASE  // Use the environment variable
    });
  };

  this.acquire = function(callback) {
    this.pool.getConnection(function(err, connection) {
      callback(err, connection);
    });
  };
}

module.exports = new Connection();
