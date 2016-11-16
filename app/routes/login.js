var Student = require('../models/student');

module.exports = function(app) {

    // Return Student with uuid
    app.get('/login', function(req, res) {
        var username = req.params.username;
        var password = req.params.password;
        Student.findOne({"username": username, "password": password}, function(err, data) {
            if (err) {
              res.status(400);
              return res.json({});
            }
            res.json(data);
        })
    });
};
