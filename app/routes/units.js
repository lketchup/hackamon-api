var Unit = require('../models/unit');

module.exports = function(app) {

    // Return all Units
    app.get('/units', function(req, res) {
        console.log("Units called");
        Unit.find({}, function(err, data) {

            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            if (err) {
              console.log(err);
              res.status(400);
              return res.json({});
            }
            res.json(data);
            console.log(data);
        });
    });
};
