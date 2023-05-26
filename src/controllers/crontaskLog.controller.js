const {CrontaskLog} = require('../database/models');
const {responseTypes, standardResponse} = require('../utils/globalUtils');
const {Op} = require('sequelize');
const {paginate} = require('../libs/paginate');

const getCrontaskLogs = async (req, res) => {
    const {q, page, limit, order_by, order_direction} = req.query;

    let search = {};
    let order = {};

    if (q) {
        search = {
            where: {
                name: {
                    [Op.like]: `%${q}%`

                }
            }
        };
    }
    if (order_by && order_direction) {
        order.push([order_by, order_direction]);
    }
    const transform = (records) => {
        return records.map(record => {
            return record
        });
    }
    const data = await paginate(CrontaskLog, page, limit, search, order, transform);

    standardResponse(responseTypes._200_SUCCESS, "", data, res);
};

module.exports = {
    getCrontaskLogs
};
