var Unit = require('../models/unit');

module.exports = function(app) {

    // Return all Units
    app.get('/units', function(req, res) {
        Unit.find({}, function(err, data) {
            res.json(data);
        });
    });

    // Return Unit with uuid
    app.get('/unit/:uuid', function(req, res) {
        Unit.findOne({"uuid": uuid}, function(err, data) {
            res.json(data);
        })
    });

    // Add a Unit
    app.post('/unit/add', function(req, res) {
        jsonData = JSON.parse(req.body.result);
        Unit.create(jsonData, function(err, data) {
            res.json(data);
        });
    });
    
};
