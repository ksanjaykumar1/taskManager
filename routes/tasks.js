const router = require('express').Router();
const tasks = require('../controller/tasks');

router.get('/', tasks.getAllTaks);
router.post('/', tasks.createTask);

router
    .route('/:id')
    .get(tasks.getAllTaks)
    .patch(tasks.updateTask)
    .delete(tasks.deleteTask);

module.exports = router;
