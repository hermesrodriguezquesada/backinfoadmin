const {ActiveProcess} = require('../database/models');
const {responseTypes, standardResponse} = require('../utils/globalUtils');
const {Op} = require('sequelize');
const {paginate} = require('../libs/paginate');
const {NotFoundError, ErrorMessage} = require('../exceptions');

const getActiveProcess = async (req, res) => {
    const model = await ActiveProcess.findOne();
    if (!model) throw new NotFoundError(ErrorMessage.NOT_FOUND);

    standardResponse(responseTypes._200_SUCCESS, "", model, res);
};

module.exports = {
    getActiveProcess
};
