var Student = require('./app/models/student');

module.exports = function(app) {
    // Return all Students
    app.get('/students', function(req, res) {
        Student.find({}, function(err, data) {
            res.json(data);
        });
    });

    // Return Student with uuid
    app.get('/students/:uuid', function(req, res) {
          Student.findOne({"uuid": uuid}, function(err, data) {
            res.json(data);
        })
    });

    // Add a Student
    app.post('/students/add', function(req, res) {
        jsonData = JSON.parse(req.body.result);
        Student.create(jsonData, function(err, data) {
        res.json(data);
        });
    });

    // Authenticate student with username and password
    app.post('/student/login', function(req, res) {
        var jsonData = JSON.parse(req.body.result);
        console.log("json body: " + jsonData);
        var studentUsername = jsonData.username;
        var studentPassword = jsonData.password;
        console.log("check /login - body: " + jsonBody + ", username: " + studentUsername +  ", password: " + studentPassword);

        Student.find({"username":studentUsername, "password":studentPassword}, function(err, data) {
            if ((err) || (data === null)) {
                console.log("Error at /login, err: " + err + ", data: " + data );
            } else {
                console.log("Passed - /login, err: " + err + ", data: " + data );
            }
            res.json(data);
        });
    });
    
    
};
