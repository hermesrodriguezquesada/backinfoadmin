const {Channel} = require('../database/models');
const {responseTypes, standardResponse} = require('../utils/globalUtils');

const getChannels = async (req, res) => {

    const items = await Channel.findAndCountAll();

    return standardResponse(responseTypes._200_SUCCESS, "", items, res);
};

module.exports = {
    getChannels,
};
