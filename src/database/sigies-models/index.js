'use strict';

const fs = require('fs');
const path = require('path');
const SequelizeSigies = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/configSigies.json')[env];
const dbSigies = {};

let sequelizeSigies;
if (config.use_env_variable) {
  sequelizeSigies = new SequelizeSigies(process.env[config.use_env_variable], config);
} else {
  sequelizeSigies = new SequelizeSigies(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelizeSigies, SequelizeSigies.DataTypes);
    dbSigies[model.name] = model;
  });

Object.keys(dbSigies).forEach(modelName => {
  if (dbSigies[modelName].associate) {
    dbSigies[modelName].associate(dbSigies);
  }
});

dbSigies.sequelizeSigies = sequelizeSigies;
dbSigies.SequelizeSigies = SequelizeSigies;

module.exports = dbSigies;
