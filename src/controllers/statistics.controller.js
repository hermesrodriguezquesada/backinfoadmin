const {responseTypes, standardResponse} = require('../utils/globalUtils');
const {News,User, Career, EducationCenter,ViewCounter} = require('../database/models');
const {Op} = require("sequelize");

const getDashboard = async (req, res) => {

    const totalUser = await User.count();
    const totalNews = await News.count();

    const totalEducationCenter = await EducationCenter.count();

    const totalEducationCenterConfig = await EducationCenter.count({
        where: {
            active: true
        }
    });
    const totalEducationCenterNotConfig = await EducationCenter.count({
        where: {
             [Op.or]: [
                {active: false},
                {active: {[Op.is]: null}}
             ]
        }
    });

    const totalCareer = await Career.count();
    const totalCareerConfig = await Career.count({
        where: {
            active: true
        }
    });
    const totalCareerNotConfig = await Career.count({
        where: {
             [Op.or]: [
                {active: false},
                {active: {[Op.is]: null}}
             ]
        }

    });

    percentCareerConfig = (totalCareer === 0 || totalCareerConfig === 0)? 0 : (totalCareerConfig/totalCareer)*100;
    percentCareerNotConfig = (totalCareer === 0 || totalCareerNotConfig === 0)? 0 : (totalCareerNotConfig/totalCareer)*100

    percentEducationCenterConfig = (totalEducationCenter === 0 || totalEducationCenterConfig === 0)? 0 : (totalEducationCenterConfig/totalEducationCenter)*100;
    percentEducationCenterNotConfig = (totalEducationCenter === 0 || totalEducationCenterNotConfig === 0)? 0 : (totalEducationCenterNotConfig/totalEducationCenter)*100;

    data = {
        "totalUser": totalUser,
        "totalNews": totalNews,
        "totalEducationCenter": totalEducationCenter,
        "totalEducationCenterConfig": totalEducationCenterConfig.toFixed(2),
        "totalEducationCenterNotConfig": totalEducationCenterNotConfig.toFixed(2),
        "percentEducationCenterConfig": percentEducationCenterConfig.toFixed(2),
        "percentEducationCenterNotConfig": percentEducationCenterNotConfig.toFixed(2),
        "totalCareer": totalCareer,
        "totalCareerConfig": totalCareerConfig.toFixed(2),
        "totalCareerNotConfig": totalCareerNotConfig.toFixed(2),
        "percentCareerConfig": percentCareerConfig.toFixed(2),
        "percentCareerNotConfig": percentCareerNotConfig.toFixed(2)
    };

    standardResponse(responseTypes._200_SUCCESS, "", data, res);
};

module.exports = {
    getDashboard
};
