var Student = require('../models/student');
var Unit = require('../models/unit');
var Class = require('../models/class');
var data = require('./data');

module.exports = function(app) {

    app.get('/seed', function(req, res) {

        console.log("Cleaning the Database...");
        Student.remove({}, function (err) {
            if (err) {
                console.log("Problem removing Student: "  + err);
            } else {
                console.log('Cleaned all Students...')

                Unit.remove({}, function (err) {
                    if (err) {
                        console.log("Problem removing Unit: "  + err);
                    } else {
                        console.log('Cleaned all Units...')

                        Class.remove({}, function (err) {
                            if (err) {
                                console.log("Problem removing Class: "  + err);
                            } else {
                                console.log('Cleaned all Classes...')

                                console.log("Seeding the Database...");
                                data.students.forEach(function(student) {
                                  Student.create(student, function(err, data) {
                                    if (err) {
                                        console.log("Problem adding Student: "  + err);
                                    }
                                  });
                                });
                                console.log("Students have been added...");
                                data.units.forEach(function(unit) {
                                  Unit.create(unit, function(err, data) {
                                    if (err) {
                                        console.log("Problem adding Unit: "  + err);
                                    }
                                  });
                                });
                                console.log("Units have been added...");
                                data.classes.forEach(function(clasz) {
                                  Class.create(clasz, function(err, data) {
                                    if (err) {
                                        console.log("Problem adding Class: "  + err);
                                    }
                                  });
                                });
                                console.log("Classes have been added...");
                                res.send("Done.");
                            }
                        });
                    }
                });
            }
        });
    });
};
