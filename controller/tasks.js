const Logger = require('../logger/logger');
const logger = Logger.getLogger('./controller/tasks');

exports.getAllTaks = (req, res) => {
    logger.debug(`Inside getAllTaks`);

    return res.status(200).json({ msg: 'All tasks' });
};

exports.createTask = (req, res) => {
    logger.debug(`Inside createTask`);
    logger.debug(req.body.name)
 
    return res.status(200).json({ msg: 'Task Created' });
};

exports.getTask = (req, res) => {
    logger.debug(`Inside Get Task`)
     return res.status(200).json({ msg: 'Single Task returned' });
};


exports.updateTask = (req, res) => {
    logger.debug(`Inside update Task`)
     return res.status(200).json({ msg: 'Single Task updated' });
};

exports.deleteTask = (req, res) => {
    logger.debug(`Inside Delete Task`)
     return res.status(200).json({ msg: ' Task Deleted' });
};