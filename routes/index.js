const Router = require('express');
const router = new Router();
const exerciseRouter = require('./exercises.route');
const muscleGroupRouter = require('./muscleGroup.route');

router.use('/exercise', exerciseRouter);
router.use('/muscle', muscleGroupRouter);

module.exports = router;