var Class = require('../models/class');
var Student = require('../models/student');
var Unit = require('../models/unit');

module.exports = function(app) {

    app.get('/classes', function(req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        var params = req.query;
        // if a unit is passed in, find classes for that unit, else return all classese 
        if (params.unit) {
          Class.find({"unitUuid" : params.unit}, function(err, data) {
                if (err) {
                  res.status(401)
                  return res.json({})
                } else {
                  return res.json(data);
                }
            });
        } else {
          Class.find({}, function(err, data) {
              return res.json(data);
        })
      }
    });

    // Return Class with uuid
    app.get('/classes/:uuid', function(req, res) {
        var uuid = req.params.uuid;

        Class.findOne({"uuid": uuid}, function(err, data) {
            if (err) {
              console.log(err);
              res.status(400);
              return res.json({});
            }
            res.json(data);
        })
    });

    // requests to enqueue
    app.post('/classes/swap/enqueue', function(req, res) {
        /**
         * we assume can always add a student to a queue, add a student to the queue of a class
         * can be multiple but all classes are assumed to be for the same unit
         * json data has the following
         * {
         *      studentuuid:,
         *      Array of classUuids,
         *      unitUuid
         * }
         *
         */
        var jsonData = req.body;
        var studentUuid = jsonData.studentUuid;
        var unitUuid = jsonData.unitUuid;
        var classesUuid = jsonData.classesUuid;
        var i = 0;
        classesUuid.forEach( function(unitClass) {
            +new Date;
            var timestamp = Date.now();
            var entry = {
                "studentUuid": studentUuid, // student who wants to swap into the class
                "datetime": timestamp       // timestamp in milliseconds

            };

            unitClass.fifoQueue.push(entry);
            console.log("added to class " + unitClass + " queue, class uuid: " + unitClass.uuid);
            i ++;
        });
        console.log("added a total of " + i + " swap requests for student " +  studentUuid);
    });


var tryServe  = function () {
    Class.find({}, function(err, data) {
        // data = all classes
        data.forEach( function(classLesson) {
            // if below is true, can swap in
            if ( (classLesson.length > 0) && (classLesson.noStudents - classLesson.capacity < 0 ) ) {

                var minTime = null;
                var minEntryIdx = null;
                // find min entry in fifo queue
                for (var i = 0; i < classLesson.fifoQueue.length; i ++) {
                    if (minTime === null) {
                        minTime = classLesson.fifoQueue[i].datetime;
                        minEntryIdx = i;
                    } else {
                        if (classLesson.fifoQueue[i].datetime < minTime) {
                            minTime = classLesson.fifoQueue[i].datetime;
                            minEntryIdx = i;
                        }
                    }
                }

                var firstEntry = classLesson.fifoQueue[minEntryIdx];
                if (firstEntry === null) {
                    console.log("Error at .fifoQueue, entry stuid: " + firstEntry.studentUuid + ", entry: " + firstEntry);
                    return false;
                } else {
                    // slice array to remove first entry (min so fifo property held)
                    console.log("Served .fifoQueue, entry stuid: " + firstEntry.studentUuid + ", entry: " + firstEntry);
                    if (minEntryIdx > -1) {
                        classLesson.fifoQueue = classLesson.fifoQueue.splice(minEntryIdx, 1);     // remove item from queue
                    }
                    //return firstEntry;                                                  // next student to add to queue
                    // do swap here !!!!!
                    Student.findOne({"uuid": studentUuid}, function(err, student) {
                        //res.json(data);
                        if (err) {
                            console.log("err")
                        } else {
                            Unit.findOne({"uuid":unitUuid}, function(err, unit) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    changeClassEnrolment(unit, student, classLesson);
                                }
                            })

                        }
                    })
                }
            } else {
                // console.log("Error at .fifoQueue, error: Queue empty");
            }
        })
    });

}

};
