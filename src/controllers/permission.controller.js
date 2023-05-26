const {Op} = require('sequelize');
const { Permission} = require('../database/models');
const {responseTypes, standardResponse, filterActive} = require('../utils/globalUtils');
const {paginate} = require('../libs/paginate');

const getPermissions = async (req, res) => {
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

    const items = await paginate(Permission, page, limit, search, order, null);

    return standardResponse(responseTypes._200_SUCCESS, "", items, res);
};

module.exports = {
    getPermissions,
};
