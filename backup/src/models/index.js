const { Sequelize } = require("sequelize");

module.exports = function (config) {
    const sequelize = new Sequelize({
        host: config.dbHost,
        port: config.dbPort,
        username: config.dbUser,
        password: config.dbPass,
        database: config.dbName,
        dialect: config.dbType,
        logging: config.dbLog
    });

    const user = require('./user')(sequelize);
    const brand = require('./brand')(sequelize);


    return {
        user,
        brand,
        authenticate: () => {
            return sequelize.authenticate({});
        }
    };
}
