// connection.js
const mysql = require('mysql');

function Connection() {
  this.pool = null;

  this.init = function() {
    console.log('Initializing DB connection with env vars:', {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      database: process.env.DB_DATABASE,
      passwordSet: !!process.env.DB_PASSWORD
    });

    this.pool = mysql.createPool({
      connectionLimit: 10,
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      acquireTimeout: 60000,
      timeout: 60000,
      reconnect: true,
      // Ajout d'options pour déboguer les problèmes de connexion
      debug: false,
      multipleStatements: false,
      // Désactiver SSL pour l'instant si c'est un problème
      ssl: false
    });

    // Gestionnaire d'erreurs pour le pool
    this.pool.on('connection', function(connection) {
      console.log('New connection established as id ' + connection.threadId);
    });

    this.pool.on('error', function(err) {
      console.error('Database pool error:', err);
      if(err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.log('Database connection was closed.');
      }
      if(err.code === 'ER_CON_COUNT_ERROR') {
        console.log('Database has too many connections.');
      }
      if(err.code === 'ECONNREFUSED') {
        console.log('Database connection was refused.');
      }
    });
  };

  this.acquire = function(callback) {
    if (!this.pool) {
      console.error('Connection pool not initialized');
      callback(new Error('Connection pool not initialized'), null);
      return;
    }

    this.pool.getConnection(function(err, connection) {
      if (err) {
        console.error('Error acquiring connection from pool:', {
          code: err.code,
          errno: err.errno,
          sqlMessage: err.sqlMessage,
          sqlState: err.sqlState
        });
        callback(err, null);
        return;
      }
      
      console.log('Successfully acquired connection from pool');
      callback(null, connection);
    });
  };
}

module.exports = new Connection();
