var SwapRequest = require('../models/swapRequest');
var uuid = require('uuid');
var mailer = require('../utils/mailer');
var request = require('request');
var errorHandler = require('../errorHandler');
var refreshSwaps = require('../logic/refreshSwaps');
var registerNewRequest = require('../logic/newSwapRequest');

module.exports = function(app) {


    
    // Buggy, postman call works, front end call doesnt 
    // Enqueue a new swap request
    app.post('/swaprequest', function(req, res){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        console.log("NEW SWAP REQ");
        var jsonData = req.query;
        console.log("Json Body: " + jsonData);
        console.log("Json Body stu: " + jsonData.studentUuid);

        var studentUuid = jsonData.studentUuid;            // need
        var unitUuid = jsonData.unitUuid;                   // need
        var requestedClassesUuids = [jsonData.requestedClassUuids];  // need
        console.log("Request Classes: " + requestedClassesUuids);
        var currentClassUuid = jsonData.currentClassUuid;
        registerNewRequest(studentUuid, unitUuid, currentClassUuid, requestedClassesUuids, {
            onErrorListener: function(err, data) {
                console.log("Problem adding SwapRequest: "  + err);
                res.status(400);
                res.json(errorHandler.createErrorJson(err));
            },
            onFinishedListener: function(data) {
                console.log("Added request"); // + data);
                // trigger swaps
                refreshSwaps({
                    onErrorListener: function (err, data) {
                        console.log(err);
                        res.status(400);
                        res.json(errorHandler.createErrorJson("bad things happened"));
                    },
                    onFinishedListener: function(data) {
                        console.log("END HERE");
                        //console.log(res)
                        console.log("BODEH: " + data);
                        res.status(200).json(data);         // note: don't need to return
                    }
                });
            }
        });
    });
};
