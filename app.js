// app.js

// === THIS IS THE CORRECT PLACE FOR DOTENV ===
// Load environment variables before anything else happens.
if (process.env.NODE_ENV === 'production') {
  require('dotenv').config({ path: '.env.production' });
} else {
  require('dotenv').config({ path: '.env.local' });
}

// Now, the rest of your application can start
var express = require('express');
var bodyparser = require('body-parser');
var connection = require('./connection'); // <-- This now runs AFTER .env is loaded
var routes = require('./routes');

var app = express();
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

connection.init();
routes.configure(app);

var server = app.listen(8000, function() {
  console.log('Server listening on port ' + server.address().port);
});
