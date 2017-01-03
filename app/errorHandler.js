function createErrorJson(errorMessage){
    return {
        error_message: errorMessage
    }
}
module.exports({
    createErrorJson: createErrorJson
});