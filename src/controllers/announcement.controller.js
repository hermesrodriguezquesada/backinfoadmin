const {Announcement} = require('../database/models');
const {responseTypes, standardResponse} = require('../utils/globalUtils');

const getAnnouncements = async (req, res) => {

    const items = await Announcement.findAndCountAll();

    return standardResponse(responseTypes._200_SUCCESS, "", items, res);
};

module.exports = {
    getAnnouncements,
};
