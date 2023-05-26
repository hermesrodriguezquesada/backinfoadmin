const {Subject} = require('../database/models');
const {responseTypes, standardResponse} = require('../utils/globalUtils');

const getSubjects = async (req, res) => {

    const items = await Subject.findAndCountAll();

    return standardResponse(responseTypes._200_SUCCESS, "", items, res);
};

module.exports = {
    getSubjects,
};
