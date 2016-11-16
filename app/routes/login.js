var Student = require('../models/student');

module.exports = function(app) {

    // Return Student with uuid
    app.get('/login', function(req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        var username = req.query.username;
        var password = req.query.password;
        Student.findOne({"username": username, "password": password}, function(err, data) {
            if (err) {
              res.status(400);
              return res.json({});
            }
            res.json(data);
        })
    });
};