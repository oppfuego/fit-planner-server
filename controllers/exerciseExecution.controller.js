const {ExerciseExecution} = require('../models/models')

class ExerciseExecutionController {
    async create(req, res) {
        const {userId, weight, reps, date, exerciseId} = req.body
        try {
            const exerciseExecution = await ExerciseExecution.create({
                userId,
                weight,
                reps,
                date,
                exerciseId
            })
            return res.json(exerciseExecution)
        } catch (error) {
            console.error('Error creating exercise execution:', error)
            return res.status(500).json({error: 'Internal server error'})
        }
    }

    async getHistory(req, res) {
        const {userId, exerciseId} = req.query;
        try {
            const exerciseExecutionHistory = await ExerciseExecution.findAll({
                where: {
                    userId,
                    exerciseId
                }
            });
            return res.json(exerciseExecutionHistory);
        } catch (error) {
            console.error('Error fetching exercise execution history:', error);
            return res.status(500).json({error: 'Internal server error'});
        }
    }

    async delete(req, res){
        const {id} = req.body
        try {
            const exerciseExecution = await ExerciseExecution.destroy({
                where: {
                    id
                }
            })
            return res.json(exerciseExecution)
        } catch (error) {
            console.error('Error deleting exercise execution:', error)
            return res.status(500).json({error: 'Internal server error'})
        }
    }
}

module.exports = new ExerciseExecutionController()