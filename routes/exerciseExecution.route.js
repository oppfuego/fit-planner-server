const Router = require('express');
const router = new Router();
const exerciseExecutionController = require('../controllers/exerciseExecution.controller');

router.post('/add', exerciseExecutionController.create);
router.get('/get-history', exerciseExecutionController.getHistory);
router.delete('/delete', exerciseExecutionController.delete);

module.exports = router;
