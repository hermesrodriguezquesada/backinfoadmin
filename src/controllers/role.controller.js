const {body, validationResult} = require('express-validator');
const {Op} = require('sequelize');
const {Role, Permission} = require('../database/models');
const {NotFoundError, ErrorMessage} = require('../exceptions');
const {responseTypes, standardResponse, filterActive} = require('../utils/globalUtils');
const {paginate} = require('../libs/paginate');

const createRole = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return standardResponse(responseTypes._422_UNPROCESSABLE_ENTITY, "", {errors: errors.array()}, res);
    }

    const {name, active, permissions} = req.body;
    const role = await Role.create({name, active});
    if (permissions && Array.isArray(permissions) && permissions.length) {
        const rolePermission = await Permission.findAll({
            where: {
                id: {
                    [Op.in]: permissions,
                }
            }
        });
        role.addPermissions(rolePermission);
    }

    return standardResponse(responseTypes._200_SUCCESS, "", role, res);
};

const getRolesAdmin = async (req, res) => {
    const {page, limit, order_by, order_direction, name, active} = req.query;

    let search = {
        where: {},
    };

    if (name) search.where['name'] = {[Op.iLike]: `%${name}%`};
    if (active) search.where = await filterActive(active, search.where);

    let order = [];
    if (order_by && order_direction) {
        order.push([order_by, order_direction]);
    }

    const items = await paginate(Role, page, limit, search, order, null);

    return standardResponse(responseTypes._200_SUCCESS, "", items, res);
};

const getRoleByIdAdmin = async (req, res) => {
    const item = await Role.findByPk(req.params.id, {
        include: [{
            model: Permission,
            required: true,
        }],
    });
    if (!item) throw new NotFoundError(ErrorMessage.NOT_FOUND);
    return standardResponse(responseTypes._200_SUCCESS, "", item, res);
};

const updateRoleById = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return standardResponse(responseTypes._422_UNPROCESSABLE_ENTITY, "", {errors: errors.array()}, res);
    }

    const item = await Role.findByPk(req.params.id);
    if (!item) throw new NotFoundError(ErrorMessage.NOT_FOUND);

    const {name, active, permissions} = req.body;

    if (permissions && Array.isArray(permissions) && permissions.length) {
        const rolePermission = await Permission.findAll({
            where: {
                id: {
                    [Op.in]: permissions,
                }
            }
        });
        item.setPermissions(rolePermission);
    }

    await item.update({name, active});

    return standardResponse(responseTypes._200_SUCCESS, "", item, res);
};

const deleteRoleById = async (req, res) => {
    const item = await Role.findByPk(req.params.id);
    if (!item) throw new NotFoundError(ErrorMessage.NOT_FOUND);
    await item.destroy();
    return standardResponse(responseTypes._200_SUCCESS, "", item, res);
};

const validateRole = (method) => {
    switch (method) {
        case 'createRole': {
            return [
                body('name').exists().isString().not().isEmpty(),
                body('active').exists().isBoolean(),
                body('permissions').exists().isArray(1).not().isEmpty(),
            ]
        }

        case 'updateRoleById': {
            return [
                body('name').exists().isString().not().isEmpty(),
                body('active').exists().isBoolean(),
                body('permissions').exists().isArray(1).not().isEmpty(),
            ]
        }
    }
};

module.exports = {
    createRole,
    getRolesAdmin,
    getRoleByIdAdmin,
    updateRoleById,
    validateRole,
    deleteRoleById,
};
