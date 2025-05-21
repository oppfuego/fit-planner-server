const { Exercise } = require('../models/models');

class ExercisesController {
    async create(req, res) {
        const { name, muscleGroupId, description } = req.body;
        const exercise = await Exercise.create({ name, muscleGroupId, description });
        return res.json(exercise);
    }

    async getAll(req, res) {
        const { muscleGroupId, equipmentType} = req.query;
        const whereClause = {}

        if(muscleGroupId){
            whereClause.muscleGroupId = muscleGroupId;
        }
        if(equipmentType){
            whereClause.equipmentType = equipmentType;
        }
        const exercises = await Exercise.findAll({ where: whereClause });
        return res.json(exercises);
    }

    async getById(req, res) {
        const {id} = req.query;
        const exercise = await Exercise.findByPk(id);
        if (!exercise) {
            return res.status(404).json({ message: 'Exercise not found' });
        }
        return res.json(exercise);
    }

    async update(req, res) {
        const { id, name, muscleGroupId, description } = req.body;
        const exercise = await Exercise.findByPk(id);
        if (!exercise) {
            return res.status(404).json({ message: 'Exercise not found' });
        }
        if (name !== undefined) exercise.name = name;
        if (muscleGroupId !== undefined) exercise.muscleGroupId = muscleGroupId;
        if (description !== undefined) exercise.description = description;
        await exercise.save();
        return res.json(exercise);
    }

    async delete(req, res) {
        const { id } = req.query;
        const exercise = await Exercise.findByPk(id);
        if (!exercise) {
            return res.status(404).json({ message: 'Exercise not found' });
        }
        await exercise.destroy();
        return res.json({ message: 'Exercise deleted' });
    }
}

module.exports = new ExercisesController();