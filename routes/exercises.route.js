const Router = require('express');
const router = new Router();
const exercisesController = require('../controllers/exercises.controller');

router.post('/add', exercisesController.create);
router.get('/get-all', exercisesController.getAll);
router.get('/get-by-id', exercisesController.getById);
router.put('/update', exercisesController.update);
router.delete('/delete', exercisesController.delete);

module.exports = router;