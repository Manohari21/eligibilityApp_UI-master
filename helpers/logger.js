const winston = require('winston');
const { LOG_LEVEL } = require("./constants");

const logger = winston.createLogger({
    level: LOG_LEVEL,
    format: winston.format.json(),
    defaultMeta: { service: 'enrollments-ui-service' },
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
        new winston.transports.Console({
            format: winston.format.simple()
        })
    ],
});

module.exports = logger;