const {User, Role, Permission} = require('../database/models');
const {responseTypes, standardResponse} = require('../utils/globalUtils');

module.exports = function (...permissions) {
    const isAllowed = (user, permissions) => {
        let count = 0;
        if (user.Role) {
            user.Role.Permissions.forEach((p) => {
                count += permissions.indexOf(p.name) > -1 ? 1 : 0
            })
        }
        return count === permissions.length;
    };

    // return a middleware
    return async (req, res, next) => {
        const user = await User.findByPk(req.userId, {
            include: [{
                model: Role,
                include: [{
                    model: Permission,
                    where: {active: true,}
                }]
            }]
        });

        if (!req.userId || !isAllowed(user, permissions)) {
            const data = {
                error: {message: `User is not allowed to: [${JSON.stringify(permissions)}]`}
            };
            return standardResponse(responseTypes._401_UNAUTHORIZED, "", data, res);
        }

        next(); // user has the needed rights.
    }
};
