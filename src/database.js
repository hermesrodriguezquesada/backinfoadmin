const {Sequelize} = require('sequelize');
const database = require('./database/config/config');
const configSigies = require('./database/config/configSigies');
const env = process.env.NODE_ENV || 'development';

// Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize(database[env].database, database[env].username, database[env].password, {
    host: database[env].host,
    dialect: database[env].dialect,
    logging: false
});

//sequelize.authenticate().then(() => console.log('Database connected successfully'));
sequelize
    .sync({force: true})
    .then(() => console.log('Database connected successfully'))
    .catch(error => console.log('Database error', error))
;

//SIGIES connection
const sequelizeSigies = new Sequelize(configSigies[env].database, configSigies[env].username, configSigies[env].password, {
    host: configSigies[env].host,
    dialect: configSigies[env].dialect,
    logging: false
});

//sequelizeSigies.authenticate().then(() => console.log('Database connected successfully'));
sequelizeSigies
    .sync({force: true})
    .then(() => console.log('SIGIES Database connected successfully'))
    .catch(error => console.log('SIGIES Database error', error))
;

module.exports = {
    sequelize,
    sequelizeSigies
};
