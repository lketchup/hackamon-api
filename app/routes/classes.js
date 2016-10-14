var Class = require('./app/models/class');

module.exports = function(app) {

    // Return all classes
    app.get('/classes', function(req, res) {
        Class.find({}, function(err, data) {
            res.json(data);
        });
    });

    // Return Class with uuid
    app.get('/classes/:uuid', function(req, res) {
        Class.findOne({"uuid": uuid}, function(err, data) {
            res.json(data);
        })
    });

    // Add a Class
    app.post('/classes/add', function(req, res) {
        jsonData = JSON.parse(req.body.result);
        Class.create(jsonData, function(err, data) {
            res.json(data);
        });
    });
    
};
