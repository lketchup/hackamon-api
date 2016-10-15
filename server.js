var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/hackamon-api');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to (hackamon-api) Database...");
});

// Routes
require('./app/routes/students')(app);
require('./app/routes/classes')(app);
require('./app/routes/units')(app);

// Test Data
require('./app/db/seed')(app);

// Server
app.listen(3000);
console.log('Server running on port 3000...');
