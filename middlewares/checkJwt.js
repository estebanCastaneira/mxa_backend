const { expressjwt: checkJWT } = require("express-jwt");
const checkJwt = checkJWT({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] });

module.exports = checkJwt;