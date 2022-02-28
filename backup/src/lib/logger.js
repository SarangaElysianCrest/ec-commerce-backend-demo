const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    // defaultMeta: {service: 'user-service'},
    transports: [
        new winston.transports.File({filename: 'error.log', level: 'error'}),
        new winston.transports.File({filename: 'combined.log'}),
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

exports.info = function (message) {
    logger.info(message)
}

exports.debug = function (message) {
    logger.debug(message)
}

exports.warn = function (message) {
    logger.warn(message)
}

exports.error = function (message) {
    logger.error(message)
}
