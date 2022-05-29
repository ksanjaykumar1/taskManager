const Logger = require('../logger/logger');
const logger = Logger.getLogger('./controller/tasks');
const Tasks = require('../models/Task');
const asyncWrapper = require('../utils/middleware/async');

exports.getAllTaks = asyncWrapper(async (req, res) => {
    logger.debug(`Inside getAllTaks`);
    const tasks = await Tasks.find({});
    return res.status(200).json({ msg: 'All tasks', tasks });
});

exports.createTask = asyncWrapper(async (req, res) => {
    logger.debug(`Inside createTask`);
    logger.debug(req.body.name);
    const task = await Tasks.create(req.body);
    return res.status(200).json({ task });
});

exports.getTask = asyncWrapper(async (req, res) => {
    logger.debug(`Inside Get Task`);

    const { id: taskID } = req.params;
    const task = await Tasks.findOne({ _id: taskID });
    logger.debug(` Retrived task is ${task}`);
    if (!task) {
        return res.status(404).json({
            msg: `Task doesn't exit with that id:${taskID}`,
        });
    }
    return res.status(200).json({ task });
});

exports.updateTask = asyncWrapper(async (req, res) => {
    logger.debug(`Inside update Task`);

    const { id: taskID } = req.params;
    const task = await Tasks.findByIdAndUpdate({ _id: taskID }, req.body, {
        new: true,
        runValidators: true,
    });
    if (!task) {
        return res
            .status(404)
            .json({ msg: `Task doesn't exist with Id ${taskID}` });
    }
    res.status(200).json({ taskID, task });
});

exports.deleteTask = async (req, res) => {
    logger.debug(`Inside Delete Task`);
    const { id: taskID } = req.params;

    const task = await Tasks.findOneAndDelete({ _id: taskID });
    if (!task) {
        return res
            .status(404)
            .json({ msg: `Task with doesn't exist with ID: ${taskID}` });
    }
    return res.status(200).json({ task });
};
