var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Database
var mongoose = require('mongoose');

var username = process.env.MONGO_USER
var password = process.env.MONGO_PASS

/*
mongoose.connect('mongodb://'+username+':'+password+'@ds061365.mlab.com:61365/rapdb');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to (hackamon-api) Database...");
});
*/

// -- local testing db

mongoose.connect('mongodb://localhost/hackamon-api');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to (hackamon-api) Database...LOCAL");
});

// -- local testing db


// Routes
require('./app/routes/login')(app);
require('./app/routes/students')(app);
require('./app/routes/classes')(app);
require('./app/routes/units')(app);
require('./app/routes/swapRequests')(app);
// Test Data
require('./app/db/seed')(app);

// Server
//app.listen(process.env.PORT);
app.listen(3000);
console.log('Server running on port 3000...');
