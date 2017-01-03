const SwapRequest = require('../models/swapRequest');
const uuid = require('uuid');
function registerNewSwapRequestion(studentUuid, unitUuid, currentClassUuid, requestedClassUuids, options) {
    const onErrorListener = options.onErrorListener;
    const onFinishedListener = options.onFinishedListener;
    const swapRequestJson = {
        uuid: uuid.v4(),
        dateCreated: Date.now(),
        serviced: false,
        studentUuid: studentUuid,
        currentClassUuid: currentClassUuid,
        requstedClassUuids: requestedClassUuids,
        unitUuid: unitUuid
    };
    SwapRequest.create(
        swapRequestJson,
        function(err, data) {
            if (err) {
                console.log("Problem adding SwapRequest: "  + err);
                onErrorListener(error, data);
            } else {
                onFinishedListener(data);
            }
        }
    );
}
modules.exports = registerNewSwapRequestion;