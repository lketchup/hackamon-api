var Student = require('../models/student');

module.exports = function(app) {
    // Return all Students
    app.get('/students', function(req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        Student.find({}, function(err, data) {
            if (err) {
              console.log(err);
              res.status(400);
              return res.json({});
            }
            res.json(data);
        });
    });

    // Return Student with uuid
    app.get('/students/:uuid', function(req, res) {
        var uuid = req.params.uuid;
        console.log("params uuid: " + uuid)
        Student.findOne({"uuid": uuid}, function(err, data) {
            if (err) {
              console.log(err);
              res.status(400);
              return res.json({});
            }
            if (data instanceof Student){
                res.json(data);
            } else {
                res.status(400);
                return res.json({});
            }
        })
    });

    // Authenticate student with username and password
    app.post('/students/login', function(req, res) {

        var jsonBody = req.body
        console.log("json body: " + jsonBody);
        var studentUsername = jsonBody.username;
        var studentPassword = jsonBody.password;
        console.log("check /login - body: " + jsonBody + ", username: " + studentUsername +  ", password: " + studentPassword);

        Student.find({"username":studentUsername, "password":studentPassword}, function(err, data) {
            if ((err) || (data === null)) {
                res.status(404); // TODO
                res.json({message:"Could not find data"});
                console.log("Error at /login, err: " + err + ", data: " + data );
            } else {
                console.log("Passed - /login, err: " + err + ", data: " + data );
                res.json(data[0]);
            }
        });
    });
};
