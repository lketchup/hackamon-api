var Class = require('../models/class');
var Student = require('../models/student');
var Unit = require('../models/unit');
var SwapRequest = require('../models/swapRequest');
var uuid = require('uuid');
var mailer = require('../utils/mailer');
var request = require('request');


module.exports = function(app) {

    app.post('/testUpdateEntry', function(req, res){     // works
        console.log("/testUpdateEntry");
        Student.update(
            {firstname: "JoJo"},
            {firstname: "NoJoJo"},
            {upsert: false},
        function(err, data){
            if (err) {
                console.log(err)
            } else {
                console.log(data)
            }
        })
    });

    app.post('/testFullUpdate', function(req, res){
        console.log("/testFullUpdate") ;
        Student.find({firstname: "Robyn"}, function(err, data){
            if (err){
                console.log(err)
            } else {                                // can overwrite and update like this
                data[0].firstname = "Robin";
                data[0].lastname = "Batman";
                Student.update({firstname: "Robyn"}, data[0], {upsert: false}, function(err, data){
                    if (err) {
                        console.log(err)
                    } else {
                        console.log(data)
                    }
                });
                res.json(data);
            }
        })
    });
    app.get('/testGetStudent', function(req, res){
        console.log('/testGetStudent');
        var s = Student.find({firstname: "Yuan-Fang"});     // find requested class from
        // this returns a query, not the student data
        console.log(s);

    });

    app.post('/testDelArrayElement', function(req, res){
        console.log('/testDelArrayElement');
        Student.find({firstname: "NoJoJo"}, function(err, data) {
            if (err) {
                console.log(err)
            } else {
                var jsonified = data[0]
                //console.log(jsonified);
                //console.log(jsonified.units);
                var units = jsonified.units;
                console.log(units);
                for (var i = 0; i < units.length; i ++) {
                    // console.log(units[i])
                    if (units[i] == "FIT3080") {
                        //delete jsonified.units["FIT3080"];
                        units.splice( units.indexOf('FIT3080'), 1 );    // removes item from array http://www.hostingadvice.com/how-to/javascript-remove-element-array/
                        break;
                    }
                }
                console.log(jsonified.units);
            }
        })
    });



    app.get('/swaprequest', function(req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");


        var params = req.query;
        if (params.studUuid) {
            SwapRequest.find({"studUuid" : params.studUuid}, function(err, data) {
                if (err) {
                    res.status(401);
                    return res.json({})
                } else {
                    return res.json(data);
                }
            });
        } else {
            SwapRequest.find({}, function(err, data) {
                return res.json(data);
            })
        }
    });


    // Enqueue a new swap request
    app.post('/swaprequest/new', function(req, res){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        console.log("NEW SWAP REQ");
        var jsonData = req.query;
        console.log("Json Body: " + jsonData);
        console.log("Json Body stu: " + jsonData.studentUuid);

        var studentUuid = jsonData.studentUuid;            // need
        var unitUuid = jsonData.unitUuid;                   // need
        var requestedClasses = [jsonData.requestedClasses];  // need 
        console.log("Request Classes: " + requestedClasses)
        var timestamp = Date.now();
        var date = Date(Date.now()).toLocaleString();
        var reqUuid = uuid.v4();                           // random uuid
        var currentClass = jsonData.currentClassUuid;
        

        var swapRequest = {
            uuid: reqUuid,
            timestamp: timestamp,
            studUuid: studentUuid,
            unitUuid: unitUuid,
            currentClassUuid: currentClass,
            requestedClasses: requestedClasses,
            date: date,
            serviced: false
        };

        console.log(swapRequest);
        // Add the new swap request to MongoDb
        SwapRequest.create(swapRequest, function(err, data) {
            if (err) {
                console.log("Problem adding SwapRequest: "  + err);
            } else {
                console.log("Added request"); // + data);
                // trigger swaps
                var url = "http://localhost:3000/swaprequest/trigger";
                request.post(url, {}, function(err, result, body){
                    if (err) {
                        console.log(err);
                        res.status(401);
                        return res.json({})
                    } else {
                        console.log("END HERE");
                        //console.log(res)
                        console.log("BODEH: " + body)
                        res.status(200);
                        return res.json(body)
                    }
                });

            }
        });
    });


    var twoWaySwap = function(swapRequestA, classUuidA, swapRequestB, classUuidB){
        /**
         * Swapping two students into each other's respective classes consists of:
         *
         * 1. update classA to remove studentA
         * 2. update classB to include studentA
         * 3. update studentA to remove classA
         * 4. update studentA to include classB
         * 5. update classB to remove studentB
         * 6. update classA to include studentB
         * 7. update studentB to remove classB
         * 8. update studentB to include classA
         *
         * End result is classA has studentB and classB has studentA
         */

        Class.find({uuid: classUuidA}, function(err, classA){
            if (err) {
                console.log("two way swap - classA: " + err)
            } else {
                Student.find({uuid: swapRequestA.studUuid}, function(err, studentA){
                    if (err) {
                        console.log("two way swap - studentA: " + err)
                    } else {
                        Class.find({uuid: classUuidB}, function(err, classB) {
                            if (err) {
                                console.log("two way swap - classB: " + err)
                            } else {
                                Student.find({uuid: swapRequestB.studUuid}, function(err, studentB) {
                                    if (err) {
                                        console.log("two way swap - studentB: " + err)
                                    } else {

                                        console.log("Prev:")
                                        console.log("class A: " + classA[0].uuid)
                                        console.log("class B: " + classB[0].uuid)
                                        console.log("student A: " + studentA[0].uuid)
                                        console.log("student B: " + studentB[0].uuid)
                                        console.log("swap req A: " + swapRequestA.uuid)
                                        console.log("swap req B:" + swapRequestB.uuid)

                                        // 1. remove studentA from classA
                                        classA[0].students.splice( classA[0].students.indexOf(swapRequestA.studUuid), 1);
                                        // 2. add studentA to classB
                                        classB[0].students.push(swapRequestA.studUuid);
                                        // 3. remove classA from studentA
                                        studentA[0].classes.splice( studentA[0].classes.indexOf(classUuidA), 1);
                                        // 4. add new class uuid to student
                                        studentA[0].classes.push(classUuidB);
                                        // 5. remove studentB from classB
                                        classB[0].students.splice( classB[0].students.indexOf(swapRequestB.studUuid), 1);
                                        // 6. add studentB to classA
                                        classA[0].students.push(swapRequestB.studUuid);
                                        // 7. remove classB from studentB
                                        studentB[0].classes.splice( studentB[0].classes.indexOf(classUuidB), 1 );
                                        // 8. add classA to studentB
                                        studentB[0].classes.push(classUuidA);
                                        swapRequestA.serviced = true;
                                        swapRequestB.serviced = true;

                                        console.log("~ After:")
                                        console.log("class A: " + classA[0].uuid)
                                        console.log("class B: " + classB[0].uuid)
                                        console.log("student A: " + studentA[0].uuid)
                                        console.log("student B: " + studentB[0].uuid)
                                        console.log("swap req A: " + swapRequestA.uuid)
                                        console.log("swap req B:" + swapRequestB.uuid)

                                        // update entries in db
                                        Student.update({uuid: studentA[0].uuid}, studentA[0], {upsert: false}, function(err, data){
                                            if (err) {
                                                console.log(err)
                                            } else {
                                                console.log(data)
                                            }
                                        });
                                        Student.update({uuid: studentB[0].uuid}, studentB[0], {upsert: false}, function(err, data){
                                            if (err) {
                                                console.log(err)
                                            } else {
                                                console.log(data)
                                            }
                                        });
                                        Class.update({uuid: classA[0].uuid}, classA[0], {upsert: false}, function(err, data){
                                            if (err) {
                                                console.log(err)
                                            } else {
                                                console.log(data)
                                            }
                                        });
                                        Class.update({uuid: classB[0].uuid}, classB[0], {upsert: false}, function(err, data){
                                            if (err) {
                                                console.log(err)
                                            } else {
                                                console.log(data)
                                            }
                                        });
                                        SwapRequest.update({uuid: swapRequestA.uuid}, swapRequestA, {upsert: false}, function(err, data){
                                            if (err) {
                                                console.log(err)
                                            } else {
                                                console.log(data)
                                            }
                                        });
                                        SwapRequest.update({uuid: swapRequestB.uuid}, swapRequestB, {upsert: false}, function(err, data){
                                            if (err) {
                                                console.log(err)
                                            } else {
                                                console.log(data)
                                            }
                                        });

                                        console.log("Serviced swap request (two way swap): A:" + swapRequestA.uuid + ", B: " + swapRequestB.uuid);
                                        mailer.sendSuccessEmail(studentA[0], classA[0], classB[0]);
                                        mailer.sendSuccessEmail(studentB[0], classB[0], classB[0]);

                                        return [swapRequestA, swapRequestB]
                                    }
                                })
                            }
                        })
                    }
                })
            }
        });
    };

    var oneWaySwap = function(swapRequest, requestedClass){
        /**
         * Swapping a student into a class consists of:
         * 1. update old class to remove student
         * 2. update new class to add student
         * 3. update student to remove old class
         * 4. update student to add new class
         */
        Class.find({uuid:swapRequest.currentClassUuid}, function(err, oldClass) {   // find old class
            if (err) {
                console.log(err)
            } else {
                Student.find({uuid:swapRequest.studUuid}, function(err, student){      // find student
                    if (err) {
                        console.log(err)
                    } else {
                        // 1. remove student uuid from old class
                        oldClass[0].students.splice( oldClass[0].students.indexOf(swapRequest.studUuid), 1 );
                        // 2. add student uuid to requestedClass
                            // console.log("err ln 184: " + requestedClass);
                        requestedClass.students.push(swapRequest.studUuid);
                        // 3. remove old class from student
                        student[0].classes.splice( student[0].classes.indexOf(oldClass[0].uuid), 1 );
                        // 4. add new class uuid to student
                        student[0].classes.push(requestedClass.uuid);

                        swapRequest.serviced = true;

                        // update entries in db
                        Student.update({uuid: student[0].uuid}, student[0], {upsert: false}, function(err, data){
                            if (err) {
                                console.log(err)
                            } else {
                                console.log(data)
                            }
                        });
                        Class.update({uuid: oldClass[0].uuid}, oldClass[0], {upsert: false}, function(err, data){
                            if (err) {
                                console.log(err)
                            } else {
                                console.log(data)
                            }
                        });
                        Class.update({uuid: requestedClass.uuid}, requestedClass, {upsert: false}, function(err, data){
                            if (err) {
                                console.log(err)
                            } else {
                                console.log(data)
                            }
                        });
                        SwapRequest.update({uuid: swapRequest.uuid}, swapRequest, {upsert: false}, function(err, data){
                            if (err) {
                                console.log(err)
                            } else {
                                console.log(data)
                            }
                        });
                        
                        // send email
                        mailer.sendSuccessEmail(student[0], oldClass[0], requestedClass)
                        

                        console.log("Serviced swap request (one way swap): " + swapRequest.uuid)

                    }
                })
            }

        })
    };

    var trySwap = function(swapRequest, allSwapRequests) {
        //console.log("big one: " + allSwapRequests);
        //console.log("a req: " + allSwapRequests[1]);
        //console.log("a stu who made req: " + allSwapRequests[1].studUuid);


        var potentialClasses = swapRequest.requestedClasses;
        potentialClasses.forEach(function(classUuid){               // iterate over all classes the student wants to be swapped into
            console.log("try swap");
            console.log("instance array: " + (classUuid instanceof Array))
            console.log("instance checked: " + classUuid)
            

            if (classUuid instanceof Array) {
                console.log("instance array")
                console.log(classUuid)
                classUuid = classUuid[0]
                console.log(classUuid)
            }
            // find requested class from
            Class.find({uuid: classUuid}, function(err, requestedClass){
                // next itertion - use swappable
                //console.log("class: " + requestedClass.uuid);
                //console.log("cap: " + (+requestedClass[0].capacity ));
                //console.log("no: " + ((+requestedClass[0].noStudents) + 1));
                console.log("???: " + classUuid)
                if ( (+requestedClass[0].capacity) >= ((+requestedClass[0].noStudents) + 1) ) {

                    // case 1: can swap right away
                    //Todo: do swap
                    oneWaySwap(swapRequest, requestedClass[0]);
                    return true;
                } else {

                    // case 2: can't swap right away, check if a student wants to swap out
                    var studUuidInClass = requestedClass[0].students;

                    for (var i = 0; i < studUuidInClass.length; i++) {                                              // loop through all students in class
                        for (var j = 0; j < allSwapRequests.length; j++) {                                          // loop through all requests
                            //console.log("iteration i:"+i+", j:"+j);
                            //console.log("stu who made cur req: " + allSwapRequests[j].studUuid);
                            //console.log("stu in target class: " + studUuidInClass[i]);
                            //console.log("stu who make THE req: " + swapRequest.studUuid);
                            //console.log("hella weird: " + (allSwapRequests[j].studUuid === studUuidInClass[i] ))
                            if ( (allSwapRequests[j].studUuid === studUuidInClass[i])                            // a student in the same class with a swap request
                                && (swapRequest.studUuid !== studUuidInClass[i])                                    // who isn't the same as the student who made swapRequest
                                && ("?" !== swapRequest.studUuid)
                                && (swapRequest.serviced === false)
                                && (allSwapRequests[j].serviced === false) ) {

                                //&& ( allSwapRequests[j].requestedClasses.indexOf(requestedClass[0].uuid) >= 0) ) {     // class uuid is in the requestedClasses of the other student
                                // check if in array

                                var found = false;
                                for (var k = 0; k < allSwapRequests[j].requestedClasses.length; k++) {
                                    console.log("all req one: " + allSwapRequests[j].requestedClasses[k])
                                    console.log("req classs uuid: " + requestedClass[0].uuid)
                                    if (allSwapRequests[j].requestedClasses[k] === swapRequest.currentClassUuid) {
                                        found = true;
                                    }
                                }
                                // can swap both into each other's respective classes
                                //Todo: do swap
                                if (found) {
                                    swapRequest.serviced = true;
                                    allSwapRequests[j].serviced = true
                                    twoWaySwap(swapRequest, swapRequest.currentClassUuid, allSwapRequests[j], allSwapRequests[j].currentClassUuid);


                                    return true;
                                }

                            }
                        }
                    }
                }
            });

        });
        return false;   // no swap occurred
    };
    
  


    // On event, try swap
    app.post('/swaprequest/trigger', function(req, res) {
       console.log("triggered called");
       SwapRequest.find({}, function(err, swapRequestArray){
           if (err){
               console.log(err);
               return {};
           } else {
               
               // logic over data (array of requests) here
               swapRequestArray.forEach(function(swapRequest){  // loop over all requests
                   if (swapRequest.serviced === false) {
                       var result = trySwap(swapRequest, swapRequestArray);      // try swap each unserviced request
                       if (result) {
                           console.log("swapped - true:" + result);
                       } else {
                           console.log("swapped - false:" + result);
                       }
                   }
               });
               console.log("Finish checking swap requests");
               return res.json(swapRequestArray);
           }
       }).sort({timestamp: 1})

    });

};
