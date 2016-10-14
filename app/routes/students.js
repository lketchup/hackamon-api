var Student = require('./app/models/student')

module.exports = function(app) {

  // Return all Students
  app.get('/students', function(req) {
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

}
