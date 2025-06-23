// connection.js
const mysql = require('mysql');
const { SecretsManagerClient, GetSecretValueCommand } = require('@aws-sdk/client-secrets-manager');

// Initialize Secrets Manager client
const client = new SecretsManagerClient({ region: process.env.AWS_REGION });

async function getDbCredentials() {
  try {
    const command = new GetSecretValueCommand({
      SecretId: process.env.SECRET_NAME,
    });
    const data = await client.send(command);
    return JSON.parse(data.SecretString);
  } catch (error) {
    console.error('Error retrieving secret:', error);
    throw error;
  }
}

function Connection() {
  this.pool = null;

  this.init = async function() {
    const credentials = await getDbCredentials();
    this.pool = mysql.createPool({
      connectionLimit: 10,
      host: credentials.host || process.env.DB_HOST, // Fallback to env if not in secret
      user: credentials.username,
      password: credentials.password,
      database: credentials.database,
      ssl: { rejectUnauthorized: true } // Enforce SSL for HIPAA
    });
  };

  this.acquire = function(callback) {
    this.pool.getConnection(function(err, connection) {
      callback(err, connection);
    });
  };
}

module.exports = new Connection();