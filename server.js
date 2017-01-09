var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Database
var mongoose = require('mongoose');

var username = process.env.MONGO_USER
var password = process.env.MONGO_PASS


mongoose.connect('mongodb://'+username+':'+password+'@ds061365.mlab.com:61365/rapdb');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to (hackamon-api) Database...");
});

/*
// -- local testing db
mongoose.connect('mongodb://localhost/hackamon-api');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to (hackamon-api) Database...LOCAL");
});
// -- local testing db
*/

// Routes
require('./app/routes/swapRequests')(app);
// Test Data

// Server
app.listen(process.env.PORT);
//app.listen(3000); // pats bad 
console.log('Server running on port 3000...');


app.get('/', function(req, res) {
    res.json({"ReAllocatePlus":"API"})
});

