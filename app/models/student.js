var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StudentSchema = mongoose.Schema({
    uuid: {type: String, required: true},
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    units: {type: Array, required: true},
    classes: {type: Array, required: true}
});

module.exports = mongoose.model('Student', StudentSchema);
