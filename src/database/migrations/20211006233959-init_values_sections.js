'use strict';
const {Section, News} = require('../models');
const {Op} = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const deleteAllArticles = await News.destroy({
      where: {},
      truncate: false
    });

    const deleteAllSection = await Section.destroy({
      where: {},
      truncate: false
    });

    const createSection1 = await Section.create({
      name: 'Carrusel',
      code: '01',
      active: true
    });

    const createSection2 = await Section.create({
      name: 'Te orientamos sobre',
      code: '02',
      active: true
    });

    const createSection3 = await Section.create({
      name: 'Orientación vocacional',
      code: '03',
      active: true
    });

    const createSection4 = await Section.create({
      name: 'Información de interés',
      code: '04',
      active: true
    });

    const createSection5 = await Section.create({
      name: 'Otra información',
      code: '05',
      active: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    return Section.destroy({
      where: {},
      truncate: false
    });
  }
};
