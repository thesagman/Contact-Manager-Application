const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const ValidateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authheader = req.headers.authorization || req.headers.Authorization;
    if (authheader && authheader.startsWith("Bearer")) {
        token = authheader.split(' ')[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(401);
                return next(new Error(`User is not Authorized`));
            }
            req.user = decoded.user;
            next();
        })
    } else {
        res.status(401);
        return next(new Error(`Bearer token not provided`));
    }
    if (!token) {
        res.status(401);
        return next(new Error(`User is not Authorized or token is missing`));
    }
})


module.exports = ValidateToken;