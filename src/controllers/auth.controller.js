const {User, Role, Permission} = require('../database/models');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const {responseTypes, standardResponse} = require('../utils/globalUtils');
const {getUserPublicInfo} = require('./user.controller');

const signUp = async (req, res) => {
    const {roleId, firstName, lastName, email, password} = req.body;
    let user = await User.findOne({where: {email}});
    if (user) {
        return standardResponse(responseTypes._400_BADREQUEST, "", {message: 'Email in use'}, res);
    }
    user = await User.create({
        roleId, firstName, lastName, email, password, active: true
    });
    const token = jwt.sign({id: user.id}, process.env.AUTH_PRIVATE_KEY, {expiresIn: 86400});
    const data = {
        token,
        user: getUserPublicInfo(user.toJSON()),
    };

    return standardResponse(responseTypes._200_SUCCESS, "", data, res);
};

const signIn = async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({
        where: {
            email,
           // active: true
        },
        include: [{
            model: Role,
            include: [{
                model: Permission,
                where: {active: true},
                required: false
            }]
        }]
    });
    if (!user) {
        return standardResponse(responseTypes._404_NOTFOUND, "", {message: 'Usuario no encontrado'}, res);
    } else if(!user.active) {
        return standardResponse(responseTypes._401_UNAUTHORIZED, "", {message: 'El usuario está deshabilitado, por favor contacte con el administrador del sistema'}, res);
    }


    let correctPassword = await bcrypt.compare(password, user.password);
    if (correctPassword) {
        const token = jwt.sign({id: user.id}, process.env.AUTH_PRIVATE_KEY, {expiresIn: 86400});
        console.log(token);
        const data = {
            token,
            user: getUserPublicInfo(user.toJSON()),
        };
        console.log(data.user.Role.Permissions);
        return standardResponse(responseTypes._200_SUCCESS, "", data, res);
    }

    return standardResponse(responseTypes._400_BADREQUEST, "", {message: 'Invalid password'}, res);
};

module.exports = {
    signUp,
    signIn,
};
