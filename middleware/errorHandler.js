const { constants } = require("../Constants")
const errorHandler = (err, req, res, next) => {

    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({ title: "User is not Validated", message: err.message, stackTrace: err.stack })
            break;
        case constants.UNAUTHORIZED:
            res.json({ title: "User is Unauthorized", message: err.message, stackTrace: err.stack })
            break;
        case constants.FORBIDDEN:
            res.json({ title: "User is Forbidden", message: err.message, stackTrace: err.stack })
            break;
        case constants.NOT_FOUND:
            res.json({ title: "User Not Found", message: err.message, stackTrace: err.stack })
            break;
        default:
            console.log(`All is Good`);
            break;
    }
}

module.exports = errorHandler;