var Student = require('../models/student');

module.exports = function(app) {

    // Return Student with uuid
    app.get('/students/:uuid', function(req, res) {
        var user = req.params.user;
        var pass = req.params.pass
        Student.findOne({"username": user, "password": pass}, function(err, data) {
            if (err) {
              res.status(400);
              return res.json({});
            }
            res.json(data);
        })
    });
};
