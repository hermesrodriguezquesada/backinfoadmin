const {Student, Province, IncomeSource, Municipality, Preuniversity, Commission} = require('../database/models');
const {responseTypes, standardResponse} = require('../utils/globalUtils');
const { getNotesByStudentCiSigies } = require('../utils/sigiesUtils');
const {Op} = require('sequelize');
const {paginate} = require('../libs/paginate');

const getStudents = async (req, res) => {
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
    };

    const data = await paginate(Student, page, limit, search, order, transform);

    standardResponse(responseTypes._200_SUCCESS, "", data, res);
};

const getStudentsByCi = async (req, res) => {
    const ciSearch = req.params.ci;
    const data = await Student.findOne({
        where: {ci: ciSearch},
        include: [{
            model: Province,
            required: true,
            attributes: ['id','name']
        }, {
            model: IncomeSource,
            required: true,
            attributes: ['id','name']
        }, {
            model: Municipality,
            required: false,
            attributes: ['id','name']
        }, {
            model: Preuniversity,
            required: false,
            attributes: ['id','name']
        }, {
            model: Commission,
            required: false,
            attributes: ['id','name']
        }]
    });

    standardResponse(responseTypes._200_SUCCESS, "", data, res);
};

const getNotesByStudentsByCi = async (req, res) => {
    const ciSearch = req.params.ci;
    const data = await getNotesByStudentCiSigies(ciSearch);

    standardResponse(responseTypes._200_SUCCESS, "", data, res);
};

module.exports = {
    getStudents,
    getStudentsByCi,
    getNotesByStudentsByCi
};
