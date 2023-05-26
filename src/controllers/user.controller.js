const bcrypt = require("bcrypt");
const {body, validationResult} = require('express-validator');
const {Op} = require('sequelize');
const {User, Role, Permission} = require('../database/models');
const {NotFoundError, ErrorMessage, ForbiddenError} = require('../exceptions');
const {responseTypes, standardResponse, filterActive, customRegexValidator} = require('../utils/globalUtils');
const {paginate} = require('../libs/paginate');

const getUserPublicInfo = record => {
    let item = {
        id: record.id,
        roleId: record.roleId,
        firstName: record.firstName,
        lastName: record.lastName,
        email: record.email,
    };
    if (record.Role) {
        item.Role = {
            id: record.Role.id,
            name: record.Role.name,
        };
        if (record.Role.Permissions) {
            item.Role.Permissions = record.Role.Permissions.map(i => {
                return {
                    id: i.id,
                    name: i.name,
                };
            });
        }
    }

    return item;
};

const getUserInfo = record => {
    delete record.password;
    return record;
};

const getUserByToken = async (req, res) => {
    const item = await User.findByPk(req.userId, {
        include: [{
            model: Role,
            required: true,
            include: [{
                model: Permission,
                required: true,
            }],
        }]
    });
    if (!item) throw new NotFoundError(ErrorMessage.NOT_FOUND);

    return standardResponse(responseTypes._200_SUCCESS, "", getUserPublicInfo(item.toJSON()), res);
};

const changePassword = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return standardResponse(responseTypes._422_UNPROCESSABLE_ENTITY, "", {errors: errors.array()}, res);
    }

    const user = await User.findByPk(req.userId);
    if (!user) {
        return standardResponse(responseTypes._404_NOTFOUND, 'User not found', null, res);
    }

    const {oldPassword, password} = req.body;
    let correctPassword = await bcrypt.compare(oldPassword, user.password);
    if (!correctPassword) {
        return standardResponse(responseTypes._400_BADREQUEST, "", {message: 'Invalid password'}, res);
    }

    await user.update({password});

    return standardResponse(responseTypes._200_SUCCESS, "Password updated successfully", null, res);
};

const getUsersAdmin = async (req, res) => {
    const {page, limit, order_by, order_direction, roleId, firstName, lastName, email, active} = req.query;

    let search = {
        include: [{
            model: Role,
            required: true,
        }],
        where: {},
    };

    if (roleId) search.where['roleId'] = roleId;
    if (firstName) search.where['firstName'] = {[Op.iLike]: `%${firstName}%`};
    if (lastName) search.where['lastName'] = {[Op.iLike]: `%${lastName}%`};
    if (email) search.where['email'] = {[Op.iLike]: `%${email}%`};
    if (active) search.where = await filterActive(active, search.where);

    let order = [];
    if (order_by && order_direction) {
        order.push([order_by, order_direction]);
    }

    const transform = (records) => {
        return records.map(record => getUserInfo(record.toJSON()));
    };

    const items = await paginate(User, page, limit, search, order, transform);

    return standardResponse(responseTypes._200_SUCCESS, "", items, res);
};

const getAllUsers = async (req, res) => {
    const {page, order_by, order_direction} = req.query;

    let search = {};
    let order = {};
    const limit = 250;
    if (order_by && order_direction) {
        order.push([order_by, order_direction]);
    }
    const transform = (records) => {
        return records.map(record => {
            return {
                id: record.id,
                name: record.firstName + ' ' + record.lastName
            }
        });
    };

    const data = await paginate(User, page, limit, search, order, transform);

    standardResponse(responseTypes._200_SUCCESS, "", data, res);
};

const getUserByIdAdmin = async (req, res) => {
    const item = await User.findByPk(req.params.id, {
        include: [{
            model: Role,
            required: true,
            include: [{
                model: Permission,
                required: true,
            }],
        }]
    });
    if (!item) throw new NotFoundError(ErrorMessage.NOT_FOUND);

    return standardResponse(responseTypes._200_SUCCESS, "", getUserInfo(item.toJSON()), res);
};

const createUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return standardResponse(responseTypes._422_UNPROCESSABLE_ENTITY, "", {errors: errors.array()}, res);
    }

    const {roleId, firstName, lastName, email, password, active} = req.body;
    const user = await User.create({roleId, firstName, lastName, email, password, active});

    return standardResponse(responseTypes._200_SUCCESS, "", getUserInfo(user.toJSON()), res);
};

const updateUserById = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return standardResponse(responseTypes._422_UNPROCESSABLE_ENTITY, "", {errors: errors.array()}, res);
    }

    const item = await User.findByPk(req.params.id);
    if (!item) throw new NotFoundError(ErrorMessage.NOT_FOUND);

    const {roleId, firstName, lastName, email, active, password} = req.body;

    await item.update({roleId, firstName, lastName, email, active});
    if (password && password !== '') {
        await item.update({password});
    }

    return standardResponse(responseTypes._200_SUCCESS, "", getUserInfo(item.toJSON()), res);
};

const setPasswordById = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return standardResponse(responseTypes._422_UNPROCESSABLE_ENTITY, "", {errors: errors.array()}, res);
    }

    const item = await User.findByPk(req.params.id);
    if (!item) throw new NotFoundError(ErrorMessage.NOT_FOUND);

    const {password} = req.body;

    await item.update({password});

    return standardResponse(responseTypes._200_SUCCESS, "", getUserInfo(item.toJSON()), res);
};

const deleteUserById = async (req, res) => {
    const item = await User.findByPk(req.params.id);
    if (!item) throw new NotFoundError(ErrorMessage.NOT_FOUND);
    if (item.isSuperUser) throw new ForbiddenError(ErrorMessage.NOT_ALLOWED);
    await item.destroy();
    return standardResponse(responseTypes._200_SUCCESS, "", getUserInfo(item.toJSON()), res);
};

const validateUser = (method) => {
    const locale = 'es-ES';
    switch (method) {
        case 'createUser': {
            return [
                body('roleId').exists().isInt().not().isEmpty(),
                body('firstName').exists().isString().not().isEmpty().isLength({
                    min: 2,
                    max: 50
                }).matches(customRegexValidator.ONLY_LETTERS),
                body('lastName').exists().isString().not().isEmpty().isLength({
                    min: 2,
                    max: 100
                }).matches(customRegexValidator.ONLY_LETTERS),
                body('email').exists().isEmail().not().isEmpty(),
                body('password').exists().isString().not().isEmpty().isLength({
                    min: 8,
                    max: 50
                }).matches(customRegexValidator.STRONG_PASSWORD),
                body('active').exists().isBoolean(),
            ]
        }

        case 'updateUserById': {
            return [
                body('roleId').exists().isInt().not().isEmpty(),
                body('firstName').exists().isString().not().isEmpty().isLength({
                    min: 2,
                    max: 50
                }).matches(customRegexValidator.ONLY_LETTERS),
                body('lastName').exists().isString().not().isEmpty().isLength({
                    min: 2,
                    max: 100
                }).matches(customRegexValidator.ONLY_LETTERS),
                body('email').exists().isEmail().not().isEmpty(),
                body('active').exists().isBoolean(),
            ]
        }

        case 'setPasswordById': {
            return [
                body('password').exists().isString().not().isEmpty().matches(customRegexValidator.STRONG_PASSWORD),
                body('passwordConfirmation').custom((value, {req}) => {
                    if (value !== req.body.password) {
                        throw new Error('Password confirmation does not match password');
                    }
                    return true;
                }),
            ]
        }

        case 'changePassword': {
            return [
                body('oldPassword').exists().isString().not().isEmpty().matches(customRegexValidator.STRONG_PASSWORD),
                body('password').exists().isString().not().isEmpty().matches(customRegexValidator.STRONG_PASSWORD),
                body('passwordConfirmation').custom((value, {req}) => {
                    if (value !== req.body.password) {
                        throw new Error('Password confirmation does not match password');
                    }
                    // Indicates the success of this synchronous custom validator
                    return true;
                }),
            ]
        }
    }
};

module.exports = {
    getUserPublicInfo,
    getUserByToken,
    changePassword,
    getUsersAdmin,
    getUserByIdAdmin,
    createUser,
    updateUserById,
    setPasswordById,
    deleteUserById,
    validateUser,
    getAllUsers
};
