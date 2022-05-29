require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();
const tasks = require('./routes/tasks');
const Logger = require('./logger/logger');
const db = require('./utils/db');
const logger = Logger.getLogger('./app.js');
const notFound = require('./utils/middleware/not-found')
switch (process.env.ENVIRONMENT) {
    case 'development': {
        logger.info(`Development Morgan`);
        morgan.token('body', (req) => JSON.stringify(req.body));
        app.use(morgan('combined', { stream: logger.stream }));
        app.use(
            morgan(
                ':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'
            )
        );
        break;
    }
    case 'production': {
        app.use(morgan('combined', { stream: logger.stream }));
        app.use(
            morgan(
                ':method :url :status :response-time ms - :res[content-length] - :req[content-length]'
            )
        );
        break;
    }
    default: {
        app.use(morgan('combined', { stream: logger.stream }));
        app.use(
            morgan(
                ':method :url :status :response-time ms - :res[content-length] - :req[content-length]'
            )
        );
    }
}
//adding vanilla javascript frontend
app.use(express.static('./public'))

app.use(express.json({ extended: false }));
app.use('/api/v1/tasks', tasks);

//404 route not found handler
app.use(notFound.notFound)

const start = async () => {
    try {
        await db.connection(process.env.MONGO_URI);
        logger.info('Connected to MongoDB');
        app.listen(process.env.PORT, () => {
            logger.info(`Listening on port ${process.env.PORT}`);
        });
    } catch (error) {
        logger.error(`Failed to connect to MongoDB ${error}`);
        process.exit(1);
    }
};

start();
