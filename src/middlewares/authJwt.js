const jwt = require('jsonwebtoken');
const {User} = require('../database/models');
const {responseTypes, standardResponse} = require('../utils/globalUtils');

const verifyToken = async (req, res, next) => {
    try {
        //const token = req.headers["x-access-token"];
        const token = req.headers["authorization"];
        if (!token) {
            return standardResponse(responseTypes._403_FORBIDDEN, 'No token provided', null, res);
        }

        const decoded = jwt.verify(token, process.env.AUTH_PRIVATE_KEY);
        req.userId = decoded.id;

        const user = await User.findByPk(req.userId, {password: 0});
        if (!user) {
            return standardResponse(responseTypes._404_NOTFOUND, 'User not found', null, res);
        }

        next();

    } catch (error) {
        standardResponse(responseTypes._401_UNAUTHORIZED, 'Unauthorized', null, res);
    }
};

module.exports = verifyToken;
