var mongoose = require('mongoose');

var SwapRequestSchema = mongoose.Schema({
    uuid: {type: String, required: true},       // id for the swap request
    timestamp: {type: Number, required: true},  // time stamp in ms TODO: Wut?
    studUuid: {type: String, required: true},
    unitUuid: {type: String, required: true},
    currentClassUuid: {type: String, required: true},
    requestedClassUuids: {type: Array, required: true},
    dateCreated: {type: Date, required: true},
    serviced: {type: Boolean, required: true},
    dateServiced: {type: Date, required: false}
});

module.exports = mongoose.model('SwapRequest', SwapRequestSchema);
