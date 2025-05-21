const Router = require('express');
const router = new Router();
const muscleGroupController = require('../controllers/muscleGroup.controller');

router.get('/get-all', muscleGroupController.getAll);
router.post('/add', muscleGroupController.create);

module.exports = router;