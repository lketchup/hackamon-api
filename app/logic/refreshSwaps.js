const SwapRequest = require('../routes/swapRequests.js');
const trySwap = require('../logic/trySwap.js');
function refreshSwaps(options) {
    const errorListener = options.onErrorListener;
    const finishListener = options.onFinishedListener;
    SwapRequest.find({}, function(err, swapRequestArray){
        if (err){
            console.log(err);
            errorListener(err,swapRequestArray);
        } else {

            // logic over data (array of requests) here
            swapRequestArray.forEach(function(swapRequest){  // loop over all requests
                if (swapRequest.serviced === false) {
                    var result = trySwap(swapRequest, swapRequestArray);      // try swap each unserviced request
                    if (result) {
                        console.log("swapped - true:" + result);
                    } else {
                        console.log("swapped - false:" + result);
                    }
                }
            });
            console.log("Finish checking swap requests");
            finishListener(swapRequestArray);
        }
    }).sort({timestamp: 1})
}
module.exports = refreshSwaps;