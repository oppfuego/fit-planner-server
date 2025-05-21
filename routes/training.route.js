const Router = require('express');
const router = new Router();
const TrainingController = require('../controllers/training.controller');

router.post('/create', TrainingController.create);
router.get('/get-all', TrainingController.getAll);
router.get('/get-trainings', TrainingController.getTrainings);
router.delete('/delete', TrainingController.delete);
router.delete('/remove-exercise', TrainingController.removeExercise);

module.exports = router;