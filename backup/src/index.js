const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const logger = require('./lib/logger');

logger.info("App: initiating...");

const config = require('./lib/config');
const models = require('./models')(config);

logger.info("Models: Loading...");

models.authenticate()
    .then(() => {
        logger.info("Models: Loaded");

        logger.info("Repositories: Loading...");

        const repositories = require('./repositories');

        logger.info("Repositories: Loaded");

        // logger.info("Routes: Loading...");

        // const routes = require('./routes');

        const app = express();

        app.use(morgan('dev', {}));
        app.use(cors());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        // app.use(routes);
        //
        // logger.info("Routes: Loaded");

        return new Promise((resolve) => {
            app.listen(config.appPort, config.appHost, () => {
                resolve();
            });
        });
    })
    .then(() => {
        logger.info(`App Initiated! listening on ${config.appHost}:${config.appPort}`);
    })
    .catch(err => {
        logger.error(err.message);
        process.exit(1);
    })

//
//
// const express = require('express'),
//     path = require('path'),
//     morgan = require('morgan'),
//     mysql = require('mysql2'),
//     bodyParser = require("body-parser"),
//     cors = require('cors'),
//     fs = require('fs'),
//     {Sequelize} = require('sequelize');
//
// //Required for API Ver 1.0 ============================================
// myConnection = require('express-myconnection');
// const connStr = process.env.DB_CONN_STR ||  require('./db/connection');
//
// // importing routes
// const productRoutes = require('./routes/1.0/product');
// const orderRoutes = require('./routes/1.0/order');
// //====================================================================
//
//
// // API Ver 2.0 Sequelizs ORM =========================================
//
// exports.sequelize = new Sequelize({
//     host: process.env.DATABASE_HOST ,
//     username: process.env.DATABASE_USERNAME,
//     database: process.env.DATABASE_SCHEMA,
//     password: process.env.DATABASE_PASSWORD,
//     dialect: 'mariadb',
//     logging: false
// })
//
// // Loads Sequelize Models
// require('./models/2.0/data/product');
// require('./models/2.0/data/product-image');
// require('./models/2.0/data/product-tag');
// require('./models/2.0/data/product-variant');
// require('./models/2.0/data/user');
// require('./models/2.0/transactions/order');
//
// // Checks connection to database and exits process if failed.
// this.sequelize.authenticate()
// .then(() => {
//
//     //Synchronized Tables in Dev mode.
//     if(process.env.NODE_ENV === 'dev'){
//         this.sequelize.sync()
//         .then(()=>{
//             console.log("Tables Synced")
//         })
//         .catch(e=>{
//             console.error(e);
//         })
//     }
//
// })
// .catch(e=>{
//     // NOTE TO DEVELOPER: This behaviour may need to change to allow a fallback for API calls
//     // when the database is unavailable.
//     console.log(e);
//     console.error("Database Refused to Connect");
//     process.exit();
// })
//
// const routes = require('./routes/2.0/');
//
//
// //====================================================================
//
// const app = express();
//
// // settings
// app.set('port', process.env.PORT || 3001);
//
// // middlewares
// app.use(morgan('dev'));
// app.use(cors());
// app.use(express.urlencoded({extended: false}));
// app.use(bodyParser.json())
// // app.use(myConnection(mysql,connStr))
//
// //====================================================================
// // routes API Ver 1.0
// app.use('/api/v1.0/product', productRoutes);
// app.use('/api/v1.0/order', orderRoutes);
//
// // routes API Ver 2.0
// app.use('/api/v2.0/',routes);
//
//
// // static files
// app.use(express.static(path.join(__dirname, 'public')));
//
// // starting the server
// app.listen(app.get('port'), () => {
//     console.log(`server on port ${app.get('port')}`);
// });
//
