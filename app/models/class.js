var mongoose = require('mongoose');

var ClassSchema = mongoose.Schema({
    uuid: {type: String, required: true},
    datetime: {type: Date, required: true},
    location: {type: String, required: true},
    type: {type: String, required: true},           // can be lecture, tutorial, lab etc
    unitUuid: {type: String, required: true},
    capacity: {type: Number, required: true},
    noStudents: {type: Number, required: true},
    swappable: {type: Boolean, required: true},
    fifoQueue: {type: Array, required: true}        // array of json objects with studentuuid and date
});

module.exports = mongoose.model('Class', ClassSchema);
