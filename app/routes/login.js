var Student = require('../models/student');

module.exports = function(app) {

    // Return Student with uuid
    app.get('/login', function(req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        var username = req.query.username;
        var password = req.query.password;
        Student.findOne({"username": username, "password": password}, function(err, data) {
            if (err) {
              res.status(400).json({ error: 'something is wrong' });
              // res.json({});
            }
            if (data instanceof Student) {          // check if data found is of type Student 
                console.log("successful login");
                res.json(data);            
            } else {
                console.log("unsuccessful login");
                // res.status(400).json({error: "Invalid student credentials"}); // note: don't need to return
                // these both same
                res.status(400);
                return res.json({error:"Invalid students credentials"});
            }
           
        })
    });
};
