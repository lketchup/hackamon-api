var Unit = require('../models/unit');

module.exports = function(app) {

    // Return all Units
    app.get('/units', function(req, res) {
        console.log("Units called");
        Unit.find({}, function(err, data) {
            res.json(data);
            console.log(data);
        });
    });

    // Return Unit with uuid
    app.get('/units/find/:uuid', function(req, res) {
        var uuid = req.params.uuid;
        Unit.findOne({"uuid": uuid}, function(err, data) {
            res.json(data);
        })
    });

    // Add a Unit
    app.post('/units/add', function(req, res) {
        console.log("units/add");
        jsonData = req.body;
        console.log(jsonData);
        Unit.create(jsonData, function(err, data) {
            if(err) {
                console.log("err " + err);
            } else {
                console.log("creating unit " + jsonData.uuid);
            }
            console.log(data);
            res.json(data);
        });
    });

    // Add dummy data
    app.post('/units/add/dummydata', function(req, res) {
        console.log("~ adding dummy units");
        var sampleData = require('../utils/populateDB');
        var sampleUnits = sampleData.sampleUnits;
        sampleUnits.forEach( function(unit) {
            Unit.create(unit, function(err, data) {
                if(err) {
                    console.log("err " + err);
                } else {
                    console.log("creating unit " + data);
                }
                //console.log(data);
                res.json(data)
            })
        })
    });

    // Remove all unit data
    app.get('/units/purge', function(req, res) {
        console.log("purging units");
        Unit.remove({}, function (err) {
            if (err) {
                console.log("err: "  + err);
            } else {
                console.log('collection removed')
            }
        });
    });
};
