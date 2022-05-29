const mongoose = require('mongoose');
const Logger = require('../logger/logger');
const logger = Logger.getLogger('./utils/db.js');

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
};

exports.connection = (url) => {
    // returns promise
    return mongoose.connect(url, options);
};
