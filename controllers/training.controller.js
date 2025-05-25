const {Training, TrainingExercises, Exercise} = require('../models/models');
const {Op} = require('sequelize');

class TrainingController {
    async create(req, res) {
        const {name, description, duration, userId, exerciseIds, date} = req.body;
        try {
            console.log('Request body:', req.body);
            const training = await Training.create({
                name,
                description,
                duration,
                userId: userId,
                date: new Date(date).toISOString().split('T')[0]
            });
            console.log('Training created:', training);
            if (exerciseIds && exerciseIds.length > 0) {
                const trainingExercises = exerciseIds.map(exerciseId => ({
                    trainingId: training.id,
                    exerciseId
                }));
                await TrainingExercises.bulkCreate(trainingExercises);
                console.log('Training exercises created:', trainingExercises);
            }
            res.status(201).json({training});
        } catch (error) {
            console.error('Error creating training:', error);
            res.status(500).json({error: 'An error occurred while creating the training.'});
        }
    }

    async getAll(req, res) {
        try {
            const trainings = await Training.findAll({
                include: {
                    model: Exercise,
                    through: {attributes: []}
                }
            })
            res.json(trainings);

        } catch (error) {
            console.error('Error getting all trainings:', error);
            res.status(500).json({error: 'An error occurred while getting the trainings.'});
        }
    }

    async getTrainings(req, res) {
        const {id, userId, date, year, month} = req.query;
        try {
            if (id) {
                const training = await Training.findByPk(id, {
                    include: {
                        model: Exercise,
                        through: {attributes: []}
                    }
                });
                if (!training) {
                    return res.status(404).json({error: "Training not found"});
                }
                res.json(training);
            }

            else if(userId && date) {
                const trainings = await Training.findAll({
                    where: {
                        userId,
                        date: new Date(date)
                    }
                });
                res.json(trainings)

                if (!trainings) {
                    return res.status(404).json({error: "Trainings not found"});
                }
            }

            else if (userId){
                const trainings = await Training.findAll({
                    where:{
                        userId
                    }
                });
                res.json(trainings);

                if (!trainings) {
                    return res.status(404).json(0);
                }
            }

            else if (year && month && userId) {
                const startDay = new Date(year, month - 1, 1);
                const endDay = new Date(year, month, 0);

                const trainings = await Training.findAll({
                    where: {
                        userId,
                        date: {
                            [Op.between]: [startDay, endDay]
                        }
                    },
                    attributes: ['date']
                });

                res.json(trainings);

                if (!trainings) {
                    return res.status(404).json({error: "Trainings not found"});
                }
            }

        } catch (error) {
            console.log("Error getting trainings:", error);
            res.status(500).json({error: "An error occurred while getting the trainings."});
        }
    }

    async delete(req, res) {
        const {id} = req.query;
        const training = await Training.findByPk(id);
        if (!training) {
            return res.status(404).json({message: 'Training not found'});
        }
        await training.destroy();
        return res.json({message: 'Training deleted'});
    }

    async removeExercise(req, res) {
        const {trainingId, exerciseId} = req.query;
        try {
            const trainingExercise = await TrainingExercises.findOne({
                where: {
                    trainingId,
                    exerciseId
                }
            });
            if (!trainingExercise) {
                return res.status(404).json({message: 'Training exercise not found'});
            }
            await trainingExercise.destroy();
            return res.json({message: 'Exercise removed from training'});
        } catch (error) {
            console.error('Error removing exercise from training:', error);
            res.status(500).json({error: 'An error occurred while removing the exercise from the training.'});
        }
    }
}

module.exports = new TrainingController();