var mongoose = require('mongoose');

var ClassSchema = mongoose.Schema({
    uuid: {type: String, required: true},
    day: {type: String, required: true},
    time: {type: String, required: true},
    duration: {type: String, required: true},
    campus: {type: String, required: true},
    staff: {type: String, required: true},
    location: {type: String, required: true},
    type: {type: String, required: true},             // can be lecture, tutorial, lab etc
    unitUuid: {type: String, required: true},
    capacity: {type: Number, required: true},
    noStudents: {type: Number, required: true},
    swappable: {type: Boolean, required: true},
    fifoQueue: {type: Array, required: false},        // array of json objects with studentuuid and 
    students: {type: Array, required: true}
    // note: if students = [] then it is false
});

module.exports = mongoose.model('Class', ClassSchema);
